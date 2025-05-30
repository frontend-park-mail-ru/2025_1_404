import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import ClearInput from "../clearInput";
import AddressButton from "../addressButton";
import MapUtil from "../../util/mapUtil.ts";
import {Document} from "postcss";

export interface SelectInputInterface {
    id: string;
    page: Page;
    layout: BaseLayout | undefined;
    variants: {id: number, name: string}[];
}

/**
 * @class SelectInput
 * @description Компонент поля ввода с возможностью очистки.
 * @augments BaseComponent
 */
export default class SelectInput extends ClearInput {
    private variants: {id: number, name: string}[];
    protected selectList: HTMLElement | null = null;
    private isInputFocused = false;

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     * @param {{ id: number, name: string }[]} variants - список вариантов
     */
    constructor({page, layout, id, variants}: SelectInputInterface) {
        super({layout, page, id});
        this.selectList = document.getElementById(`${id}__select__list`);
        this.variants = variants;
    }

    init() {
        this.initListeners();
        this.showVariantsByFilter();
    }

    showVariantsByFilter() {
        this.clearSelectList();
        let found = false;
        let id = '';
        if (this.input.value.length === 0) {
            found = true;
        }
        this.variants.forEach((variant, index) => {
            if (variant.name.toLowerCase().includes(this.input.value.toLowerCase())) {
                if (variant.name === this.input.value) {
                    id = variant.id.toString();
                    found = true;
                }
                this.addSelectButton(variant.name, index);
            }
        });
        this.input.dataset.id = id;
        this.input.dataset.filled = found ? 'true' : 'false';
    }

    /**
     * @function clearSelectList
     * @description Метод очистки списка адресов.
     */
    clearSelectList() {
        if (this.selectList) {
            this.selectList.innerHTML = '';
        }
    }

    /**
     * @function addSelectButton
     * @description Метод добавления кнопки выбора в список вариантов.
     * @param {string} name - название.
     * @param {number} index - индекс адреса.
     */
    addSelectButton(name: string, index: number) {
        if (!this.page) {
            return;
        }
        const selectButton = new AddressButton({page: this.page, layout: this.layout, address: name, index});
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

    /**
     * @function onInputFocus
     * @description Метод обработки события фокуса на поле ввода.
     */
    onInputFocus() {
        if (!this.isInputFocused) {
            this.isInputFocused = true;
            this.showVariantsByFilter();
        }
        this.setSelectListVisible(true);
    }

    /**
     * @function onInputBlur
     * @description Метод обработки события потери фокуса на поле ввода.
     * @param {Event} event - событие потери фокуса.
     */
    onInputBlur(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (!target || !(event instanceof FocusEvent)) {
            return;
        }
        let relatedTarget = event.relatedTarget as HTMLElement;
        while (relatedTarget && relatedTarget.parentElement && !relatedTarget.classList.contains('select__container')) {
            relatedTarget = relatedTarget.parentElement;
        }
        if (relatedTarget && relatedTarget.classList.contains('select__container') && relatedTarget.querySelector(`#${this.id}__container`) !== null) {
            target.focus();
            return;
        }
        this.setSelectListVisible(false);
        this.isInputFocused = false;
    }

    /**
     * @function setVariant
     * @description Метод установки варианта в поле ввода.
     * @param {string} variant - вариант для установки.
     */
    setVariant(variant: string) {
        if (this.input) {
            this.input.value = variant;
            this.showVariantsByFilter();
            this.input.dispatchEvent(new Event('input'));
        }
    }

    /**
     * @function onAddressClick
     * @description Метод обработки события клика по адресу.
     * @param {Event} event - событие клика.
     */
    onAddressClick(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const parent = target.parentElement;
        if (!target || !parent) {
            return;
        }
        if (!target.dataset.index && !parent.dataset.index) {
            return;
        }
        const index = Number(target.dataset.index || parent.dataset.index);
        const variant = this.variants[index].name;
        this.setVariant(variant);
        this.setSelectListVisible(false);
    }

    /**
     * @function onKeyUp
     * @description Метод обработки события нажатия клавиши на поле ввода.
     */
    onKeyUp() {
        this.setSelectListVisible(true);
        this.showVariantsByFilter();
    }

    clearButtonClickHandler() {
        super.clearButtonClickHandler();
        this.input.value = '';
        this.showVariantsByFilter();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        if (this.input && this.selectList) {
            this.initListener(this.input.id, 'focus', this.onInputFocus);
            this.initListener(this.input.id, 'blur', this.onInputBlur);
            this.initListener(this.selectList.id, 'click', this.onAddressClick);
            this.initListener(this.input.id, 'input', this.onKeyUp);
        }
    }
}