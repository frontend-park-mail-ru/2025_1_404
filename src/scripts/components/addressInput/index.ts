import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import ClearInput from "../clearInput";
import AddressButton from "../addressButton";
import MapUtil from "../../util/mapUtil.ts";

/**
 * @class AddressInput
 * @description Компонент поля ввода адреса
 * @augments BaseComponent
 */

export interface AddressInputInterface {
    id: string;
    page: Page;
    layout: BaseLayout | undefined;
}

/**
 * @class AddressInput
 * @description Компонент поля ввода с возможностью очистки.
 * @augments BaseComponent
 */
export default class AddressInput extends ClearInput {
    private addressTimeout: ReturnType<typeof setTimeout> | null = null;
    private oldAddress: string | null = null;
    private addressList: HTMLElement | null = null;
    private isInputInFocus: boolean = false;
    private addresses: string[] = [];
    private timeSinceLastCharacter: number = 0;

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     */
    constructor({page, layout, id}: AddressInputInterface) {
        super({layout, page, id});
        if (this.addressTimeout) {
            clearInterval(this.addressTimeout);
        }
        this.addressTimeout = setInterval(this.onAddressCheck.bind(this), 300);
        this.addressList = document.getElementById(`${id}__address__list`);
        this.initListeners();
    }

    /**
     * @function clearAddressList
     * @description Метод очистки списка адресов.
     */
    clearAddressList() {
        if (this.addressList) {
            this.addressList.innerHTML = '';
        }
    }

    /**
     * @function addAddressButton
     * @description Метод добавления кнопки адреса в список адресов.
     * @param {string} address - адрес.
     * @param {number} index - индекс адреса.
     */
    addAddressButton(address: string, index: number) {
        if (!this.page) {
            return;
        }
        const addressButton = new AddressButton({page: this.page, layout: this.layout, address, index});
        if (this.addressList) {
            this.addressList.insertAdjacentHTML('beforeend', addressButton.render());
        }
    }

    /**
     * @function setAddressListVisible
     * @description Метод установки видимости списка адресов.
     * @param {boolean} visible - видимость списка адресов.
     */
    setAddressListVisible(visible: boolean) {
        if (this.addressList) {
            this.addressList.style.display = visible ? 'block' : 'none';
        }
    }

    /**
     * @function onAddressCheck
     * @description Метод проверки адреса.
     */
    onAddressCheck() {
        if (Date.now() - this.timeSinceLastCharacter < 300) {
            return;
        }
        const currentAddress = this.input.value;
        if (currentAddress.length > 0 && this.oldAddress !== currentAddress) {
            this.findAddresses(currentAddress);
        }
        this.oldAddress = currentAddress;
    }

    /**
     * @function findAddresses
     * @description Метод поиска адресов.
     * @param {string} address - адрес для поиска.
     */
    findAddresses(address: string) {
        this.layout?.makeRequest(MapUtil.suggest, address).then((addresses) => {
            this.addresses = addresses;
            if (this.isInputInFocus) {
                this.clearAddressList();
                for (let i = 0; i < this.addresses.length; i++) {
                    this.addAddressButton(this.addresses[i], i);
                }
                this.setAddressListVisible(true);
            }
        })
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        if (this.addressTimeout) {
            clearInterval(this.addressTimeout);
            this.addressTimeout = null;
        }
        super.destroy();
    }

    /**
     * @function onInputFocus
     * @description Метод обработки события фокуса на поле ввода.
     */
    onInputFocus() {
        this.isInputInFocus = true;
        if (this.addresses.length > 0) {
            this.setAddressListVisible(true);
        }
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
        while (relatedTarget && relatedTarget.parentElement && !relatedTarget.classList.contains('address__container')) {
            relatedTarget = relatedTarget.parentElement;
        }
        if (relatedTarget && relatedTarget.classList.contains('address__container')) {
            target.focus();
            return;
        }
        this.isInputInFocus = false;
        this.setAddressListVisible(false);
    }

    /**
     * @function setAddress
     * @description Метод установки адреса в поле ввода.
     * @param {string} address - адрес для установки.
     */
    setAddress(address: string) {
        if (this.input) {
            this.input.value = address;
            this.input.dataset.filled = 'true';
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
        if (!target) {
            return;
        }
        if (!target.dataset.index) {
            return;
        }
        const index = Number(target.dataset.index);
        const address = this.addresses[index];
        this.setAddress(address);
        this.setAddressListVisible(false);
    }

    /**
     * @function onKeyUp
     * @description Метод обработки события нажатия клавиши на поле ввода.
     */
    onKeyUp() {
        this.timeSinceLastCharacter = Date.now();
        this.addresses = [];
        this.input.dataset.filled = 'false';
    }

    /**
     * @function isFilled
     * @description Метод проверки заполненности поля ввода.
     * @returns {boolean} true, если поле ввода заполнено, иначе false.
     */
    isFilled() {
        return this.input.dataset.filled === 'true';
    }

    /**
     * @function isEmpty
     * @description Метод проверки пустоты поля ввода.
     * @returns {boolean} true, если поле ввода пустое, иначе false.
     */
    isEmpty() {
        return this.input.value.length === 0;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        if (this.input && this.addressList) {
            this.initListener(this.input.id, 'focus', this.onInputFocus);
            this.initListener(this.input.id, 'blur', this.onInputBlur);
            this.initListener(this.addressList.id, 'click', this.onAddressClick);
            this.initListener(this.input.id, 'keyup', this.onKeyUp);
        }
    }
}