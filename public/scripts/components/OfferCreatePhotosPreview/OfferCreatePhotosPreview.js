import BaseComponent from "../BaseComponent.js";
import template from './OfferCreatePhotosPreview.precompiled.js';

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