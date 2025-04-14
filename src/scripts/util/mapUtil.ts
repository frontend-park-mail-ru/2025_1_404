import L, {Map, Marker} from 'leaflet';

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
     * @property {*} map экземпляр карты, на которую будет добавлена метка.
     */
    map: Map;
    /**
     * @property {string} image путь к изображению метки.
     */
    image: string;
    /**
     * @property {Array<number>} coords координаты метки в формате [широта, долгота].
     */
    coords: [number, number];
    /**
     * @property {Array<number>} size размер метки (ширина и высота).
     */
    size?: [number, number];
    /**
     * @property {Array<number>} offset смещение метки (x, y).
     */
    offset?: [number, number];
}

/**
 * @interface RemovePlacemarkInterface
 * @description Интерфейс для удаления метки с карты.
 */
interface RemovePlacemarkInterface {
    /**
     * @property {*} map экземпляр карты, с которой будет удалена метка.
     */
    map: Map;
    /**
     * @property {*} placemark экземпляр метки, которую нужно удалить.
     */
    placemark: Marker;
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
    createMap({id, center, zoom}: CreateMapInterface): Map {
        const map: Map = L.map(id).setView(center, zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        this._removeFlag(id);
        return map;
    }

    /**
     * @function _removeFlag
     * @description Метод для удаления флага с карты
     * @param {string} id идентификатор карты.
     */
    _removeFlag(id: string) {
        const map = document.getElementById(id);
        if (!map) {
            return;
        }
        const flags = map.getElementsByClassName('leaflet-attribution-flag');
        if (flags.length < 0) {
            return;
        }
        flags[0].remove();
    }

    /**
     * @function addPlacemark
     * @description Метод для добавления метки на карту.
     * @param {*} map экземпляр карты.
     * @param {string} image путь к изображению метки.
     * @param {Array} coords координаты метки.
     * @param {Array} size размер метки.
     * @param {Array} offset смещение метки.
     * @returns {Map} экземпляр метки.
     */
    addPlacemark({map, image, coords, size=[30, 30], offset=[0, 0]}: AddPlacemarkInterface): Marker {
        const placeMark = L.marker(coords, {
            icon: L.icon({
                iconUrl: image,
                iconSize: size,
                iconAnchor: offset
            })
        });
        placeMark.addTo(map);
        return placeMark;
    }

    /**
     * @function removePlacemark
     * @description Метод для удаления метки с карты.
     * @param {*} map экземпляр карты.
     * @param {*} placemark экземпляр метки.
     */
    removePlacemark({map, placemark}: RemovePlacemarkInterface) {
        map.removeLayer(placemark);
    }

    /**
     * @function geocode
     * @description Метод для геокодирования адреса.
     * @param {string} address адрес для геокодирования.
     * @returns {Promise<*>} промис с результатами геокодирования.
     */
    async geocode(address: string) {
        const domain = 'https://nominatim.openstreetmap.org';
        const response = await fetch(domain.concat('/search?format=json&q=', address));
        if (!response.ok) {
            throw new Error('Failed to geocode address');
        }
        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No results found');
        }
        return data;
    }
}

export default new MapUtil();