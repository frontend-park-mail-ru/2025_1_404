'use strict'

import Page from '../../page.js';
import template from "./offerCreateAddress.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @extends Page
 */
export default class OfferCreateAddressPage extends Page {
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