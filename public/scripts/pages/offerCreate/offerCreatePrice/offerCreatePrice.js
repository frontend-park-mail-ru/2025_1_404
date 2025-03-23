'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreatePrice.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";

/**
 * @class OfferCreatePricePage
 * @description Страница создания объявления с выбором цены
 * @extends Page
 */
export default class OfferCreatePricePage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}