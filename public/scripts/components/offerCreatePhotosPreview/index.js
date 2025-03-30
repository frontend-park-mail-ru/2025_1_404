import BaseComponent from "../baseComponent.js";
import template from './offerCreatePhotosPreview.precompiled.js';

/**
 * @class OfferCreatePhotosPreview
 * @description Компонент превью фотографии на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreatePhotosPreview extends BaseComponent {
    render() {
        return template();
    }
}