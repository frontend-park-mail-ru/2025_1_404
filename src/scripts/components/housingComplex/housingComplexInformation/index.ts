import {getZhkLine, getZhkPhone} from "../../../util/apiUtil.js";
import {BaseComponent, BaseComponentInterface} from "../../baseComponent.js";
import getMetroColorByLineName from "../../../util/metroUtil";
import metroStationTemplate from "../../metroStation/template.precompiled.js";

/**
 * @class HousingComplexInformation
 * @description Компонент информации о ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexInformation extends BaseComponent {
    private _phoneButton: HTMLButtonElement | null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout} : BaseComponentInterface) {
        super({page, layout});
        this._phoneButton = document.getElementById('asideDeveloperPhone') as HTMLButtonElement;
        
        this._addSubway();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('asideDeveloperPhone', 'click', this._getPhone);
    }

    /**
     * @function _addSubway
     * @description Метод добавления информации о метро.
     * @private
     */
    _addSubway() {
        const station = document.querySelector('.housingComplex__info-block-metro') as HTMLElement;
        getZhkLine()
        .then ((data) => {
            station.innerHTML = metroStationTemplate({metroColor: getMetroColorByLineName(data.metroLine), metroStation: data.metroLine});
        })
    }

    /**
     * @function _getPhone
     * @description Метод получения телефона застройщика.
     * @private
     */
    _getPhone() {
        getZhkPhone()
        .then((data) => {
            if (this._phoneButton === null) {
                return;
            }
            this._phoneButton.textContent = data.phone;
            this._phoneButton.disabled=true;
        })
    }
}