'use strict'

import Page from '../../page.js';
import template from "./offerCreatePrice.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreatePricePage
 * @description Страница создания объявления с выбором цены
 * @extends Page
 */
export default class OfferCreatePricePage extends Page {
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