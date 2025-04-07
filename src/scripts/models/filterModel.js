'use strict';

class FilterModel {
    constructor() {
        this._filterData = {};
    }

    getFilterData() {
        return this._filterData;
    }

    setData(filterName, data) {
        this._filterData[filterName] = data;
    }

}

export default new FilterModel();