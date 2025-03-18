'use strict'

import Page from '../../page.js';
import template from "./offerCreateType.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreateTypePage
 * @description Страница создания объявления с типом сделки
 * @extends Page
 */
export default class OfferCreateTypePage extends Page {
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