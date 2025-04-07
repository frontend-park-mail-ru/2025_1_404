import L from 'leaflet';

/**
 * @class MapUtil
 * @description Утилита для работы с картами.
 */
class MapUtil {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.events = [];
    }

    /**
     * @function createMap
     * @description Метод для создания карты.
     * @param {string} id идентификатор карты.
     * @param {Array} center координаты центра карты.
     * @param {number} zoom уровень масштабирования карты.
     * @returns {*} экземпляр карты.
     */
    createMap({id, center, zoom}) {
        // eslint-disable-next-line new-cap
        const map = new L.map(id).setView(center, zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        document.getElementById(id).getElementsByClassName('leaflet-attribution-flag')[0].remove();
        return map;
    }

    /**
     * @function addPlacemark
     * @description Метод для добавления метки на карту.
     * @param {*} map экземпляр карты.
     * @param {string} image путь к изображению метки.
     * @param {Array} coords координаты метки.
     * @param {Array} size размер метки.
     * @param {Array} offset смещение метки.
     * @returns {*} экземпляр метки.
     */
    addPlacemark({map, image, coords, size=[30, 30], offset=[0, 0]}) {
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
    removePlacemark({map, placemark}) {
        map.removeLayer(placemark);
    }

    /**
     * @function geocode
     * @description Метод для геокодирования адреса.
     * @param {string} address адрес для геокодирования.
     * @returns {Promise<any>} промис с результатами геокодирования.
     */
    async geocode(address) {
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