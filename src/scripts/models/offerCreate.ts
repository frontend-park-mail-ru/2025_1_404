
/**
 * @class OfferCreate
 * @description Модель создания объявления.
 */
class OfferCreate {
    private _offerData: Record<string, Record<string, string>> = {};
    private _filledPages: Record<string, boolean> = {};
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this._filledPages = {
            'type': true,
            'address': false,
            'params': false,
            'price': false,
            'photos': false,
            'description': false,
        };
    }

    /**
     * @function getOfferData
     * @description Метод получения данных объявления.
     * @returns {*|{}} Данные объявления.
     */
    getOfferData() {
        return this._offerData;
    }

    /**
     * @function setData
     * @description Метод установки данных объявления.
     * @param {string} pageName имя страницы.
     * @param {object} data данные страницы.
     */
    setData(pageName: string, data: Record<string, string>) {
        this._offerData[pageName] = data;
    }

    /**
     * @function setPageFilled
     * @description Метод установки статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @param {boolean} isFilled статус заполненности страницы.
     */
    setPageFilled(pageName: string, isFilled: boolean) {
        this._filledPages[pageName] = isFilled;
    }

    /**
     * @function isPageFilled
     * @description Метод получения статуса заполненности страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности страницы.
     */
    isPageFilled(pageName: string) {return this._filledPages[pageName];}

    /**
     * @function isPreviousPageFilled
     * @description Метод получения статуса заполненности предыдущей страницы.
     * @param {string} pageName имя страницы.
     * @returns {boolean} статус заполненности предыдущей страницы.
     */
    isPreviousPageFilled(pageName: string) {
        const pageNames = Object.keys(this._filledPages);
        const currentPageIndex = pageNames.indexOf(pageName);
        if (currentPageIndex === 0) {
            return true;
        }
        const previousPageName = pageNames[currentPageIndex - 1];
        return this._filledPages[previousPageName];
    }

    /**
     * @function getFilledPages
     * @description Метод получения статуса заполненности страниц.
     * @returns {string} имя страницы.
     */
    getLastFilledPage() {
        return Object.keys(this._filledPages).reverse().find((pageName) => this._filledPages[pageName]) || 'type';
    }

}

export default new OfferCreate();