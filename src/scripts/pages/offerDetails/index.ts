
import {Page, PageRenderInterface} from '../page';
import {getOfferById} from "../../util/apiUtil.ts";
import offerDetailsHeaderTemplate from "../../components/offerDetailsHeader/template.precompiled.js";
import offerDetailsInfoTemplate from "../../components/offerDetailsInfo/template.precompiled.js";
import offerDetailsSliderTemplate from "../../components/offerDetailsLeft/template.precompiled.js";
import template from "./template.precompiled.js";
import Map from "../../models/map";
import OfferDetailsLeft from "../../components/offerDetailsLeft";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import Offer from "../../models/offer.ts";
import getMetroColorByLineName from "../../util/metroUtil.ts";
import PageManager from "../../managers/pageManager.ts";
import User from "../../models/user.ts";
import OfferDetailsInfo from "../../components/offerDetailsInfo";
import OfferMock from "../../models/offerMock.ts";
import {CSATType} from "../../components/csat";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @augments Page
 */
export default class OfferDetailsPage extends Page {
    private map: Map | undefined;
    private offerDetailsLeft: OfferDetailsLeft | undefined;
    private offerDetailsInfo: OfferDetailsInfo | undefined;
    private layout: BaseLayout | undefined;
    private offerId: number | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     * @param {Record<string, unknown>} props параметры страницы
     */
    // eslint-disable-next-line max-lines-per-function
    render({layout, root, props}: PageRenderInterface) {
        if (!props || typeof props.id !== 'number') {
            return;
        }

        this.layout = layout;
        root.innerHTML = template();
        super.render({layout, root});

        this.getOfferById(props.id)
            // eslint-disable-next-line max-statements
        .then ((data) => {
            const offer = new Offer();
            this.offerId = offer.id;
            offer.parseJSON(data);
            const offerDetailsHeader = document.getElementById("offerDetailsHeader") as HTMLElement;
            const offerDetailsLeft = document.getElementById("offerDetailsLeft") as HTMLElement;

            if (this.offerDetailsLeft !== null) {
                offerDetailsLeft.innerHTML = offerDetailsSliderTemplate({description: offer.description, images: offer.images});
            }

            const offerDetailsInfo = document.getElementById("offerDetailsInfo") as HTMLElement;
            let rooms = offer.rooms;
            if (rooms === 'много') {
                rooms = '4+';
            }
            offerDetailsHeader.innerHTML = offerDetailsHeaderTemplate({propertyType: offer.propertyType.toLowerCase(), inMultipleForm: offer.propertyType.toLowerCase() === 'апартаменты', isRent: offer.offerType === 'Аренда',rooms: offer.rooms, area: offer.area, price: offer.price, floor: offer.floor, totalFloors: offer.totalFloors, metroStation: offer.metroStation || 'Нет', metroColor: getMetroColorByLineName(offer.metroLine), address: offer.address});
            offerDetailsInfo.innerHTML = offerDetailsInfoTemplate({offerId: offer.id, price: offer.price.toLocaleString('ru-RU').concat(' ₽'), rooms, area: offer.area, ceilingHeight: offer.ceilingHeight, offerType: offer.offerType, renovation: offer.renovation, propertyType: offer.propertyType, seller: `${offer.seller.firstName} ${offer.seller.lastName}`, sellerAvatar: offer.seller.avatar || '/img/userAvatar/unknown.svg', registerDate: `${offer.seller.createdAt.toLocaleString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})}`});

            super.render({layout, root});

            this.offerDetailsLeft = new OfferDetailsLeft({page: this, layout});
            this.offerDetailsInfo = new OfferDetailsInfo({page: this, layout});

            let coords: [number, number] = [37.313484, 55.557729];
            this.map = new Map({center: coords, id: 'offerDetailsMap', zoom: 15});
            this.map.geoCode(offer.address).then(() => {
                if (this.map) {
                    coords = this.map.getCenter();
                    this.map.removeAllHouses();
                    this.map.addHouse({coords});
                }
            });

            const offerSellerBtns = document.getElementById("offerDetailsSellerBtns") as HTMLElement;
            const offerUserBtns = document.getElementById("offerDetailsUserBtns") as HTMLElement;

            if (User.getData()?.id === offer.seller.id) {
                offerSellerBtns.classList.add("active");
            } else {
                offerUserBtns.classList.add("active");
            }
        });
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerDetailsSellerBtns', 'click', this.offerSellerBtnsHandler);
        this.initListener('offerDetailsUserBtns', 'click', this.offerUserBtnsHandler);
    }

    /**
     * @function offerUserBtnsHandler
     * @description Метод обработки клика по кнопкам пользователя.
     * @param {Event} event событие
     */
    private offerUserBtnsHandler(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        if (!User.isAuthenticated()) {
            this.layout?.emit('showLogin');
        }
    }

    /**
     * @function offerSellerBtnsHandler
     * @description Метод обработки клика по кнопкам продавца.
     * @param {Event} event событие
     */
    private offerSellerBtnsHandler(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        if (!User.isAuthenticated()) {
            this.layout?.emit('showLogin');
        }
    }

    /**
     * @function getOfferById
     * @description Метод получения объявления по id.
     * @param {number} id id объявления
     * @returns {Promise<null | void>} промис с данными объявления.
     * @private
     */
    private getOfferById(id: number){
        if (!this.layout) {
            return Promise.reject(new Error('Layout is not defined'));
        }
        return this.layout.makeRequest(getOfferById, id)
            .then((data) => {
                if (User.isAuthenticated()) {
                    OfferMock.updateVisit(User.getData()?.id, id);
                }
                return data;
            })
            .catch ((error) => {
                PageManager.renderPage('404');
                throw error;
            });
    }
}