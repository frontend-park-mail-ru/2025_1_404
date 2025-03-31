'use strict';

import BaseComponent from "../baseComponent.js";
import template from './backgroundlessButton.precompiled.js';

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