'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

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