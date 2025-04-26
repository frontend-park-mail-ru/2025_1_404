// import {
//     YMap,
//     YMapDefaultFeaturesLayer,
//     YMapDefaultSchemeLayer,
//     YMapMarker
// } from '../lib/ymaps';
import {makeRequest} from "./httpUtil.ts";

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
    // map: YMap;
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
    // map: YMap;
    /**
     * @property {YMapMarker} placemark экземпляр метки, которую нужно удалить.
     */
    // placemark: YMapMarker;
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
    // createMap({id, center, zoom}: CreateMapInterface): YMap | null {
    //     const mapElement = document.getElementById(id) as HTMLElement;
    //     if (!mapElement) {
    //         return null;
    //     }
    //     const map = new YMap(mapElement, {
    //         location: {
    //             center,
    //             zoom
    //         }
    //     }, [
    //         new YMapDefaultSchemeLayer({}),
    //         new YMapDefaultFeaturesLayer({})
    //     ]);
    //     return map;
    // }

    /**
     * @function addPlacemark
     * @description Метод для добавления метки на карту.
     * @param {Map} map экземпляр карты.
     * @param {HTMLElement} element элемент метки
     * @param {Array} coords координаты метки.
     * @returns {Map} экземпляр метки.
     */
    // addPlacemark({map, element, coords}: AddPlacemarkInterface): YMapMarker | null {
    //     const placeMark = new YMapMarker({
    //         coordinates: coords,
    //     }, element);
    //     map.addChild(placeMark);
    //     return placeMark;
    // }

    /**
     * @function removePlacemark
     * @description Метод для удаления метки с карты.
     * @param {*} map экземпляр карты.
     * @param {*} placemark экземпляр метки.
     */
    // removePlacemark({map, placemark}: RemovePlacemarkInterface) {
    //     map.removeChild(placemark);
    // }

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