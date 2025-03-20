'use strict'

import Header from "../../components/Header/Header.js";
import Login from "../../components/Login/Login.js";
import Page from '../page.js';
import template from "./unknown.precompiled.js";

/**
 * @class UnknownPage
 * @description Страница 404
 * @extends Page
 */
export default class UnknownPage extends Page {
    render(root) {
        root.innerHTML = template();

        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}