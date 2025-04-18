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

export interface AddressDetails {
    displayName: string;
    city: string | undefined;
    street: string | undefined;
    house: string | undefined;
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
    private addresses: AddressDetails[] = [];
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
        this.addressTimeout = setInterval(this.onAddressCheck.bind(this), 1000);
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
     * @param {AddressDetails} args - объект с данными адреса.
     * @param {number} index - индекс адреса.
     */
    addAddressButton(args: AddressDetails, index: number) {
        const addressButton = new AddressButton({page: this.page, layout: this.layout, displayName: args.displayName, index});
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
        if (Date.now() - this.timeSinceLastCharacter < 1000) {
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
        this.layout?.makeRequest(MapUtil.geocode, address).then((data) => {
            this.addresses = [];
            for (const item of data) {
                const addressDetails: AddressDetails = {
                    displayName: item.display_name,
                    city: item.address.city || null,
                    street: item.address.road || null,
                    house: item.address.house_number || null,
                };
                this.addresses.push(addressDetails);
            }
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
        let addressStr = '';
        if (address.city) {
            addressStr += address.city;
        }
        if (address.street) {
            addressStr += ' '.concat(address.street);
        }
        if (address.house) {
            addressStr += ' д. '.concat(address.house);
        }
        this.input.value = addressStr;
        this.input.dispatchEvent(new Event('input'));
        this.setAddressListVisible(false);
    }

    /**
     * @function onKeyUp
     * @description Метод обработки события нажатия клавиши на поле ввода.
     */
    onKeyUp() {
        this.timeSinceLastCharacter = Date.now();
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