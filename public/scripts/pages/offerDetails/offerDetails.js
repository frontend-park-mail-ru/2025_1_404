'use strict'

import Page from '../page.js';
import template from "./offerDetails.precompiled.js";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @extends Page
 */
export default class OfferDetailsPage extends Page {
    render({root}) {
        root.innerHTML = template();

        super.render(root);
    }

    destroy() {

        super.destroy();
    }
}