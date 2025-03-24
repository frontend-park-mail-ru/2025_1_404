import YandexUtil from "../util/YandexUtil.js";

export default class Map {
    constructor({id, center, zoom}) {
        this._yandexMap = YandexUtil.createMap({id, center, zoom});
    }

    addHouse({coords}) {
        YandexUtil.addPlacemark({
            map: this._yandexMap,
            image: '/resources/img/map/housePlacemark.svg',
            coords,
            size: [50, 50]
        });
    }

    addPlacemark({image, coords, size, offset}) {
        YandexUtil.addPlacemark({map: this._yandexMap, image, coords, size, offset});
    }
}