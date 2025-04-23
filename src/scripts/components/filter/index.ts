import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import FilterModel from "../../models/filterModel"
import RouteManager from "../../managers/routeManager/routeManager.ts";
import ClearInput from "../clearInput";
import AddressInput from "../addressInput";
/**
 * @class Filter
 * @description Компонент фильтра.
 * @augments BaseComponent
 */
export default class Filter extends BaseComponent {
    private openPopupButton: HTMLButtonElement | null;
    private defaultFields: Record<string, string>;
    private filterCheckLists: string[];
    private filterData: Record<string, string>;
    private filterValid: Record<string, boolean>;
    private submitButton: HTMLElement | null;
    private addressInput: AddressInput | null = null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    // eslint-disable-next-line max-lines-per-function
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        if (page) {
            this.page = page;
        }
        this.openPopupButton = null;
        this.submitButton = document.getElementById("filterSubmitButton");
        this.defaultFields = {
            "filterOfferType": "Тип сделки",
            "filterPropertyType": "Тип недвижимости",
            "filterPrice": "Цена",
            "filterSquare": "Площадь",
        };
        this.filterCheckLists = ["filterOfferType", "filterPropertyType"];
        this.filterData = {
            "filterOfferType": '',
            "filterPropertyType": '',
            "filterPriceLeft__input": '',
            "filterPriceRight__input": '',
            "filterSquareLeft__input": '',
            "filterSquareRight__input": '',
            "filterInputAddress__input": '',
        }
        this.filterValid = {
            "offer_price": true,
            "offer_square": true,
        }

        document.onclick = (event) => {
            if (!event.target || !this.openPopupButton || !this.openPopupButton.nextElementSibling) {
                return;
            }
            const target = event.target as HTMLElement;
            if (!this.openPopupButton.nextElementSibling.contains(target)) {
                this.filterSelectClosePopup(this.openPopupButton);
                this.openPopupButton = null;
            }
        }

        if (!this.page) {
            return;
        }

        this.addressInput = new AddressInput({
            page: this.page,
            layout,
            id: 'filterInputAddress',
        });

        new ClearInput({
            page: this.page,
            layout,
            id: 'filterPriceLeft',
        });

         new ClearInput({
            page: this.page,
            layout,
            id: 'filterPriceRight',
        });

        new ClearInput({
            page: this.page,
            layout,
            id: 'filterSquareLeft',
        })

        new ClearInput({
            page: this.page,
            layout,
            id: 'filterSquareRight',
        })
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий для компонента фильтра.
     */
    initListeners() {
        this.initListenerForClass('filter__select-button', 'click', this.filterSelectOpenPopup);
        this.initListenerForClass('filter__check-elem', 'click', this.filterCheckListElem);
        this.initListener('filterPriceLeft__input', 'input', this.filterInputChange);
        this.initListener('filterPriceRight__input', 'input', this.filterInputChange);
        this.initListener('filterSquareLeft__input', 'input', this.filterInputChange);
        this.initListener('filterSquareRight__input', 'input', this.filterInputChange);
        this.initListener('filterInputAddress__input', 'input', this.filterInputChange);
        this.initListener('filterInputAddress__input', 'keyup', this.filterSubmitKey);
        this.initListener('filterSubmitButton', 'click', this.filterSubmit);
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
     * @function filterSubmitKey
     * @description Метод обработки нажатия клавиши Enter в поле ввода фильтра.
     * @param {Event} event событие нажатия клавиши.
     */
    private filterSubmitKey(event: Event) {
        event.preventDefault();
        if (event instanceof KeyboardEvent && event.key === 'Enter') {
            this.filterSubmit(event);
        }
    }

    /**
     * @function filterSubmit
     * @description Метод обработки отправки формы фильтра.
     * @param {Event} event событие отправки формы.
     * @private
     */
    private filterSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        for (const [key, value] of Object.entries(this.filterData)) {
            FilterModel.setData(key, value);
        }
        RouteManager.navigateTo('/search');
    }

    /**
     * @function filterInputChange
     * @description Метод обработки изменения значения в полях ввода фильтра.
     * @param {Event} event событие изменения значения в поле ввода.
     * @private
     */
    private filterInputChange(event: Event) {
        event.preventDefault();
        if (!event.currentTarget || !this.page) {
            return;
        }
        const currentTarget = event.currentTarget as HTMLInputElement;
        this.filterValid[currentTarget.name] = this.page.formInputHandler(event, false)

        const button = document.getElementsByName(currentTarget.name)[0] as HTMLButtonElement;
        if (button !== null) {
            this.checkValidation(button);
        }

        if (typeof this.filterData[currentTarget.id] === 'string') {
            this.filterData[currentTarget.id] = currentTarget.value;
        }

    }

    /**
     * @function filterCheckListElem
     * @description Метод обработки клика по элементу списка чекбоксов фильтра.
     * @param {Event} event событие клика по элементу списка чекбоксов.
     * @private
     */
    private filterCheckListElem(event: Event) {
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
                this.filterData[elem.parentElement.id] = elem.children[1].textContent;
            } else {
                this.filterData[elem.parentElement.id] = '';
            }
        }
        const checked = elem.parentElement.querySelector('.checked');

        if (checked) {
            selectButton.innerHTML = `${checked.children[1].textContent}`;
        } else {
            selectButton.innerHTML = this.defaultFields[elem.parentElement.id];
        }
    }

    /**
     * @function filterSelectClosePopup
     * @description Закрывает всплывающее окно селекта фильтра.
     * @param {HTMLElement} button кнопка, которая открыла всплывающее окно селекта.
     * @private
     */
    private filterSelectClosePopup(button: HTMLButtonElement) {
        button.classList.remove('active');

        this.checkValidation(button);

        if (!button.nextElementSibling) {
            return;
        }
        button.nextElementSibling.classList.remove('active');
    }

    /**
     * @function filterSelectOpenPopup
     * @description Открывает всплывающее окно селекта фильтра.
     * @param {Event} event событие клика по кнопке селекта.
     * @private
     */
    private filterSelectOpenPopup(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.openPopupButton && this.openPopupButton !== event.target) {
            event.stopPropagation();
            this.filterSelectClosePopup(this.openPopupButton);
        }
        this.openPopupButton = event.target as HTMLButtonElement;
        this.openPopupButton.classList.toggle('active');

        if (this.openPopupButton.nextElementSibling) {
            this.openPopupButton.nextElementSibling.classList.toggle('active');
        }
    }

    /**
     * @function filterSetData
     * @description Перемещает данные фильтра из модели на ui компонент.
     * @private
     */
    filterSetData() {
        this.filterData = FilterModel.getFilterData();
        const filterInputs = document.getElementById('filterInputs');
        if (filterInputs === null) {
            return;
        }
        const inputs = filterInputs.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = <string>this.filterData[input.id];
        })

        this.filterCheckLists.forEach(id => {
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
                if (this.filterData[id] === spanText) {
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
                selectButton.innerHTML = this.defaultFields[id];
            }
        });

    }

    /**
     * @function checkValidation
     * @description Метод проверки валидности полей фильтра.
     * @param {HTMLButtonElement} button кнопка, которая открыла всплывающее окно селекта.
     */
    private checkValidation(button: HTMLButtonElement) {

        if (Object.hasOwn(this.filterValid, button.name)) {
            if (!this.submitButton) {
                return;
            }
            if (this.filterValid[button.name] && (this.addressInput?.isFilled() || this.addressInput?.isEmpty())) {
                button.classList.remove('red');
                if (!Object.values(this.filterValid).includes(false)) {
                    this.submitButton.removeAttribute('disabled');
                }
            } else {
                button.classList.add('red');
                this.submitButton.setAttribute('disabled', 'disabled');
            }
        }
    }
}