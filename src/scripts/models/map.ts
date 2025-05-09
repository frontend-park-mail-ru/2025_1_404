import MapUtil from "../util/mapUtil.ts";
import {YMap, YMapListener, YMapMarker, YMapClusterer as YMapClustererType} from "../lib/ymaps.ts";
import {DomEventHandler, LngLat} from "@yandex/ymaps3-types";
import {Feature} from "@yandex/ymaps3-clusterer";

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
     * @property {YMap} map карта, на которую добавляется метка.
     */
    map: YMap;
}

interface RemovePlacemarkInterface {
    /**
     * @property {Placemark} placemark метка, которую нужно удалить с карты.
     */
    placemark: YMapMarker;
}

/**
 * @class Map
 * @description Класс карты.
 */
export default class Map {
    private zoom: number;
    private placeMarkSize: number;
    private center: [number, number];
    private map: YMap | null;
    private clusterer: InstanceType<typeof YMapClustererType> | null;
    private houses: YMapMarker[] = [];
    private clusterMarkers: HTMLElement[] = [];
    /**
     * @description Конструктор класса карты.
     * @param {string} id id карты.
     * @param {[number, number]} center координаты центра карты.
     * @param {number} zoom уровень зума карты.
     */
    constructor({id, center, zoom}: MapConstructorInterface) {
        this.zoom = zoom;
        this.placeMarkSize = zoom * 3;
        this.center = center;
        this.map = MapUtil.createMap({center, id, zoom});
        this.clusterer = null;
    }

    addClusterer() {
        if (!this.map) {
            return;
        }
        this.clusterer = MapUtil.createClusterer(this.map, (marker) => {
            this.clusterMarkers.push(marker);
        });
    }

    getAllMarkerElements(): HTMLElement[] {
        return this.clusterMarkers;
    }

    addClustererMarkers(coords: LngLat[], props: Record<string, string>[]) {
        const points : Feature[]  = Array.from(coords, (elem, index) => (
            {
                type: 'Feature',
                id: index.toString(),
                geometry: {type: 'Point', coordinates: elem},
                properties: {
                    id: props[index].id,
                    img: props[index].img,
                    title: props[index].title,
                    price: props[index].price,
                    area: props[index].area,
                    address: props[index].address,
                }
            }
        ));
        if (!this.clusterer) {
            return;
        }

        this.clusterer.update({
            features: points
        });
    }

    /**
     * @function addHouse
     * @description Метод добавления дома на карту.
     * @param {object} data данные о доме.
     * @param {Array} data.coords координаты дома.
     * @returns {object} объект с информацией о доме.
     */
    addHouse({coords}: AddHouseInterface) {
        if (!this.map) {
            return undefined;
        }
        const house = this.addPlacemark({
            coords,
            map: this.map,
        });
        if (!house) {
            return undefined;
        }
        this.houses.push(house);
        return house;
    }

    /**
     * @function removeAllHouses
     * @description Метод удаления всех домов с карты.
     */
    removeAllHouses() {
        this.houses.forEach((house) => {
            if (this.map) {
                MapUtil.removePlacemark({map: this.map, placemark: house});
            }
        });
        this.houses = [];
    }

    /**
     * @function addPlacemark
     * @description Метод добавления метки на карту.
     * @param {object} data данные о метке.
     * @param {Array} data.coords координаты метки.
     * @param {HTMLElement} data.element элемент метки, который будет отображаться на карте.
     * @returns {*} метка.
     */
    addPlacemark({coords}: AddPlacemarkInterface) {
        if (!this.map) {
            return null;
        }
        return MapUtil.addPlacemark({coords, map: this.map});
    }

    /**
     * @function removePlacemark
     * @description Метод удаления метки с карты.
     * @param {object} data данные о метке.
     * @param {object} data.placemark метка.
     */
    removePlacemark({placemark}: RemovePlacemarkInterface) {
        if (!this.map) {
            return;
        }
        MapUtil.removePlacemark({map: this.map, placemark});
    }

    /**
     * @function registerClickHandler
     * @description Метод регистрации обработчика клика по карте.
     * @param {DomEventHandler} handler обработчик события клика.
     */
    registerClickHandler(handler: DomEventHandler) {
        const mapListener = new YMapListener({
            layer: 'any',
            onClick: handler
        });
        if (this.map) {
            this.map.addChild(mapListener);
        }
    }

    /**
     * @function geoCode
     * @description Метод геокодирования адреса.
     * @param {string} address адрес.
     * @returns {Promise<void>}
     */
    async geoCode(address: string) {
        if (!this.map) {
            return;
        }
        const pos = await this.getCoords(address);
        if (!pos) {
            return;
        }
        this.center = [pos[0], pos[1]];
        this.map.update({
            location: {
                center: this.center,
                zoom: this.map.zoom
            }
        })
    }

    async getCoords(address: string) {
        const data = await MapUtil.geocode(address);
        if (data.length === 0) {
            return;
        }
        const object = data[0];
        const posStr = object.GeoObject.Point.pos;
        if (typeof (posStr) !== 'string') {
            return;
        }
        const [lng, lat] = posStr.split(' ').map((item) => parseFloat(item));
        return [lng, lat] as LngLat;
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