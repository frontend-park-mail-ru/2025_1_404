'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './BackgroundlessButton.precompiled.js';

/**
 * @class BackgroundlessButton
 * @description Компонент кнопки без фона.
 * @extends BaseComponent
 */
export default class BackgroundlessButton extends BaseComponent {
    render() {
        return template();
    }
}