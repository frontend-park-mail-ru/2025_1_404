'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Loader
 * @description Компонент крутящейся загрузки
 * @extends BaseComponent
 */
export default class Loader extends BaseComponent {
    render() {
        return template();
    }

    setLoaderStatus(status) {
        const [container] = document.getElementsByClassName('loader__container');
        container.style.display = status ? 'flex' : 'none';
    }
}