'use strict'

import Page from '../../page.js';
import template from "./offerCreateDescription.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreateDescriptionPage
 * @description Страница создания объявления с полем описания
 * @extends Page
 */
export default class OfferCreateDescriptionPage extends Page {
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