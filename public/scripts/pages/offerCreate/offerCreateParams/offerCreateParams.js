'use strict'

import Page from '../../page.js';
import template from "./offerCreateParams.precompiled.js";
import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";

/**
 * @class OfferCreateParamsPage
 * @description Страница создания объявления с выборо параметров
 * @extends Page
 */
export default class OfferCreateParamsPage extends Page {
    render({root}) {
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