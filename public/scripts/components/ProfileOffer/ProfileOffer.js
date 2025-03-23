import BaseComponent from "../BaseComponent.js";
import template from './ProfileOffer.precompiled.js';

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