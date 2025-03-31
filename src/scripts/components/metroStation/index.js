'use strict';

import BaseComponent from "../baseComponent.js";
import template from './metroStation.precompiled.js';

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