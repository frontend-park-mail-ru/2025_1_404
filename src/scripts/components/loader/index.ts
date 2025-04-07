
import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Loader
 * @description Компонент крутящейся загрузки
 * @augments BaseComponent
 */
export default class Loader extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }

    /**
     * @function setLoaderStatus
     * @description Метод установки статуса видимости загрузки.
     * @param {boolean} status - статус видимости загрузки.
     */
    setLoaderStatus(status: boolean) {
        const container = document.getElementsByClassName('loader__container')[0] as HTMLElement;
        container.style.display = status ? 'flex' : 'none';
    }
}