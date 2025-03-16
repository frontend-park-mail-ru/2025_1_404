'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './RedButton.precompiled.js';

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