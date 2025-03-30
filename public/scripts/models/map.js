import MapUtil from "../util/mapUtil.js";

export default class Map {
    constructor({id, center, zoom}) {
        this._zoom = zoom;
        this.center = center;
        this._map = MapUtil.createMap({id, center, zoom});
    }

    addHouse({coords}) {
        return this.addPlacemark({
            map: this._map,
            image: '/resources/img/map/housePlacemark.svg',
            coords,
            size: [50, 50]
        });
    }

    addPlacemark({image, coords, size, offset}) {
        return MapUtil.addPlacemark({map: this._map, image, coords, size, offset});
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