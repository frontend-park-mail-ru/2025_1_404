'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class PrimaryButton
 * @description Компонент кнопки.
 * @extends BaseComponent
 */
export default class PrimaryButton extends BaseComponent {
    render() {
        return template();
    }
}