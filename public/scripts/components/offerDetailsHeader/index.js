import BaseComponent from "../baseComponent.js";
import template from './offerDetailsHeader.precompiled.js';

/**
 * @class OfferDetailsHeader
 * @description Компонент заголовка страницы подробностей объявления.
 * @extends BaseComponent
 */
export default class OfferDetailsHeader extends BaseComponent {
    render() {
        return template();
    }
}