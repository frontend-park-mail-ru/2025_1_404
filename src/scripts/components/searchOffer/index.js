import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class SearchOffer
 * @description Компонент объявления в поиске.
 * @extends BaseComponent
 */
export default class SearchOffer extends BaseComponent {
    render() {
        return template();
    }
}