import BaseComponent from "../baseComponent.js";
import template from './offerDetailsInfo.precompiled.js';

/**
 * @class OfferDetailsInfo
 * @description Компонент информации страницы подробностей объявления.
 * @extends BaseComponent
 */
export default class OfferDetailsInfo extends BaseComponent {
    render() {
        return template();
    }
}