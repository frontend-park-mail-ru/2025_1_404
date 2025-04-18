import MapUtil from "../util/mapUtil.ts";
import {Map as LeafletMap, Marker} from "leaflet";

interface MapConstructorInterface {
    /**
     * @property {string} id id карты.
     */
    id: string;
    /**
     * @property {[number, number]} center координаты центра карты.
     */
    center: [number, number];
    /**
     * @property {number} zoom уровень зума карты.
     */
    zoom: number;
}

interface AddHouseInterface {
    /**
     * @property {[number, number]} coords координаты дома.
     */
    coords: [number, number];
}

interface AddPlacemarkInterface {
    /**
     * @property {[number, number]} coords координаты метки.
     */
    coords: [number, number];
    /**
     * @property {string} image путь к изображению метки.
     */
    image: string;
    /**
     * @property {LeafletMap} map карта, на которую добавляется метка.
     */
    map: LeafletMap;
    /**
     * @property {Array} size размер метки.
     */
    size: [number, number];
    /**
     * @property {Array} offset смещение метки.
     */
    offset?: [number, number];
}

interface RemovePlacemarkInterface {
    /**
     * @property {Marker} placemark метка, которую нужно удалить с карты.
     */
    placemark: Marker;
}

/**
 * @class Map
 * @description Класс карты.
 */
export default class Map {
    private _zoom: number;
    private _placeMarkSize: number;
    private center: [number, number];
    private _map: LeafletMap;
    private _houses: Marker[] = [];
    /**
     * @description Конструктор класса карты.
     * @param {string} id id карты.
     * @param {[number, number]} center координаты центра карты.
     * @param {number} zoom уровень зума карты.
     */
    constructor({id, center, zoom}: MapConstructorInterface) {
        this._zoom = zoom;
        this._placeMarkSize = zoom * 3;
        this.center = center;
        this._map = MapUtil.createMap({center, id, zoom});

        this._map.on('zoomend', () => {
            this._zoom = this._map.getZoom();
            this._placeMarkSize = this._zoom * 3;
            this._houses.forEach((house) => {
                this.updateHouseSize(house);
            });
        })
    }

    /**
     * @function addHouse
     * @description Метод добавления дома на карту.
     * @param {object} data данные о доме.
     * @param {Array} data.coords координаты дома.
     * @returns {object} объект с информацией о доме.
     */
    addHouse({coords}: AddHouseInterface) {
        const house = this.addPlacemark({
            coords,
            image: '/img/map/housePlacemark.svg',
            map: this._map,
            size: [this._placeMarkSize, this._placeMarkSize]
        });
        this._houses.push(house);
        return house;
    }

    /**
     * @function updateHouseSize
     * @description Метод обновления размера дома на карте.
     * @param {Marker} house дом.
     */
    updateHouseSize(house: Marker) {
        house.setIcon(MapUtil.getIcon({image: '/img/map/housePlacemark.svg', size: [this._placeMarkSize, this._placeMarkSize], offset: [0, 0]}));
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
    addPlacemark({image, coords, size, offset}: AddPlacemarkInterface) {
        return MapUtil.addPlacemark({coords, image, map: this._map, offset, size});
    }

    /**
     * @function removePlacemark
     * @description Метод удаления метки с карты.
     * @param {object} data данные о метке.
     * @param {object} data.placemark метка.
     */
    removePlacemark({placemark}: RemovePlacemarkInterface) {
        MapUtil.removePlacemark({map: this._map, placemark});
    }

    /**
     * @function geoCode
     * @description Метод геокодирования адреса.
     * @param {string} address адрес.
     * @returns {Promise<void>}
     */
    async geoCode(address: string) {
        const data = await MapUtil.geocode(address);
        this.center = [data[0].lat, data[0].lon];
        this._map.setView(this.center, this._zoom);
    }

    /**
     * @function getCenter
     * @description Метод получения центра карты.
     * @returns {[number, number]} координаты центра карты.
     */
    getCenter() {
        return this.center;
    }
}