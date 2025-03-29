import BaseComponent from "../BaseComponent.js";
import template from './OfferDetailsInfo.precompiled.js';

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