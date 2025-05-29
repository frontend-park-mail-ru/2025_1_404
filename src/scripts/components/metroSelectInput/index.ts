import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import ClearInput from "../clearInput";
import AddressButton from "../addressButton";
import MapUtil from "../../util/mapUtil.ts";
import SelectInput from "../selectInput";
import MetroButton from "../metroButton";

export interface MetroSelectInputInterface {
    id: string;
    page: Page;
    layout: BaseLayout | undefined;
    variants: {id: number, name: string, color: string}[];
}

/**
 * @class MetroSelectInput
 * @description Компонент поля ввода с возможностью очистки.
 * @augments BaseComponent
 */
export default class MetroSelectInput extends SelectInput {
    private metroVariants: {id: number, name: string, color: string}[] = [];

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     * @param {{ id: number, name: string }[]} variants - список вариантов
     */
    constructor({page, layout, id, variants}: MetroSelectInputInterface) {
        super({layout, page, id, variants});
        this.metroVariants = variants;
    }

    showVariantsByFilter() {
        this.clearSelectList();
        let found = false;
        let id = '';
        if (this.input.value.length === 0) {
            found = true;
        }
        this.metroVariants.forEach((variant, index) => {
            if (variant.name.toLowerCase().includes(this.input.value.toLowerCase())) {
                if (variant.name === this.input.value) {
                    found = true;
                    id = variant.id.toString();
                }
                this.addSelectMetroButton(variant.name, variant.color, index);
            }
        });

        this.input.dataset.id = id;
        this.input.dataset.filled = found ? 'true' : 'false';
    }

    /**
     * @function addSelectMetroButton
     * @description Метод добавления кнопки выбора метро в список вариантов.
     * @param {string} name - название.
     * @param {string} color - цвет ветки.
     * @param {number} index - индекс адреса.
     */
    addSelectMetroButton(name: string, color: string, index: number) {
        if (!this.page) {
            return;
        }
        const selectButton = new MetroButton({page: this.page, layout: this.layout, name, color, index});
        if (this.selectList) {
            this.selectList.insertAdjacentHTML('beforeend', selectButton.render());
        }
    }

    /**
     * @function setSelectListVisible
     * @description Метод установки видимости списка.
     * @param {boolean} visible - видимость списка.
     */
    setSelectListVisible(visible: boolean) {
        if (this.selectList) {
            this.selectList.style.display = visible ? 'block' : 'none';
        }
    }
}