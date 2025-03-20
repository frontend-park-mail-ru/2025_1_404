export default class BaseLayout {
    constructor() {
        this.events = {}
    }

    process(page) {
        return {
            render({root, props}) {
                page.render({
                    root: root,
                    props: props,
                    layout: this
                });
            },
            destroy() {
                page.destroy();
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