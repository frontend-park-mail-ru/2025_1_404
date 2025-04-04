import MapUtil from "../util/mapUtil.js";

export default class Map {
    constructor({id, center, zoom}) {
        this._zoom = zoom;
        this.center = center;
        this._map = MapUtil.createMap({center, id, zoom});
    }

    addHouse({coords}) {
        const placeMarkSize = 50;
        return this.addPlacemark({
            coords,
            image: '/img/map/housePlacemark.svg',
            map: this._map,
            size: [placeMarkSize, placeMarkSize]
        });
    }

    addPlacemark({image, coords, size, offset}) {
        return MapUtil.addPlacemark({coords, image, map: this._map, offset, size});
    }

    removePlacemark({placemark}) {
        MapUtil.removePlacemark({map: this._map, placemark});
    }

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