'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateParams.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";

/**
 * @class OfferCreateParamsPage
 * @description Страница создания объявления с выборо параметров
 * @extends Page
 */
export default class OfferCreateParamsPage extends Page {
    render({root}) {
        root.innerHTML = template();

        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}