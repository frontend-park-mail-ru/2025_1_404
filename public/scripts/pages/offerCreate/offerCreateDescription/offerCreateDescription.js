'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateDescription.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";

/**
 * @class OfferCreateDescriptionPage
 * @description Страница создания объявления с полем описания
 * @extends Page
 */
export default class OfferCreateDescriptionPage extends Page {
    render({root}) {
        root.innerHTML = template();

        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}