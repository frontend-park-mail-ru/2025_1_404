import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class ProfileOffer
 * @description Компонент объявления в профиле.
 * @extends BaseComponent
 */
export default class ProfileOffer extends BaseComponent {
    render() {
        return template();
    }
}