import MainLayout from "../main/index";
import OfferCreate from "../../models/offerCreate.ts";
import OfferCreateBtns from "../../components/offerCreateBtns";
import OfferCreateNav from "../../components/offerCreateNav";
import OfferPage from "../../pages/offerCreate/page.ts";
import {PageRenderInterface} from "../../pages/page.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import offerCreateBtnsTemplate from "../../components/offerCreateBtns/template.precompiled.js";

/**
 * @class OfferCreateLayout
 * @description Макет страницы создания объявления.
 * @augments MainLayout
 */
class OfferCreateLayout extends MainLayout {
    private currentPage: string | undefined;
    private unlockedPages: string[] = [];
    private filledPagesId: string[] = [];
    private allPages: string[] = [];
    private offerCreateNav: OfferCreateNav | undefined;
    private offerCreateBtns: OfferCreateBtns | undefined;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();

        this.init();

        this.on('goToPage', this.handlePageChange.bind(this));
        this.on('nextPage', this.handleNextPage.bind(this));
        this.on('prevPage', this.handlePrevPage.bind(this));
        this.on('pageFilled', this.handlePageFilled.bind(this));
        this.on('submitPage', this.handlePageSubmit.bind(this));
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
                if (this.offerCreateNav) {
                    this.offerCreateNav.destroy();
                }
                if (this.offerCreateBtns) {
                    this.offerCreateBtns.destroy();
                }
                super.process(page).destroy();
            },
            render: ({root, props}: PageRenderInterface) => {
                super.process(page).render({props, root});

                const offerCreateBtns = document.getElementById("offerCreateBtns") as HTMLElement;
                offerCreateBtns.innerHTML = offerCreateBtnsTemplate({firstPage: page.pageName === this.allPages.at(0), lastPage: page.pageName === this.allPages.at(-1)});

                this.offerCreateNav = new OfferCreateNav({layout: this, page});
                this.offerCreateBtns = new OfferCreateBtns({layout: this, page});
                this.currentPage = page.pageName;
                this.updateNavClasses();

                this.updateOfferCreateButtons();
                this.unlockPages();
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
     * @function init
     * @description Метод инициализации страниц создания объявления.
     * @public
     */
    init() {
        this.currentPage = "type";
        this.unlockedPages = ["type", "address"];
        this.filledPagesId = ["type"];
        this.allPages = ["type", "address", "params", "price", "photos", "description"];
    }

    /**
     * @function updateOfferCreateButtons
     * @description Метод обновления состояния кнопок создания объявления.
     * @private
     */
    private updateOfferCreateButtons() {
        if (!this.currentPage || !this.offerCreateBtns) {
            return;
        }
        if (OfferCreate.isPageFilled(this.currentPage)) {
            if (this.currentPage === this.allPages[this.allPages.length - 1]) {
                this.offerCreateBtns.enableSubmitButton();
                return;
            }
            this.offerCreateBtns.enableNextButton();
        } else {
            if (this.currentPage === this.allPages[this.allPages.length - 1]) {
                this.offerCreateBtns.disableSubmitButton();
                return;
            }
            this.offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function handlePageChange
     * @description Обработчик события перехода на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    private handlePageChange(page: string) {
        if (!this.currentPage || page === this.currentPage) {
            return;
        }

        if (this.allPages.indexOf(page) < this.allPages.indexOf(this.currentPage) || this.isAllPagesBeforeFilled(page)) {
            this.goToPage(page);
            this.updateNavClasses(this.currentPage);
        }
    }

    /**
     * @function isAllPagesBeforeFilled
     * @description Метод проверки, заполнены ли все страницы перед текущей.
     * @param {string} page идентификатор страницы.
     * @returns {boolean} true, если все страницы перед текущей заполнены, иначе false.
     * @private
     */
    private isAllPagesBeforeFilled(page: string) {
        for (let i = 0; i < this.allPages.indexOf(page); i++) {
            if (!OfferCreate.isPageFilled(this.allPages[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @function handleNextPage
     * @description Обработчик события перехода на следующую страницу.
     * @private
     */
    private handleNextPage() {
        this.nextPage();
        this.updateNavClasses();
    }

    /**
     * @function handlePrevPage
     * @description Обработчик события перехода на предыдущую страницу.
     * @private
     */
    private handlePrevPage() {
        this.prevPage();
        this.updateNavClasses(this.currentPage);
    }

    /**
     * @function handlePageFilled
     * @description Обработчик события заполнения страницы.
     * @param {boolean} isFilled true, если страница заполнена, иначе false.
     * @private
     */
    // eslint-disable-next-line max-statements
    private handlePageFilled(isFilled: boolean) {
        const nextPage = this.getNextPage();
        if (!this.currentPage || !this.offerCreateBtns) {
            return;
        }
        if (isFilled) {
            if (this.filledPagesId.includes(this.currentPage)) {
                return;
            }
            this.filledPagesId.push(this.currentPage);
            if (this.currentPage !== this.allPages[this.allPages.length - 1]) {
                this.unlockPage(nextPage);
            }
            if (this.currentPage === this.allPages[this.allPages.length - 1]) {
                this.offerCreateBtns.enableSubmitButton();
                return;
            }
            this.offerCreateBtns.enableNextButton();
        } else {
            if (!this.filledPagesId.includes(this.currentPage)) {
                return;
                }
            this.filledPagesId = this.filledPagesId.filter((id) => id !== this.currentPage);
            this.lockPage(this.getNextPage());
            if (this.currentPage === this.allPages[this.allPages.length - 1]) {
                this.offerCreateBtns.disableSubmitButton();
                return;
            }
            this.offerCreateBtns.disableNextButton();
        }
    }

    /**
     * @function handlePageSubmit
     * @description Обработчик события отправки страницы.
     */
    private async handlePageSubmit() {
        if (!this.currentPage) {
            return;
        }
        await this.makeRequest(OfferCreate.create.bind(OfferCreate)).then((offerId) => {
            if (typeof offerId === 'number') {
                RouteManager.navigateTo("/offer/details/".concat(offerId.toString()));
            }
        }).catch((e: Error) => {
            this?.addPopup('Ошибка сервера', e.message);
        });
    }

    /**
     * @function updateNavClasses
     * @description Метод обновления классов навигации.
     * @param {string} prevStageId идентификатор предыдущей стадии.
     * @private
     */
    private updateNavClasses(prevStageId: string = "") {
        if (!this.offerCreateNav || !this.currentPage) {
            return;
        }
        if (prevStageId.length > 0) {
            this.offerCreateNav.addEmptyStageClass(prevStageId);
        }
        this.offerCreateNav.addFilledStageClass(this.filledPagesId);
        this.offerCreateNav.addCurrentStageClass(this.currentPage);
    }

    /**
     * @function nextPage
     * @description Метод перехода на следующую страницу.
     * @private
     */
    private nextPage() {
        const nextPage = this.getNextPage();
        if (nextPage) {
            this.goToPage(nextPage);
        }
    }

    /**
     * @function prevPage
     * @description Метод перехода на предыдущую страницу.
     * @private
     */
    private prevPage() {
        const prevPage = this.getPrevPage();
        if (prevPage) {
            this.goToPage(prevPage);
        }
    }

    /**
     * @function goToPage
     * @description Метод перехода на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    private goToPage(page: string) {
        if (this.unlockedPages.includes(page)) {
            this.navigateToPage(page);
        }
    }

    /**
     * @function navigateToPage
     * @description Метод навигации на страницу.
     * @param {string} page идентификатор страницы.
     * @private
     */
    private navigateToPage(page: string) {
        RouteManager.navigateTo("/offer/create/".concat(page));
        this.currentPage = page;
    }

    /**
     * @function lockPage
     * @description Метод блокировки страницы.
     * @param {string} page идентификатор страницы.
     * @private
     */
    private lockPage(page: string) {
        if (this.unlockedPages.includes(page)) {
            this.unlockedPages = this.unlockedPages.filter((unlockedPage) => unlockedPage !== page);
            this.unlockPages();
        }
    }

    /**
     * @function unlockPage
     * @description Метод разблокировки страницы.
     * @param {string} page идентификатор страницы.
     * @private
     */
    private unlockPage(page: string) {
        if (!this.unlockedPages.includes(page)) {
            this.unlockedPages.push(page);
            this.unlockPages();
        }
    }

    /**
     * @function getNextPage
     * @description Метод получения следующей страницы.
     * @returns {*} следующая страница.
     * @private
     */
    private getNextPage() {
        if (!this.currentPage) {
            return this.allPages[0];
        }
        const currentIndex = this.allPages.indexOf(this.currentPage);
        return this.allPages[currentIndex + 1];
    }

    /**
     * @function getPrevPage
     * @description Метод получения предыдущей страницы.
     * @returns {*} предыдущая страница.
     * @private
     */
    private getPrevPage() {
        if (!this.currentPage) {
            return this.allPages[0];
        }
        const currentIndex = this.allPages.indexOf(this.currentPage);
        return this.allPages[currentIndex - 1];
    }

    /**
     * @function unlockPages
     * @description Метод разблокировки страниц.
     * @private
     */
    private unlockPages() {
        this.unlockedPages.forEach((page) => {
            const pageButton = document.getElementById(page.concat("PageButton")) as HTMLElement;
            const pageTitle = document.getElementById(page.concat("PageTitle")) as HTMLElement;
            pageButton.classList.remove("offerCreate__nav-stage-point-disabled");
            pageTitle.classList.remove("offerCreate__nav-stage-title-disabled");
        });
    }
}

export default new OfferCreateLayout();