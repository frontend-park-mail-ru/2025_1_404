'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './ProfilePreview.precompiled.js';

/**
 * @class ProfilePreview
 * @description Компонент превью объявления на странице профиля.
 * @extends BaseComponent
 */
export default class ProfilePreview extends BaseComponent {
    render() {
        return template();
    }
}