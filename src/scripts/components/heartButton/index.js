'use strict';

import BaseComponent from "../baseComponent.js";
import template from './backgroundlessButton.precompiled.js';

/**
 * @class Heart
 * @description Компонент сердчеко.
 * @extends BaseComponent
 */
export default class Heart extends BaseComponent {
    render() {
        return template();
    }
}