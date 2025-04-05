import MapUtil from "../util/mapUtil.js";

/**
 * @class Map
 * @description Класс карты.
 */
export default class Map {
    /**
     * @description Конструктор класса карты.
     * @param {string} id id карты.
     * @param {Array} center координаты центра карты.
     * @param {number} zoom уровень зума карты.
     */
    constructor({id, center, zoom}) {
        this._zoom = zoom;
        this.center = center;
        this._map = MapUtil.createMap({center, id, zoom});
    }

    /**
     * @function addHouse
     * @description Метод добавления дома на карту.
     * @param {object} data данные о доме.
     * @param {Array} data.coords координаты дома.
     * @returns {object} объект с информацией о доме.
     */
    addHouse({coords}) {
        const placeMarkSize = 50;
        return this.addPlacemark({
            coords,
            image: '/img/map/housePlacemark.svg',
            map: this._map,
            size: [placeMarkSize, placeMarkSize]
        });
    }

    /**
     * @function addPlacemark
     * @description Метод добавления метки на карту.
     * @param {object} data данные о метке.
     * @param {Array} data.coords координаты метки.
     * @param {string} data.image изображение метки.
     * @param {Array} data.size размер метки.
     * @param {Array} data.offset смещение метки.
     * @returns {*} метка.
     */
    addPlacemark({image, coords, size, offset}) {
        return MapUtil.addPlacemark({coords, image, map: this._map, offset, size});
    }

    /**
     * @function removePlacemark
     * @description Метод удаления метки с карты.
     * @param {object} data данные о метке.
     * @param {object} data.placemark метка.
     */
    removePlacemark({placemark}) {
        MapUtil.removePlacemark({map: this._map, placemark});
    }

    /**
     * @function geoCode
     * @description Метод геокодирования адреса.
     * @param {string} address адрес.
     * @returns {Promise<void>}
     */
    async geoCode(address) {
        try {
            const data = await MapUtil.geocode(address);
            this.center = [data[0].lat, data[0].lon];
            this._map.setView(this.center, this._zoom);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}