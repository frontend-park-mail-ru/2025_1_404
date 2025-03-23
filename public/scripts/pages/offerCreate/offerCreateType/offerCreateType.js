'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateType.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";
import OfferCreate from "../../../models/OfferCreate.js";

/**
 * @class OfferCreateTypePage
 * @description Страница создания объявления с типом сделки
 * @extends Page
 */
export default class OfferCreateTypePage extends Page {
    render({root}) {
        root.innerHTML = template();

        this._selects = document.querySelector('input[name = gender]:checked');
        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}