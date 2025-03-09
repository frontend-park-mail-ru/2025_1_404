'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './PrimaryButton.precompiled.js';

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