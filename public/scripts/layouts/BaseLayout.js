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
                page.render({
                    layout: this,
                    props,
                    root
                });
            }
        }
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

    initListeners() {}

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

}