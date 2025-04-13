import MainLayout from "../main/index";
import OfferCreate from "../../models/offerCreate.ts";
import OfferCreateBtns from "../../components/offerCreateBtns";
import OfferCreateNav from "../../components/offerCreateNav";
import OfferPage from "../../pages/offerCreate/page.ts";
import {PageRenderInterface} from "../../pages/page.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import offerCreateBtnsTemplate from "../../components/offerCreateBtns/template.precompiled.js";
import {getOfferById} from "../../util/apiUtil.ts";
import Loader from "../../components/loader";

/**
 * @class OfferEditLayout
 * @description Макет страницы редактирования объявления.
 * @augments MainLayout
 */
class OfferEditLayout extends MainLayout {
    private _offerId: number | undefined;
    private _currentPage: string | undefined;
    private _unlockedPages: string[];
    private _filledPagesId: string[];
    private _allPages: string[];
    private _offerCreateNav: OfferCreateNav | undefined;
    private _offerCreateBtns: OfferCreateBtns | undefined;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._currentPage = "type";
        this._allPages = ["type", "address", "params", "price", "photos", "description"];
        this._unlockedPages = this._allPages;
        this._filledPagesId = this._allPages;

        this.on('goToPage', this._handlePageChange.bind(this));
        this.on('nextPage', this._handleNextPage.bind(this));
        this.on('prevPage', this._handlePrevPage.bind(this));
        this.on('pageFilled', this._handlePageFilled.bind(this));
        this.on('submitPage', this._handlePageSubmit.bind(this));
    }

    /**
     * @function process
     * @description Метод обработки страницы.
     * @param {Page} page экземпляр класса Page.
     * @returns {{destroy: *, render: *}} Метод destroy и метод render.
     */
    process(page: OfferPage) {
        return {
            destroy: () => {
                if (this._offerCreateNav) {
                    this._offerCreateNav.destroy();
                }
                if (this._offerCreateBtns) {
                    this._offerCreateBtns.destroy();
                }
                super.process(page).destroy();
            },
            render: ({root, props}: PageRenderInterface) => {
                super.process(page).render({props, root});

                if (!props || typeof props.id !== 'number') {
                    return;
                }
                const loader = new Loader({layout: this, page: page});
                if (this._offerId === undefined) {
                    loader.setLoaderStatus(true);
                    this.makeRequest(getOfferById, props.id).then((data) => {
                        if (data) {
                            this._offerId = data.offer.id;
                            OfferCreate.parseJSON(data).then(() => {
                                RouteManager.navigateToPageByCurrentURL();
                            })
                        }
                    }).finally(() => {
                        loader.setLoaderStatus(false);
                    })
                }

                const offerCreateBtns = document.getElementById("offerCreateBtns") as HTMLElement;
                offerCreateBtns.innerHTML = offerCreateBtnsTemplate({firstPage: page._pageName === this._allPages.at(0), lastPage: page._pageName === this._allPages.at(-1)});

                this._offerCreateNav = new OfferCreateNav({layout: this, page});
                this._offerCreateBtns = new OfferCreateBtns({layout: this, page});
                this._currentPage = page._pageName;
                this._updateNavClasses();

                this._updateOfferCreateButtons();
                this._unlockPages();
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
            formInputHandler: page.formInputHandler,
            resetApiError: page.resetApiError,
            showApiError: page.showApiError,
            showFieldError: page.showFieldError,
            validateFormFields: page.validateFormFields,
        }
    }

    /**
     * @function _updateOfferCreateButtons
     * @description Метод обновления состояния кнопок создания объявления.
     * @private
     */
    _updateOfferCreateButtons() {
        if (!this._currentPage || !this._offerCreateBtns) {
            return;
        }
        if (OfferCreate.isPageFilled(this._currentPage)) {
            if (this._currentPage === this._allPages[this._allPages.length - 1]) {
                this._offerCreateBtns.enableSubmitButton();
                return;
            }
            this._offerCreateBtns.enableNextButton();
        } else {
            if (this._currentPage === this._allPages[this._allPages.length - 1]) {
                this._offerCreateBtns.disableSubmitButton();
                return;
            }
            this._offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function _handlePageChange
     * @description Обработчик события перехода на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _handlePageChange(page: string) {
        if (!this._currentPage || page === this._currentPage) {
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
    _isAllPagesBeforeFilled(page: string) {
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
    _handlePageFilled(isFilled: boolean) {
        const nextPage = this._getNextPage();
        if (!this._currentPage || !this._offerCreateBtns) {
            return;
        }
        if (isFilled) {
            if (this._filledPagesId.includes(this._currentPage)) {
                return;
            }
            this._filledPagesId.push(this._currentPage);
            if (this._currentPage !== this._allPages[this._allPages.length - 1]) {
                this._unlockPage(nextPage);
            }
            if (this._currentPage === this._allPages[this._allPages.length - 1]) {
                this._offerCreateBtns.enableSubmitButton();
                return;
            }
            this._offerCreateBtns.enableNextButton();
        } else {
            if (!this._filledPagesId.includes(this._currentPage)) {
                return;
                }
            this._filledPagesId = this._filledPagesId.filter((id) => id !== this._currentPage);
            this._lockPage(this._getNextPage());
            if (this._currentPage === this._allPages[this._allPages.length - 1]) {
                this._offerCreateBtns.disableSubmitButton();
                return;
            }
            this._offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function _handlePageSubmit
     * @description Обработчик события отправки страницы.
     */
    async _handlePageSubmit() {
        if (!this._currentPage || this._offerId === undefined) {
            return;
        }
        await this.makeRequest(OfferCreate.save.bind(OfferCreate), this._offerId).then((offerId) => {
            if (typeof offerId === 'number') {
                RouteManager.navigateTo("/offer/details/".concat(offerId.toString()));
            }
        });
    }

    /**
     * @function _updateNavClasses
     * @description Метод обновления классов навигации.
     * @param {string} prevStageId идентификатор предыдущей стадии.
     * @private
     */
    _updateNavClasses(prevStageId: string = "") {
        if (!this._offerCreateNav || !this._currentPage) {
            return;
        }
        if (prevStageId.length > 0) {
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
    _goToPage(page: string) {
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
    _navigateToPage(page: string) {
        if (this._offerId === undefined) {
            return;
        }
        RouteManager.navigateTo("/offer/edit/".concat(this._offerId.toString(), '/', page));
        this._currentPage = page;
    }

    /**
     * @function _lockPage
     * @description Метод блокировки страницы.
     * @param {string} page идентификатор страницы.
     * @private
     */
    _lockPage(page: string) {
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
    _unlockPage(page: string) {
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
        if (!this._currentPage) {
            return this._allPages[0];
        }
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
        if (!this._currentPage) {
            return this._allPages[0];
        }
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
            const pageButton = document.getElementById(page.concat("PageButton")) as HTMLElement;
            const pageTitle = document.getElementById(page.concat("PageTitle")) as HTMLElement;
            pageButton.classList.remove("offerCreate__nav-stage-point-disabled");
            pageTitle.classList.remove("offerCreate__nav-stage-title-disabled");
        });
    }

    reset() {
        this._offerId = undefined;
    }
}

export default new OfferEditLayout();