'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './BackgroundlessButton.precompiled.js';

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