'use strict';

/**
 * @class FilterModel
 * @description Модель для хранения фильтров.
 */
class FilterModel {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this._filterData = {};
    }

    /**
     * @function getFilterData
     * @description Метод получения данных фильтров.
     * @returns {*|{}} возвращает объект с данными фильтров.
     */
    getFilterData() {
        return this._filterData;
    }

    /**
     * @function setData
     * @description Метод установки данных фильтра.
     * @param {string} filterName имя фильтра, по которому будут сохранены данные.
     * @param {*} data данные, которые нужно сохранить в фильтр.
     */
    setData(filterName, data) {
        this._filterData[filterName] = data;
    }

}

export default new FilterModel();