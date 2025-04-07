import {BaseComponent, BaseComponentInterface} from "../baseComponent.js";
import FilterModel from "../../models/filterModel"
import RouteManager from "../../managers/routeManager/routeManager.js";
/**
 * @class Filter
 * @description Компонент фильтра.
 * @augments BaseComponent
 */
export default class Filter extends BaseComponent {
    private _openPopupButton: HTMLButtonElement | null;
    private _defaultFields: Record<string, string>;
    private _filterData: Record<string, any>;
    /**
     * @description Конструктор класса.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._openPopupButton = null;
        this._defaultFields = {
            "filterOfferType": "Тип сделки",
            "filterPropertyType": "Тип недвижимости",
            "filterPrice": "Цена",
            "filterSquare": "Площадь",
        };
        this._filterData = {
            "filterOfferType": new Set(),
            "filterPropertyType": new Set(),
            "filterPriceLeft": 0,
            "filterPriceRight": 0,
            "filterSquareLeft": 0,
            "filterSquareRight": 0,
        }

        document.onclick = (event) => {
            if (event.target === null) {
                return;
            }
            if (this._openPopupButton === null) {
                return;
            }
            if (this._openPopupButton.nextElementSibling === null) {
                return;
            }
            const target = event.target as HTMLElement;
            if (!this._openPopupButton.nextElementSibling.contains(target)) {
                this._filterSelectClosePopup(this._openPopupButton);
                this._openPopupButton = null;
            }
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий для компонента фильтра.
     */
    initListeners() {
        this.initListenerForClass('filter__select-button', 'click', this._filterSelectOpenPopup);
        this.initListenerForClass('filter__check-elem', 'click', this._filterCheckListElem);
        this.initListener('filterPriceLeft', 'focusout', this._filterInputChange);
        this.initListener('filterPriceRight', 'focusout', this._filterInputChange);
        this.initListener('filterSquareLeft', 'focusout', this._filterInputChange);
        this.initListener('filterSquareRight', 'focusout', this._filterInputChange);
        this.initListener('filterSubmitButton', 'click', this._filterSubmit);
    }

    /**
     * @function _filterSubmit
     * @description Метод обработки отправки формы фильтра.
     * @param {Event} event событие отправки формы.
     * @private
     */
    _filterSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        for (const [key, value] of Object.entries(this._filterData)) {
            FilterModel.setData(key, value);
        }
        console.log(FilterModel.getFilterData())
        RouteManager.navigateTo('/search');
    }

    /**
     * @function _filterInputChange
     * @description Метод обработки изменения значения в полях ввода фильтра.
     * @param {Event} event событие изменения значения в поле ввода.
     * @private
     */
    _filterInputChange(event: Event) {
        if (event.currentTarget === null) {
            return;
        }
        const currentTarget = event.currentTarget as HTMLInputElement;
        event.preventDefault();
        this._filterData[currentTarget.id] = currentTarget.value;
        console.log(this._filterData);
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

        if (elem.classList.toggle('checked')) {
            this._filterData[selectButton.id].add(elem.children[1].textContent)
            console.log(this._filterData);
        } else {
            this._filterData[selectButton.id].delete(elem.children[1].textContent)
            console.log(this._filterData);
        }
        const checked = elem.parentElement.querySelectorAll('.checked');

        if (checked && checked.length > 0) {
            selectButton.innerHTML = `Выбрано ${checked.length}`
        } else {
            selectButton.innerHTML = this._defaultFields[selectButton.id];
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
        if (button.nextElementSibling === null) {
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
        if (this._openPopupButton === null) {
            event.stopPropagation();
        } else if (this._openPopupButton !== event.target) {
            event.stopPropagation();
            this._filterSelectClosePopup(this._openPopupButton);
        }
        this._openPopupButton = event.target as HTMLButtonElement;
        this._openPopupButton.classList.toggle('active');
        if (this._openPopupButton.nextElementSibling) {
            this._openPopupButton.nextElementSibling.classList.toggle('active');
        }
    }
}