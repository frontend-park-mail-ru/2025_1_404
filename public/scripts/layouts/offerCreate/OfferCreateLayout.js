import MainLayout from "../main/MainLayout.js";
import RouteManager from "../../managers/RouteManager/RouteManager.js";
import OfferCreateNav from "../../components/OfferCreateNav/OfferCreateNav.js";
import OfferCreateBtns from "../../components/OfferCreateBtns/OfferCreateBtns.js";

class OfferCreateLayout extends MainLayout {
    constructor() {
        super();
        this._currentPage = "type";
        this._unlockedPages = ["type", "address"];
        this._filledPagesId = [];
        this._allPages = ["type", "address", "params", "price", "photos", "description"];
        this._submit = false;
        this._filled = false;

        this.on('goToPage', (page) => {
            if (page === this._currentPage) {
                return
            }
            if (this._allPages.indexOf(page) < this._allPages.indexOf(this._currentPage)) {
                const prevStageId = this._currentPage + "PageButton";
                this._goToPage(page);
                this._offerCreateNav.addEmptyStageClass(prevStageId);
                this._offerCreateNav.addFilledStageClass(this._filledPagesId);
                this._offerCreateNav.addCurrentStageClass(this._currentPage + "PageButton");
            } else {
                if (!this._filledPagesId.includes(this._currentPage + "PageButton")) {
                    this._filledPagesId.push(this._currentPage + "PageButton");
                }
                this._goToPage(page);
                this._offerCreateNav.addFilledStageClass(this._filledPagesId);
                this._offerCreateNav.addCurrentStageClass(this._currentPage + "PageButton");
            }
        })

        this.on('nextPage', () => {
            if (!this._filledPagesId.includes(this._currentPage + "PageButton")) {
                this._filledPagesId.push(this._currentPage + "PageButton");
            }
            this._nextPage();
            this._offerCreateNav.addFilledStageClass(this._filledPagesId);
            this._offerCreateNav.addCurrentStageClass(this._currentPage + "PageButton");
        })

        this.on('prevPage', () => {
            const prevStageId = this._currentPage + "PageButton";
            this._prevPage();
            this._offerCreateNav.addEmptyStageClass(prevStageId);
            this._offerCreateNav.addFilledStageClass(this._filledPagesId);
            this._offerCreateNav.addCurrentStageClass(this._currentPage + "PageButton");
        })
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

                this._offerCreateNav = new OfferCreateNav({layout: this, page});
                this._offerCreateNav.addCurrentStageClass(this._currentPage + "PageButton");
                this._offerCreateBtns = new OfferCreateBtns({layout: this, page});

                this._unlockPages();
            }

        }
    }

    _nextPage() {
        if (this._allPages[this._allPages.length - 1] !== this._currentPage) {
            const nextPage = this._allPages[this._allPages.indexOf(this._currentPage) + 1];
            RouteManager.navigateTo("/offer/create/" + nextPage);
            this._currentPage = nextPage;
            if (this._unlockedPages[this._unlockedPages.length - 1] === nextPage
                && this._allPages[this._allPages.length - 1] !== nextPage) {
                this._unlockedPages.push(this._allPages[this._allPages.indexOf(nextPage) + 1]);
                this._unlockPages();
            }
        }
    }

    _prevPage() {
        if (this._allPages[0] !== this._currentPage) {
            let prevPage = this._allPages[this._allPages.indexOf(this._currentPage) - 1];
            RouteManager.navigateTo("/offer/create/" + prevPage);
            this._currentPage = prevPage;
        }
    }

    _goToPage(page) {
        if (this._unlockedPages.includes(page)) {
            RouteManager.navigateTo("/offer/create/" + page);
            this._currentPage = page;
            if (this._unlockedPages[this._unlockedPages.length - 1] === page
                && this._allPages[this._allPages.length - 1] !== page) {
                this._unlockedPages.push(this._allPages[this._allPages.indexOf(page) + 1]);
                this._unlockPages();
            }
        }
    }

    _unlockPages() {
        console.log(this._unlockedPages);
        this._unlockedPages.forEach((page) => {
            document.getElementById(page + "PageButton").classList.remove("offerCreate__stage-point-disabled");
            document.getElementById(page + "PageTitle").classList.remove("offerCreate__stage-title-disabled");
        })
    }
}

export default new OfferCreateLayout();