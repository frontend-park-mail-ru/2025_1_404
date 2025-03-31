'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class RedButton
 * @description Компонент красной кнопки.
 * @extends BaseComponent
 */
export default class RedButton extends BaseComponent {
    render() {
        return template();
    }
}