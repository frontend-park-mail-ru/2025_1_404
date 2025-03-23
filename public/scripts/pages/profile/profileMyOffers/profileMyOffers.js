'use strict'

import Page from '../../page.js';
import ProfileLeft from "../../../components/ProfileLeft/ProfileLeft.js";
import template from "./profileMyOffers.precompiled.js";

/**
 * @class ProfileMyOffersPage
 * @description Страница "мои объявления" в профиле
 * @extends Page
 */
export default class ProfileMyOffersPage extends Page {
    render({root}) {
        root.innerHTML = template();

        this._profileLeft = new ProfileLeft()

        super.render(root);
    }

    destroy() {

        if (this._profileLeft) {
            this._profileLeft.destroy();
        }

        super.destroy();
    }
}