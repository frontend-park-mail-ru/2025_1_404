
import {Page, PageRenderInterface} from '../page';
import {getOfferById} from "../../util/apiUtil.js";
import offerDetailsHeaderTemplate from "../../components/offerDetailsHeader/template.precompiled.js";
import offerDetailsInfoTemplate from "../../components/offerDetailsInfo/template.precompiled.js";
import offerDetailsSliderTemplate from "../../components/offerDetailsSlider/template.precompiled.js";
import template from "./template.precompiled.js";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @augments Page
 */
export default class OfferDetailsPage extends Page {
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
            const offerDetailsInfo = document.getElementById("offerDetailsInfo") as HTMLElement;
            offerDetailsHeader.innerHTML = offerDetailsHeaderTemplate(data);
            offerDetailsLeft.innerHTML = offerDetailsSliderTemplate(data);
            offerDetailsInfo.innerHTML = offerDetailsInfoTemplate(data);
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