'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './BackgroundlessButton.precompiled.js';

/**
 * @class ChevronRight
 * @description Компонент стрелка вправо.
 * @extends BaseComponent
 */
export default class ChevronRight extends BaseComponent {
    render() {
        return template();
    }
}