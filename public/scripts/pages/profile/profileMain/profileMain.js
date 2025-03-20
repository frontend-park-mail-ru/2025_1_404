'use strict'

import Page from '../../page.js';
import template from "./profileMain.precompiled.js";
import ProfileLeft from "../../../components/ProfileLeft/ProfileLeft.js";

/**
 * @class ProfileMainPage
 * @description Основная страница профиля
 * @extends Page
 */
export default class ProfileMainPage extends Page {
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