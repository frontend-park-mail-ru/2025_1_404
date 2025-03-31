'use strict';

class OfferCreate {
    constructor() {
        this._offerData = {};
        this._filledPages = {
            'type': true,
            'address': false,
            'params': false,
            'price': false,
            'photos': false,
            'description': false,
        };
    }

    getOfferData() {
        return this._offerData;
    }

    setData(pageName, data) {
        this._offerData[pageName] = data;
    }

    setPageFilled(pageName, isFilled) {
        this._filledPages[pageName] = isFilled;
    }

    isPageFilled(pageName) {return this._filledPages[pageName];}

    isPreviousPageFilled(pageName) {
        const pageNames = Object.keys(this._filledPages);
        const currentPageIndex = pageNames.indexOf(pageName);
        if (currentPageIndex === 0) {
            return true;
        }
        const previousPageName = pageNames[currentPageIndex - 1];
        return this._filledPages[previousPageName];
    }

    getLastFilledPage() {
        return Object.keys(this._filledPages).reverse().find((pageName) => this._filledPages[pageName]) || 'type';
    }

}

export default new OfferCreate();