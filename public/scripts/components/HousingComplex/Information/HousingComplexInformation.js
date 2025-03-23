'use strict';

import { getZhkLine, getZhkPhone} from "../../../util/ApiUtil.js";
import BaseComponent from "../../BaseComponent.js";
import metroColours from "../../../../resources/img/metroColours/metroColours.js";
import metroStationTemplate from "../../MetroStation/MetroStation.precompiled.js";

/**
 * @class HousingComplexInformation
 * @description Компонент информации о ЖК.
 * @extends BaseComponent
 */
export default class HousingComplexInformation extends BaseComponent {
    constructor(id) {
        super();
        this._zhkId = id;

        this._phoneButton = document.getElementById('asideDeveloperPhone');
        this._phoneButton.addEventListener('click', () => this._getPhone());
        
        this._metroColours = metroColours;
        this._addSubway();
    }

    destroy() {
        this._phoneButton.removeEventListener('click', () => this._getPhone());
    }

    _addSubway() {
        const station = document.querySelector('.zhk-information__block__station');
        getZhkLine(this._zhkId)
        .then ((data) => {
            station.innerHTML = metroStationTemplate({metroColor: this._metroColours[data.metroLine], metroStation: data.metroLine});
        })
    }

    _getPhone() {
        getZhkPhone(this._zhkId)
        .then((data) => {
            this._phoneButton.textContent = data.phone;
            this._phoneButton.disabled=true;
        })
    }
}