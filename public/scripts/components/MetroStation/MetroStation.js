'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './MetroStation.precompiled.js';

/**
 * @class MetroStation
 * @description Компонент станции метро.
 * @extends BaseComponent
 */
export default class MetroStation extends BaseComponent {
    render() {
        return template();
    }
}