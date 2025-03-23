'use strict';

class OfferCreate {
    constructor() {
        this._offerData = {};
    }

    getData() {
        if (!this._submit) {
            return null;
        }
        return this._offerData;
    }

    setPhotos(files) {
        this._offerData.photos = files;
    }

}

export default new OfferCreate();