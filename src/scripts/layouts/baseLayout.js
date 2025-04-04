import Loader from "../components/loader/index.js";
import ProgressBar from "../components/progressBar/index.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

export default class BaseLayout {
    constructor() {
        this.events = {};
        this.handlers = [];
    }

    process(page) {
        return {
            destroy: () => {
                this.removeListeners();
                page.destroy();
            },
            render: ({root, props}) => {
                this.initListeners();

                this._progressBar = new ProgressBar({layout: this, page});
                this._loader = new Loader({layout: this, page});

                page.render({
                    layout: this,
                    props,
                    root
                });

                this.loadUser();
            }
        }
    }

    loadUser() {
        if (User.isLoaded()) {
            return;
        }
        this._loader.setLoaderStatus(true);
        User.update().finally(() => {
            RouteManager.navigateToPageByCurrentURL();
        });
    }

    on(event, callback) {
        this.events[event] = callback;
    }

    off(event) {
        this.events[event] = null;
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event](...args);
        }
    }

    initListeners() {
    }

    initListener(elementId, type, handler) {
        const element = document.getElementById(elementId);
        const boundedHandler = handler.bind(this);
        element.addEventListener(type, boundedHandler);
        this.handlers.push({element, handler: boundedHandler, type});
    }

    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            element.removeEventListener(type, handler);
        });
    }

    async makeRequest(func, ...args) {
        console.log(func)
        this._progressBar.setPercentage(30);
        return await func(...args)
            .then((data) => data)
            .catch((err) => {
                throw err;
            }).finally(() => {
                this._progressBar.setPercentage(100);
            })
    }

}