import {BaseComponent, BaseComponentInterface} from "../../baseComponent.ts";
import {Page} from "../../../pages/page.ts";
import {BaseLayout} from "../../../layouts/baseLayout.ts";

export interface HousingComplexInformationComponentInterface {
    page?: Page;
    layout?: BaseLayout;
    phone: string
}

/**
 * @class HousingComplexInformation
 * @description Компонент информации о ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexInformation extends BaseComponent {
    private phoneButton: HTMLButtonElement | null;
    private phone: string;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout, phone} : HousingComplexInformationComponentInterface) {
        super({page, layout});
        this.phoneButton = document.getElementById('asideDeveloperPhone') as HTMLButtonElement;
        this.phone = phone;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('asideDeveloperPhone', 'click', () => this.getPhone(this.phone));
    }

    /**
     * @function getPhone
     * @description Метод получения телефона застройщика.
     * @private
     */
    private getPhone(phone: string) {
        if (!this.phoneButton) {
            return;
        }
        this.phoneButton.textContent = phone;
        this.phoneButton.disabled=true;
    }
}