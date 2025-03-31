import MainLayout from "../main/index.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import OfferCreateNav from "../../components/offerCreateNav/index.js";
import OfferCreateBtns from "../../components/offerCreateBtns/index.js";
import OfferCreate from "../../models/offerCreate.js";
import offerCreateBtnsTemplate from "../../components/offerCreateBtns/template.precompiled.js";

class OfferCreateLayout extends MainLayout {
    constructor() {
        super();
        this._currentPage = "type";
        this._unlockedPages = ["type", "address"];
        this._filledPagesId = [];
        this._allPages = ["type", "address", "params", "price", "photos", "description"];

        this.on('goToPage', this._handlePageChange.bind(this));
        this.on('nextPage', this._handleNextPage.bind(this));
        this.on('prevPage', this._handlePrevPage.bind(this));
        this.on('pageFilled', this._handlePageFilled.bind(this));
    }

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
                this._offerCreateNav.addCurrentStageClass(this._currentPage.concat("PageButton"));
                this._offerCreateBtns = new OfferCreateBtns({layout: this, page});

                this._unlockPages();
            }
        }
    }

    _handlePageChange(page) {
        if (page === this._currentPage) return;

        const prevStageId = this._currentPage.concat("PageButton");
        if (this._allPages.indexOf(page) < this._allPages.indexOf(this._currentPage) || this._isAllPagesBeforeFilled(page)) {
            this._goToPage(page);
            this._updateNavClasses(prevStageId);
        }
    }

    _isAllPagesBeforeFilled(page) {
        for (let i = 0; i < this._allPages.indexOf(page); i++) {
            if (!OfferCreate.isPageFilled(this._allPages[i])) {
                return false;
            }
        }
        return true;
    }

    _handleNextPage() {
        this._nextPage();
        this._updateNavClasses();
    }

    _handlePrevPage() {
        const prevStageId = this._currentPage.concat("PageButton");
        this._prevPage();
        this._updateNavClasses(prevStageId);
    }

    _handlePageFilled(isFilled) {
        const buttonName = this._currentPage.concat("PageButton");
        const nextPage = this._getNextPage();
        if (isFilled) {
            if (this._filledPagesId.includes(buttonName)) {
                return;
            }
            this._filledPagesId.push(buttonName);
            this._unlockPage(nextPage);
        } else {
            if (!this._filledPagesId.includes(buttonName)) {
                return;
                }
            this._filledPagesId = this._filledPagesId.filter((id) => id !== buttonName);
            this._lockPage(this._getNextPage());
        }
    }

    _updateNavClasses(prevStageId) {
        if (prevStageId) {
            this._offerCreateNav.addEmptyStageClass(prevStageId);
        }
        this._offerCreateNav.addFilledStageClass(this._filledPagesId);
        this._offerCreateNav.addCurrentStageClass(this._currentPage.concat("PageButton"));
    }

    _nextPage() {
        const nextPage = this._getNextPage();
        if (nextPage) {
            this._goToPage(nextPage);
        }
    }

    _prevPage() {
        const prevPage = this._getPrevPage();
        if (prevPage) {
            this._goToPage(prevPage);
        }
    }

    _goToPage(page) {
        if (this._unlockedPages.includes(page)) {
            this._navigateToPage(page);
        }
    }

    _navigateToPage(page) {
        RouteManager.navigateTo("/offer/create/".concat(page));
        this._currentPage = page;
    }

    _lockPage(page) {
        if (this._unlockedPages.includes(page)) {
            this._unlockedPages = this._unlockedPages.filter((unlockedPage) => unlockedPage !== page);
            this._unlockPages();
        }
    }

    _unlockPage(page) {
        if (!this._unlockedPages.includes(page)) {
            this._unlockedPages.push(page);
            this._unlockPages();
        }
    }

    _getNextPage() {
        const currentIndex = this._allPages.indexOf(this._currentPage);
        return this._allPages[currentIndex + 1];
    }

    _getPrevPage() {
        const currentIndex = this._allPages.indexOf(this._currentPage);
        return this._allPages[currentIndex - 1];
    }

    _unlockPages() {
        this._unlockedPages.forEach((page) => {
            document.getElementById(page.concat("PageButton")).classList.remove("offerCreate__stage-point-disabled");
            document.getElementById(page.concat("PageTitle")).classList.remove("offerCreate__stage-title-disabled");
        });
    }
}

export default new OfferCreateLayout();