
import {Page, PageRenderInterface} from '../page';
import {getOfferById} from "../../util/apiUtil.ts";
import offerDetailsHeaderTemplate from "../../components/offerDetailsHeader/template.precompiled.js";
import offerDetailsInfoTemplate from "../../components/offerDetailsInfo/template.precompiled.js";
import offerDetailsSliderTemplate from "../../components/offerDetailsLeft/template.precompiled.js";
import template from "./template.precompiled.js";
import Map from "../../models/map";
import OfferDetailsLeft from "../../components/offerDetailsLeft";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @augments Page
 */
export default class OfferDetailsPage extends Page {
    private map: Map | undefined;
    private _offerDetailsLeft: OfferDetailsLeft | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});
        this._getOfferById()
        .then ((data) => {
            const offerDetailsHeader = document.getElementById("offerDetailsHeader") as HTMLElement;
            const offerDetailsLeft = document.getElementById("offerDetailsLeft") as HTMLElement;
            if (this._offerDetailsLeft !== null) {
                offerDetailsLeft.innerHTML = offerDetailsSliderTemplate(data);
            }

            const offerDetailsInfo = document.getElementById("offerDetailsInfo") as HTMLElement;
            offerDetailsHeader.innerHTML = offerDetailsHeaderTemplate(data);
            offerDetailsInfo.innerHTML = offerDetailsInfoTemplate(data);

            this._offerDetailsLeft = new OfferDetailsLeft({page: this, layout});

            const coords: [number, number] = [55.557729, 37.313484];
            this.map = new Map({center: coords, id: 'offerDetailsMap', zoom: 15});
            this.map.addHouse({coords});
        })
    }

    /**
     * @function _getOfferById
     * @description Метод получения объявления по id.
     * @returns {Promise<null | void>} промис с данными объявления.
     * @private
     */
    _getOfferById() {
        return getOfferById(0)
            .then((data) => data)
            .catch ((error) => {
                console.warn(error);
            });
    }
}