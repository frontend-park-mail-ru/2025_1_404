'use strict'

import Page from '../../page.js';
import template from "./offerCreatePhotos.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreatePhotosPage
 * @description Страница создания объявления с выбором фото
 * @extends Page
 */
export default class OfferCreatePhotosPage extends Page {
    render(root) {
        root.innerHTML = template();

        this._offerCreateNav = new OfferCreateNav()

        super.render(root);
    }

    destroy() {
        if (this._offerCreateNav) {
            this._offerCreateNav.destroy();
        }

        super.destroy();
    }
}