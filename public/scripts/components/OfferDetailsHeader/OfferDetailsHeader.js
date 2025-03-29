import BaseComponent from "../BaseComponent.js";
import template from './OfferDetailsHeader.precompiled.js';

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