import MainLayout from "../main/index.js";
import OfferCreate from "../../models/offerCreate.js";
import OfferCreateBtns from "../../components/offerCreateBtns/index.js";
import OfferCreateNav from "../../components/offerCreateNav/index.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import offerCreateBtnsTemplate from "../../components/offerCreateBtns/template.precompiled.js";

/**
 * @class OfferCreateLayout
 * @description Макет страницы создания объявления.
 * @augments MainLayout
 */
class OfferCreateLayout extends MainLayout {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._currentPage = "type";
        this._unlockedPages = ["type", "address"];
        this._filledPagesId = ["type"];
        this._allPages = ["type", "address", "params", "price", "photos", "description"];

        this.on('goToPage', this._handlePageChange.bind(this));
        this.on('nextPage', this._handleNextPage.bind(this));
        this.on('prevPage', this._handlePrevPage.bind(this));
        this.on('pageFilled', this._handlePageFilled.bind(this));
    }

    /**
     * @function process
     * @description Метод обработки страницы.
     * @param {Page} page экземпляр класса Page.
     * @returns {{destroy: *, render: *}} Метод destroy и метод render.
     */
    process(page) {
        return {
            destroy: () => {
                this._offerCreateNav.destroy();
                this._offerCreateBtns.destroy();
                super.process(page).destroy();
            },
            render: ({root, props}) => {
                super.process(page).render({props, root});

                document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: page._pageName === this._allPages.at(0), lastPage: page._pageName === this._allPages.at(-1)});

                this._offerCreateNav = new OfferCreateNav({layout: this, page});
                this._offerCreateBtns = new OfferCreateBtns({layout: this, page});
                this._currentPage = page._pageName;
                this._updateNavClasses();

                this._updateOfferCreateButtons();
                this._unlockPages();
            }
        }
    }

    /**
     * @function _updateOfferCreateButtons
     * @description Метод обновления состояния кнопок создания объявления.
     * @private
     */
    _updateOfferCreateButtons() {
        if (OfferCreate.isPageFilled(this._currentPage)) {
            this._offerCreateBtns.enableNextButton();
        } else {
            this._offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function _handlePageChange
     * @description Обработчик события перехода на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _handlePageChange(page) {
        if (page === this._currentPage) {
            return;
        }

        if (this._allPages.indexOf(page) < this._allPages.indexOf(this._currentPage) || this._isAllPagesBeforeFilled(page)) {
            this._goToPage(page);
            this._updateNavClasses(this._currentPage);
        }
    }

    /**
     * @function _isAllPagesBeforeFilled
     * @description Метод проверки, заполнены ли все страницы перед текущей.
     * @param {string} page идентификатор страницы.
     * @returns {boolean} true, если все страницы перед текущей заполнены, иначе false.
     * @private
     */
    _isAllPagesBeforeFilled(page) {
        for (let i = 0; i < this._allPages.indexOf(page); i++) {
            if (!OfferCreate.isPageFilled(this._allPages[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @function _handleNextPage
     * @description Обработчик события перехода на следующую страницу.
     * @private
     */
    _handleNextPage() {
        this._nextPage();
        this._updateNavClasses();
    }

    /**
     * @function _handlePrevPage
     * @description Обработчик события перехода на предыдущую страницу.
     * @private
     */
    _handlePrevPage() {
        this._prevPage();
        this._updateNavClasses(this._currentPage);
    }

    /**
     * @function _handlePageFilled
     * @description Обработчик события заполнения страницы.
     * @param {boolean} isFilled true, если страница заполнена, иначе false.
     * @private
     */
    _handlePageFilled(isFilled) {
        const nextPage = this._getNextPage();
        if (isFilled) {
            if (this._filledPagesId.includes(this._currentPage)) {
                return;
            }
            this._filledPagesId.push(this._currentPage);
            this._unlockPage(nextPage);
            this._offerCreateBtns.enableNextButton();
        } else {
            if (!this._filledPagesId.includes(this._currentPage)) {
                return;
                }
            this._filledPagesId = this._filledPagesId.filter((id) => id !== this._currentPage);
            this._lockPage(this._getNextPage());
            this._offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function _updateNavClasses
     * @description Метод обновления классов навигации.
     * @param {string} prevStageId идентификатор предыдущей стадии.
     * @private
     */
    _updateNavClasses(prevStageId) {
        if (prevStageId) {
            this._offerCreateNav.addEmptyStageClass(prevStageId);
        }
        this._offerCreateNav.addFilledStageClass(this._filledPagesId);
        this._offerCreateNav.addCurrentStageClass(this._currentPage);
    }

    /**
     * @function _nextPage
     * @description Метод перехода на следующую страницу.
     * @private
     */
    _nextPage() {
        const nextPage = this._getNextPage();
        if (nextPage) {
            this._goToPage(nextPage);
        }
    }

    /**
     * @function _prevPage
     * @description Метод перехода на предыдущую страницу.
     * @private
     */
    _prevPage() {
        const prevPage = this._getPrevPage();
        if (prevPage) {
            this._goToPage(prevPage);
        }
    }

    /**
     * @function _goToPage
     * @description Метод перехода на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _goToPage(page) {
        if (this._unlockedPages.includes(page)) {
            this._navigateToPage(page);
        }
    }

    /**
     * @function _navigateToPage
     * @description Метод навигации на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _navigateToPage(page) {
        RouteManager.navigateTo("/offer/create/".concat(page));
        this._currentPage = page;
    }

    /**
     * @function _lockPage
     * @description Метод блокировки страницы.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _lockPage(page) {
        if (this._unlockedPages.includes(page)) {
            this._unlockedPages = this._unlockedPages.filter((unlockedPage) => unlockedPage !== page);
            this._unlockPages();
        }
    }

    /**
     * @function _unlockPage
     * @description Метод разблокировки страницы.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _unlockPage(page) {
        if (!this._unlockedPages.includes(page)) {
            this._unlockedPages.push(page);
            this._unlockPages();
        }
    }

    /**
     * @function _getNextPage
     * @description Метод получения следующей страницы.
     * @returns {*} следующая страница.
     * @private
     */
    _getNextPage() {
        const currentIndex = this._allPages.indexOf(this._currentPage);
        return this._allPages[currentIndex + 1];
    }

    /**
     * @function _getPrevPage
     * @description Метод получения предыдущей страницы.
     * @returns {*} предыдущая страница.
     * @private
     */
    _getPrevPage() {
        const currentIndex = this._allPages.indexOf(this._currentPage);
        return this._allPages[currentIndex - 1];
    }

    /**
     * @function _unlockPages
     * @description Метод разблокировки страниц.
     * @private
     */
    _unlockPages() {
        this._unlockedPages.forEach((page) => {
            document.getElementById(page.concat("PageButton")).classList.remove("offerCreate__nav-stage-point-disabled");
            document.getElementById(page.concat("PageTitle")).classList.remove("offerCreate__nav-stage-title-disabled");
        });
    }
}

export default new OfferCreateLayout();