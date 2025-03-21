export default class BaseLayout {
    constructor() {
        this.events = {}
    }

    process(page) {
        return {
            destroy() {
                page.destroy();
            },
            render({root, props}) {
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

    emit(event) {
        if (this.events[event]) {
            this.events[event]();
        }
    }
}