'use strict';

import { getZhkLine, getZhkPhone} from "../../../util/apiUtil.js";
import BaseComponent from "../../baseComponent.js";
import metroStationTemplate from "../../metroStation/template.precompiled.js";
import getMetroColorByLineName from "../../../util/metroUtil.js";

/**
 * @class HousingComplexInformation
 * @description Компонент информации о ЖК.
 * @extends BaseComponent
 */
export default class HousingComplexInformation extends BaseComponent {
    constructor() {
        super({});
        this._phoneButton = document.getElementById('asideDeveloperPhone');
        
        this._addSubway();
    }

    initListeners() {
        this.initListener('asideDeveloperPhone', 'click', this._getPhone);
    }

    _addSubway() {
        const station = document.querySelector('.zhk-information__block__station');
        getZhkLine()
        .then ((data) => {
            station.innerHTML = metroStationTemplate({metroColor: getMetroColorByLineName[data.metroLine], metroStation: data.metroLine});
        })
    }

    _getPhone() {
        getZhkPhone()
        .then((data) => {
            this._phoneButton.textContent = data.phone;
            this._phoneButton.disabled=true;
        })
    }
}