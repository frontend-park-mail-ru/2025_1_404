import {BaseComponent, BaseComponentInterface} from "../../baseComponent.ts";
import {getZhkLine, getZhkPhone} from "../../../util/apiUtil.ts";
import getMetroColorByLineName from "../../../util/metroUtil";
import metroStationTemplate from "../../metroStation/template.precompiled.js";

/**
 * @class HousingComplexInformation
 * @description Компонент информации о ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexInformation extends BaseComponent {
    private phoneButton: HTMLButtonElement | null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout} : BaseComponentInterface) {
        super({page, layout});
        this.phoneButton = document.getElementById('asideDeveloperPhone') as HTMLButtonElement;
        
        this.addSubway();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('asideDeveloperPhone', 'click', this.getPhone);
    }

    /**
     * @function addSubway
     * @description Метод добавления информации о метро.
     * @private
     */
    private addSubway() {
        const station = document.querySelector('.housingComplex__info-block-metro') as HTMLElement;
        getZhkLine()
        .then ((data) => {
            station.innerHTML = metroStationTemplate({metroColor: getMetroColorByLineName(data.metroLine), metroStation: data.metroLine});
        })
    }

    /**
     * @function getPhone
     * @description Метод получения телефона застройщика.
     * @private
     */
    private getPhone() {
        getZhkPhone()
        .then((data) => {
            if (!this.phoneButton) {
                return;
            }
            this.phoneButton.textContent = data.phone;
            this.phoneButton.disabled=true;
        })
    }
}