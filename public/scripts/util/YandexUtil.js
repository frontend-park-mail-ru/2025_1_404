import Map from "../models/Map.js";

class YandexUtil {
    constructor() {
        this.events = [];

        ymaps.ready(() => {
            this.emit('init');
        });
    }

    createMap({id, center, zoom}) {
        return new ymaps.Map(id, {
            center,
            zoom
        });
    }

    addPlacemark({map, image, coords, size=[30, 30], offset=[0, 0]}) {
        const placeMark = new ymaps.Placemark(coords, {}, {
            iconLayout: 'default#image',
            iconImageHref: image,
            iconImageSize: size,
            iconImageOffset: offset
        });
        map.geoObjects.add(placeMark);
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

export default new YandexUtil();