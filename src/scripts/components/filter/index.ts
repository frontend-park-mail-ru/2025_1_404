import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import FilterModel from "../../models/filterModel"
import RouteManager from "../../managers/routeManager/routeManager.ts";
import {Page} from "../../pages/page.ts";
import ClearInput from "../clearInput";
import AddressInput from "../addressInput";
/**
 * @class Filter
 * @description Компонент фильтра.
 * @augments BaseComponent
 */
export default class Filter extends BaseComponent {
    private _openPopupButton: HTMLButtonElement | null;
    private _defaultFields: Record<string, string>;
    private _filterCheckLists: string[];
    private _filterData: Record<string, string>;
    private _filterValid: Record<string, boolean>;
    private _isValid: boolean;
    private _submitButton: HTMLElement | null;
    private _page: Page
    private addressInput: AddressInput;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    // eslint-disable-next-line max-lines-per-function
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._page = page;
        this._openPopupButton = null;
        this._submitButton = document.getElementById("filterSubmitButton");
        this._isValid = true;
        this._defaultFields = {
            "filterOfferType": "Тип сделки",
            "filterPropertyType": "Тип недвижимости",
            "filterPrice": "Цена",
            "filterSquare": "Площадь",
        };
        this._filterCheckLists = ["filterOfferType", "filterPropertyType"];
        this._filterData = {
            "filterOfferType": '',
            "filterPropertyType": '',
            "filterPriceLeft__input": '',
            "filterPriceRight__input": '',
            "filterSquareLeft__input": '',
            "filterSquareRight__input": '',
            "filterInputAddress__input": '',
        }
        this._filterValid = {
            "offer_price": true,
            "offer_square": true,
        }

        document.onclick = (event) => {
            if (!event.target || !this._openPopupButton || !this._openPopupButton.nextElementSibling) {
                return;
            }
            const target = event.target as HTMLElement;
            if (!this._openPopupButton.nextElementSibling.contains(target)) {
                this._filterSelectClosePopup(this._openPopupButton);
                this._openPopupButton = null;
            }
        }

        this.addressInput = new AddressInput({
            page: this._page,
            layout,
            id: 'filterInputAddress',
        });

        new ClearInput({
            page: this._page,
            layout,
            id: 'filterPriceLeft',
        });

         new ClearInput({
            page: this._page,
            layout,
            id: 'filterPriceRight',
        });

        new ClearInput({
            page: this._page,
            layout,
            id: 'filterSquareLeft',
        })

        new ClearInput({
            page: this._page,
            layout,
            id: 'filterSquareRight',
        })
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий для компонента фильтра.
     */
    initListeners() {
        this.initListenerForClass('filter__select-button', 'click', this._filterSelectOpenPopup);
        this.initListenerForClass('filter__check-elem', 'click', this._filterCheckListElem);
        this.initListener('filterPriceLeft__input', 'input', this._filterInputChange);
        this.initListener('filterPriceRight__input', 'input', this._filterInputChange);
        this.initListener('filterSquareLeft__input', 'input', this._filterInputChange);
        this.initListener('filterSquareRight__input', 'input', this._filterInputChange);
        this.initListener('filterInputAddress__input', 'input', this._filterInputChange);
        this.initListener('filterInputAddress__input', 'keyup', this._filterSubmitKey);
        this.initListener('filterListSubmitButton', 'click', this._filterListSubmit);
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента фильтра.
     */
    destroy() {
        super.destroy();
        if (this.addressInput) {
            this.addressInput.destroy();
        }
    }

    /**
     * @function _filterSubmitKey
     * @description Метод обработки нажатия клавиши Enter в поле ввода фильтра.
     * @param {Event} event событие нажатия клавиши.
     */
    _filterSubmitKey(event: Event) {
        event.preventDefault();
        if (event instanceof KeyboardEvent && event.key === 'Enter') {
            this._filterListSubmit(event);
        }
    }

    /**
     * @function _filterListSubmit
     * @description Метод обработки отправки формы фильтра на страницу со списком объявлений.
     * @param {Event} event событие отправки формы.
     * @private
     */
    _filterListSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        for (const [key, value] of Object.entries(this._filterData)) {
            FilterModel.setData(key, value);
        }
        RouteManager.navigateTo('/search');
    }

    /**
     * @function _filterInputChange
     * @description Метод обработки изменения значения в полях ввода фильтра.
     * @param {Event} event событие изменения значения в поле ввода.
     * @private
     */
    _filterInputChange(event: Event) {
        event.preventDefault();
        if (!event.currentTarget) {
            return;
        }
        const currentTarget = event.currentTarget as HTMLInputElement;
        this._filterValid[currentTarget.name] = this._page.formInputHandler(event, false)

        const button = document.getElementsByName(currentTarget.name)[0] as HTMLButtonElement;
        if (button !== null) {
            this._checkValidation(button);
        }

        if (typeof this._filterData[currentTarget.id] === 'string') {
            this._filterData[currentTarget.id] = currentTarget.value;
        }

    }

    /**
     * @function _filterCheckListElem
     * @description Метод обработки клика по элементу списка чекбоксов фильтра.
     * @param {Event} event событие клика по элементу списка чекбоксов.
     * @private
     */
    _filterCheckListElem(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        let elem = event.target as HTMLElement;
        while (elem.tagName.toLowerCase() !== 'li' && elem.parentElement) {
            elem = elem.parentElement;
        }
        if (!elem.parentElement || !elem.parentElement.parentElement) {
            return;
        }
        const selectButton = elem.parentElement.parentElement.previousElementSibling as HTMLButtonElement;

        if (elem.children[1].textContent) {
            const checked = elem.parentElement.querySelector('.checked');
            if (elem.classList.toggle('checked')) {
                if (checked) {
                    checked.classList.toggle('checked');
                }
                this._filterData[elem.parentElement.id] = elem.children[1].textContent;
            } else {
                this._filterData[elem.parentElement.id] = '';
            }
        }
        const checked = elem.parentElement.querySelector('.checked');

        if (checked) {
            selectButton.innerHTML = `${checked.children[1].textContent}`;
        } else {
            selectButton.innerHTML = this._defaultFields[elem.parentElement.id];
        }
    }

    /**
     * @function _filterSelectClosePopup
     * @description Закрывает всплывающее окно селекта фильтра.
     * @param {HTMLElement} button кнопка, которая открыла всплывающее окно селекта.
     * @private
     */
    _filterSelectClosePopup(button: HTMLButtonElement) {
        button.classList.remove('active');

        this._checkValidation(button);

        if (!button.nextElementSibling) {
            return;
        }
        button.nextElementSibling.classList.remove('active');
    }

    /**
     * @function _filterSelectOpenPopup
     * @description Открывает всплывающее окно селекта фильтра.
     * @param {Event} event событие клика по кнопке селекта.
     * @private
     */
    _filterSelectOpenPopup(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._openPopupButton && this._openPopupButton !== event.target) {
            event.stopPropagation();
            this._filterSelectClosePopup(this._openPopupButton);
        }
        this._openPopupButton = event.target as HTMLButtonElement;
        this._openPopupButton.classList.toggle('active');

        if (this._openPopupButton.nextElementSibling) {
            this._openPopupButton.nextElementSibling.classList.toggle('active');
        }
    }

    /**
     * @function _filterSetData
     * @description Перемещает данные фильтра из модели на ui компонент.
     * @private
     */
    _filterSetData() {
        this._filterData = FilterModel.getFilterData();
        const filterInputs = document.getElementById('filterInputs');
        if (filterInputs === null) {
            return;
        }
        const inputs = filterInputs.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = <string>this._filterData[input.id];
        })

        this._filterCheckLists.forEach(id => {
            const ul = document.getElementById(id);
            if (ul === null) {
                return;
            }
            const liElements = ul.querySelectorAll('li.filter__check-elem');

            liElements.forEach(li => {
                if (li === null) {
                    return;
                }
                const spanText = li.children[1].textContent as string;
                if (this._filterData[id] === spanText) {
                    li.classList.add('checked');
                }
            });
            if (ul.parentElement === null) {
                return;
            }
            const selectButton = ul.parentElement.previousElementSibling as HTMLButtonElement;
            const checked = ul.querySelector('.checked');

            if (checked) {
                selectButton.innerHTML = `${checked.children[1].textContent}`
            } else {
                selectButton.innerHTML = this._defaultFields[id];
            }
        });

    }

    /**
     * @function _checkValidation
     * @description Метод проверки валидности полей фильтра.
     * @param {HTMLButtonElement} button кнопка, которая открыла всплывающее окно селекта.
     */
    _checkValidation(button: HTMLButtonElement) {

        if (Object.hasOwn(this._filterValid, button.name)) {
            if (!this._submitButton) {
                return;
            }
            if (this._filterValid[button.name]) {
                button.classList.remove('red');
                if (!Object.values(this._filterValid).includes(false)) {
                    this._submitButton.removeAttribute('disabled');
                }
            } else {
                button.classList.add('red');
                this._submitButton.setAttribute('disabled', 'disabled');
            }
        }
    }
}