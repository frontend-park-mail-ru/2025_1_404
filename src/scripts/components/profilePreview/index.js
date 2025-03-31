'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

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