import {
    clusterByGrid,
    YMap,
    YMapClusterer,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapMarker,
} from '../lib/ymaps';
import {makeRequest} from "./httpUtil.ts";
import {LngLat, LngLatBounds, YMapLocationRequest} from "@yandex/ymaps3-types";
import type {Feature} from '@yandex/ymaps3-clusterer';
import HouseMarker from "../components/houseMarker";
import Cluster from "../components/cluster";

const GEOCODE_TOKEN = import.meta.env.VITE_GEOCODE_TOKEN;
const SUGGEST_TOKEN = import.meta.env.VITE_SUGGEST_TOKEN;

/**
 * @interface CreateMapInterface
 * @description Интерфейс для создания карты.
 */
interface CreateMapInterface {
    /**
     * @property {string} id идентификатор элемента, в котором будет отображаться карта.
     */
    id: string;
    /**
     * @property {Array<number>} center координаты центра карты в формате [широта, долгота].
     */
    center: [number, number];
    /**
     * @property {number} zoom уровень масштабирования карты.
     */
    zoom: number;
}

/**
 * @interface AddPlacemarkInterface
 * @description Интерфейс для добавления метки на карту.
 */
interface AddPlacemarkInterface {
    /**
     * @property {YMap} map экземпляр карты, на которую будет добавлена метка.
     */
    map: YMap;
    /**
     * @property {Array<number>} coords координаты метки в формате [широта, долгота].
     */
    coords: [number, number];
}

/**
 * @interface CreatePlacemarkInterface
 * @description Интерфейс для создания метки.
 */
interface CreatePlacemarkInterface {
    /**
     * @property {HTMLElement} element элемент метки, который будет отображаться на карте.
     */
    element: HTMLElement;
    /**
     * @property {Array<number>} coords координаты метки в формате [широта, долгота].
     */
    coords: [number, number];
}

/**
 * @interface RemovePlacemarkInterface
 * @description Интерфейс для удаления метки с карты.
 */
interface RemovePlacemarkInterface {
    /**
     * @property {YMap} map экземпляр карты, с которой будет удалена метка.
     */
    map: YMap;
    /**
     * @property {YMapMarker} placemark экземпляр метки, которую нужно удалить.
     */
    placemark: YMapMarker;
}

/**
 * @class MapUtil
 * @description Утилита для работы с картами.
 */
class MapUtil {
    /**
     * @function createMap
     * @description Метод для создания карты.
     * @param {string} id идентификатор карты.
     * @param {[number, number]} center координаты центра карты.
     * @param {number} zoom уровень масштабирования карты.
     * @returns {Map} экземпляр карты.
     */

    createMap({id, center, zoom}: CreateMapInterface): YMap | null {
        const mapElement = document.getElementById(id) as HTMLElement;
        const MARGIN = [100, 100, 100, 100] as [number, number, number, number];
        if (!mapElement) {
            return null;
        }
        const map = new YMap(mapElement, {
            location: {
                center,
                zoom,
            },
            margin: MARGIN,
        }, [
            new YMapDefaultSchemeLayer({}),
            new YMapDefaultFeaturesLayer({}),
        ]);

        return map;
    }

    createClusterer(map: YMap, saveMarker?: (marker: HTMLElement) => void) {
        const COMMON_LOCATION_PARAMS: Partial<YMapLocationRequest> = {easing: 'ease-in-out', duration: 1000};

        const cluster = (coordinates: LngLat, features: Feature[]) =>
            new YMapMarker(
                {
                    coordinates,
                    onClick: () => {
                         const bounds = this.getBounds(features.map((feature: Feature) => feature.geometry.coordinates));
                         map.update({location: {bounds, ...COMMON_LOCATION_PARAMS}});
                    }
                },
                this.clusterIcon(features.length)
            );

        const marker = (feature: Feature) => {
            if (!feature.properties) {
                return new YMapMarker(
                    {
                        coordinates: feature.geometry.coordinates as [number, number],
                    },
                    this.houseMarker({}, true)[0]
                );
            }
            const markerData = {
                id: feature.properties.id,
                img: feature.properties.img,
                title: feature.properties.title,
                price: feature.properties.price,
                area: feature.properties.area,
                address: feature.properties.address,
            } as Record<string, string>;

            const [markerElement, balloonElement] = this.houseMarker(markerData, true);
            if (saveMarker) saveMarker(markerElement);

            this.createBalloon(map, balloonElement, feature.geometry.coordinates);

            return new YMapMarker(
                {
                    coordinates: feature.geometry.coordinates as [number, number],
                    zIndex:1100,
                },
                markerElement
            );
        }


        const clusterer = new YMapClusterer({

            method: clusterByGrid({gridSize: 16}),

            cluster,

            marker,

            features: []
        });
        map.addChild(clusterer);
        return clusterer;
    }

    createBalloon(map: YMap, element: HTMLElement, coords: LngLat) {
        const {YMapMarker} = ymaps3;
        const balloon = new YMapMarker({coordinates: coords, zIndex:1200}, element);
        map.addChild(balloon);
    }

    clusterIcon(count: number) {
        const cluster = new Cluster({});
        return cluster.render(count);
    }

    houseMarker(data: Record<string, string>, hasBalloon: boolean) {
        const houseMarker = new HouseMarker({data, hasBalloon});
        return houseMarker.render();
    }

    /**
     * @function addPlacemark
     * @description Метод для добавления метки на карту.
     * @param {Map} map экземпляр карты.
     * @param {HTMLElement} element элемент метки
     * @param {Array} coords координаты метки.
     * @returns {Map} экземпляр метки.
     */
    addPlacemark({map, coords}: AddPlacemarkInterface): YMapMarker | null {
        const placeMark = this.createPlacemark({element: this.houseMarker({}, false)[0], coords});
        map.addChild(placeMark);
        return placeMark;
    }

    createPlacemark({element, coords}: CreatePlacemarkInterface): YMapMarker {
        return new YMapMarker({
            coordinates: coords,
        }, element);
    }

    /**
     * @function removePlacemark
     * @description Метод для удаления метки с карты.
     * @param {*} map экземпляр карты.
     * @param {*} placemark экземпляр метки.
     */
    removePlacemark({map, placemark}: RemovePlacemarkInterface) {
        map.removeChild(placemark);
    }

    getBounds(coordinates: LngLat[]): LngLatBounds {
        let minLat = Infinity,
            minLng = Infinity;
        let maxLat = -Infinity,
            maxLng = -Infinity;

        for (const coords of coordinates) {
            const lat = coords[1];
            const lng = coords[0];

            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
        }

        return [
            [minLng, minLat],
            [maxLng, maxLat]
        ] as LngLatBounds;
    }

    /**
     * @function geocode
     * @description Метод для геокодирования адреса.
     * @param {string} address адрес для геокодирования.
     * @returns {Promise<*>} промис с результатами геокодирования.
     */
    async geocode(address: string) {
        const domain = 'https://geocode-maps.yandex.ru/v1';
        const data = await makeRequest({
            method: 'GET',
            url: domain,
            query: {
                'apikey': GEOCODE_TOKEN,
                'geocode': address,
                'lang': 'ru_RU',
                'format': 'json',
            }
        })
        return data.response.GeoObjectCollection.featureMember;
    }

    /**
     * @function geocode
     * @description Метод для геокодирования адреса.
     * @param {number[]} coords адрес для геокодирования.
     * @returns {Promise<*>} промис с результатами геокодирования.
     */
    async geocodeByCoords(coords: number[]) {
        const domain = 'https://geocode-maps.yandex.ru/v1';
        const data = await makeRequest({
            method: 'GET',
            url: domain,
            query: {
                'apikey': GEOCODE_TOKEN,
                'geocode': coords.join(', '),
                'lang': 'ru_RU',
                'format': 'json',
                'kind': 'house'
            }
        })
        return data.response.GeoObjectCollection.featureMember;
    }

    /**
     * @function suggest
     * @description Метод для получения подсказок по адресу.
     * @param {string} address адрес для получения подсказок.
     * @returns {Promise<string[]>} промис с массивом подсказок по адресу.
     */
    async suggest(address: string) {
        const domain = 'https://suggest-maps.yandex.ru/v1/suggest';
        const data = await makeRequest({
            method: 'GET',
            url: domain,
            query: {
                'apikey': SUGGEST_TOKEN,
                'text': address,
                'lang': 'ru',
                'format': 'json',
                'types': 'house',
                'print_address': '1'
            }
        });
        const addresses = [];
        for (const suggestion of data.results) {
            if (addresses.length >= 5) {
                break;
            }
            addresses.push(suggestion.address.formatted_address);
        }
        return addresses;
    }

}

export default new MapUtil();