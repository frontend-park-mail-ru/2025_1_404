class MapUtil {
    constructor() {
        this.events = [];
    }

    createMap({id, center, zoom}) {
        const map = new L.map(id).setView(center, zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        document.getElementById(id).getElementsByClassName('leaflet-attribution-flag')[0].remove();
        return map;
    }

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

    removePlacemark({map, placemark}) {
        map.removeLayer(placemark);
    }

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