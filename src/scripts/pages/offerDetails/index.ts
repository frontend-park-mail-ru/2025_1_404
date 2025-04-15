
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
import RouteManager from "../../managers/routeManager/routeManager.ts";
import user from "../../models/user.ts";
import {DomEvent} from "leaflet";
import off = DomEvent.off;

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @augments Page
 */
export default class OfferDetailsPage extends Page {
    private map: Map | undefined;
    private _offerDetailsLeft: OfferDetailsLeft | undefined;
    private _layout: BaseLayout | undefined;
    private _offerId: number | null | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     * @param {Record<string, unknown>} props параметры страницы
     */
    render({layout, root, props}: PageRenderInterface) {
        if (!props || typeof props.id !== 'number') {
            return;
        }
        this._layout = layout;
        root.innerHTML = template();
        super.render({layout, root});

        this._getOfferById(props.id)
        .then ((data) => {
            const offer = new Offer();
            this._offerId = offer.id;
            offer.parseJSON(data);
            const offerDetailsHeader = document.getElementById("offerDetailsHeader") as HTMLElement;
            const offerDetailsLeft = document.getElementById("offerDetailsLeft") as HTMLElement;

            if (this._offerDetailsLeft !== null) {
                offerDetailsLeft.innerHTML = offerDetailsSliderTemplate({description: offer.description, images: offer.images});
            }

            const offerDetailsInfo = document.getElementById("offerDetailsInfo") as HTMLElement;
            offerDetailsHeader.innerHTML = offerDetailsHeaderTemplate({isRent: offer.offerType === 'Аренда',rooms: offer.rooms, area: offer.area, price: offer.price, floor: offer.floor, totalFloors: offer.totalFloors, metroStation: offer.metroStation || 'Нет', metroColor: getMetroColorByLineName(offer.metroLine), address: offer.address});
            offerDetailsInfo.innerHTML = offerDetailsInfoTemplate({price: offer.price.toLocaleString('ru-RU').concat(' ₽'), rooms: offer.rooms, area: offer.area, ceilingHeight: offer.ceilingHeight, offerType: offer.offerType, renovation: offer.renovation, propertyType: offer.propertyType, seller: `${offer.seller.firstName} ${offer.seller.lastName}`, sellerAvatar: offer.seller.avatar || '/img/userAvatar/unknown.svg', registerDate: `${offer.seller.createdAt.toLocaleString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})}`});

            this._offerDetailsLeft = new OfferDetailsLeft({page: this, layout});

            let coords: [number, number] = [55.557729, 37.313484];
            this.map = new Map({center: coords, id: 'offerDetailsMap', zoom: 15});
            this.map.geoCode(offer.address).then(() => {
                if (this.map) {
                    coords = this.map.getCenter();
                    this.map.addHouse({coords});
                }
            });

            const offerSellerBtns = document.getElementById("offerDetailsSellerBtns") as HTMLElement;
            const offerUserBtns = document.getElementById("offerDetailsUserBtns") as HTMLElement;

            if (user.getData()?.id === offer.seller.id) {
                offerSellerBtns.classList.add("active");
            } else {
                offerUserBtns.classList.add("active");
            }
        })
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerDetailsChangeButton', 'click', this._offerChangeButtonHandler);
    }

    /**
     * @function _offerChangeButtonHandler
     * @description Метод обработки клика по ссылке на страницу изменения объявления.
     * @param {Event} event событие
     */
    _offerChangeButtonHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo(`/offer/edit/${this._offerId}/type`);
    }

    /**
     * @function _getOfferById
     * @description Метод получения объявления по id.
     * @param {number} id id объявления
     * @returns {Promise<null | void>} промис с данными объявления.
     * @private
     */
    _getOfferById(id: number) {
        if (!this._layout) {
            return Promise.reject(new Error('Layout is not defined'));
        }
        return this._layout.makeRequest(getOfferById, id)
            .then((data) => data)
            .catch ((error) => {
                PageManager.renderPage('404');
                throw error;
            });
    }
}