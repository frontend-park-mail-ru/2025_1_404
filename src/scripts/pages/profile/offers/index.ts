
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";
import {BaseLayout} from "../../../layouts/baseLayout.ts";
import {deleteOffer, searchOffers} from "../../../util/apiUtil.ts";
import profileOfferTemplate from "../../../components/profileOffer/template.precompiled.js"
import Offer from "../../../models/offer.ts";
import getMetroColorByLineName from "../../../util/metroUtil.ts";
import RouteManager from "../../../managers/routeManager/routeManager.ts";
import User from "../../../models/user.ts";
import OfferEditLayout from "../../../layouts/offerEdit/index.ts";

/**
 * @class ProfileMyOffersPage
 * @description Страница "мои объявления" в профиле
 * @augments Page
 */
export default class ProfileMyOffersPage extends Page {
    private _layout: BaseLayout | undefined;
    private _offerStatus = 2;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root} : PageRenderInterface) {
        this._layout = layout;
        root.innerHTML = template();
        super.render({layout, root});
        this._updateContent(this._offerStatus);
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('profile-right-nav', 'click', this._handleTabClick);
        this.initListener('profile-right-list', 'click', this._handleCardClick);
    }

    /**
     * @function _handleCardClick
     * @description Метод обработки клика по карточке объявления.
     * @param {Event} event событие
     */
    _handleCardClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        let parent = target;
        while (parent.parentElement && !parent.classList.contains('profile__offer')) {
            parent = parent.parentElement as HTMLElement;
        }
        if (!parent || typeof parent.dataset.id !== 'string') {
            return;
        }
        const offerId = parseInt(parent.dataset.id, 10);
        if (isNaN(offerId)) {
            return;
        }
        event.preventDefault();
        if (target.classList.contains('profile__offer-link')) {
            RouteManager.navigateTo(`/offer/details/${offerId}`);
        }
        if (target.classList.contains("light-btn")) {
            OfferEditLayout.reset();
            RouteManager.navigateTo(`/offer/edit/${offerId}/type`);
        }
        if (target.classList.contains("red-btn")) {
           this._deleteOffer(offerId);
        }
    }

    /**
     * @function _deleteOffer
     * @description Метод удаления объявления.
     * @param {number} offerId ID объявления
     */
    _deleteOffer(offerId: number) {
        if (!this._layout) {
            return;
        }
        this._layout.makeRequest(deleteOffer, offerId).then(() => {
            this._updateContent(this._offerStatus);
        }).catch((error) => {
            console.error('Error deleting offer:', error);
        });
    }

    /**
     * @function _handleTabClick
     * @description Метод обработки клика по вкладке.
     * @param {Event} event событие
     */
    _handleTabClick(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('profile__right-nav-href') && target.dataset && target.dataset.tab && target.dataset.offerstatus) {
            event.preventDefault();
            this._offerStatus = parseInt(target.dataset.offerstatus, 10);
            this._setActiveTab(parseInt(target.dataset.tab, 10));
            this._updateContent(this._offerStatus);
        }
    }

    /**
     * @function _updateContent
     * @description Метод обновления контента страницы.
     * @param {number} offerType тип объявления
     */
    _updateContent(offerType: number) {
        const offerList = document.querySelector('.profile__right-list') as HTMLElement;
        if (!offerList || !this._layout) {
            return;
        }
        offerList.innerHTML = '';
        const user = User.getData();
        if (!user || typeof user.id !== 'number') {
            return;
        }
        this._layout.makeRequest(searchOffers, {
            'seller_id': user.id.toString(),
            'offer_type_id': offerType.toString()
        }).then((response) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.forEach((offerData: any) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                offerList.innerHTML += profileOfferTemplate({
                    id: offer.id,
                    title: `${offer.offerType === 'Продажа' ? 'Продажа' : 'Сдача'} ${offer.rooms}-комн. ${offer.propertyType.toLowerCase()}, ${offer.area} м²`,
                    metroStation: offer.metroStation || 'Нет',
                    address: offer.address,
                    rooms: offer.rooms,
                    square: offer.area,
                    floor: offer.floor,
                    totalFloors: offer.totalFloors,
                    metroColor: getMetroColorByLineName(offer.metroLine),
                    image: offer.images[0]
                });
            });
        }).catch((error) => {
            console.error('Error fetching offers:', error);
        })
    }

    /**
     * @function _setActiveTab
     * @description Метод установки активной вкладки.
     * @param {number} tabIndex индекс вкладки
     */
    _setActiveTab(tabIndex: number) {
        const tabs = document.querySelectorAll('.profile__right-nav-href');
        tabs.forEach((tab, index) => {
            if (index === tabIndex) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
}