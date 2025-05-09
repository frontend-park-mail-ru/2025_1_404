
/**
 * @class FilterModel
 * @description Модель для хранения фильтров.
 */
class FilterModel {
    private filterData: Record<string, string>;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.filterData = {
            "filterOfferType": '',
            "filterPropertyType": '',
            "filterPriceLeft__input": '',
            "filterPriceRight__input": '',
            "filterSquareLeft__input": '',
            "filterSquareRight__input": '',
            "filterInputAddress__input": '',
        };
    }

    /**
     * @function getFilterData
     * @description Метод получения данных фильтров.
     * @returns {*|{}} возвращает объект с данными фильтров.
     */
    getFilterData() {
        return this.filterData;
    }

    /**
     * @function setData
     * @description Метод установки данных фильтра.
     * @param {string} filterName имя фильтра, по которому будут сохранены данные.
     * @param {*} data данные, которые нужно сохранить в фильтр.
     */
    setData(filterName: string, data: string) {
        this.filterData[filterName] = data;
    }

}

export default new FilterModel();