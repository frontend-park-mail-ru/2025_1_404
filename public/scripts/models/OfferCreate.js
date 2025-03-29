'use strict';

class OfferCreate {
    constructor() {
        this._offerData = {};
        this._filledPages = {};
    }

    getOfferData() {
        return this._offerData;
    }

    setData(currentPage, data) {
        this._offerData[currentPage] = data;
        console.log(this._offerData);
    }

    setPageFilled(currentPage, currentPageFilled) {
        this._filledPages[currentPage] = currentPageFilled;
        console.log(currentPageFilled);
    }

    getCurrentPageFilled(currentPage) {return this._filledPages[currentPage];}

}

export default new OfferCreate();