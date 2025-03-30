'use strict';

import BaseComponent from "../../baseComponent.js";
import template from './backgroundlessButton.precompiled.js';

/**
 * @class ChevronLeft
 * @description Компонент стрелка влево.
 * @extends BaseComponent
 */
export default class ChevronLeft extends BaseComponent {
    render() {
        return template();
    }
}