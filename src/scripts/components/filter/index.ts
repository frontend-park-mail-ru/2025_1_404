import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import FilterModel from "../../models/filterModel"
import RouteManager from "../../managers/routeManager/routeManager.ts";
import {Page} from "../../pages/page.ts";
/**
 * @class Filter
 * @description Компонент фильтра.
 * @augments BaseComponent
 */
export default class Filter extends BaseComponent {
    private _openPopupButton: HTMLButtonElement | null;
    private _defaultFields: Record<string, string>;
    private _filterCheckLists: string[];
    private _filterData: Record<string, Set<string> | string>;
    private _filterValid: Record<string, boolean>;
    private _page: Page
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._page = page;
        this._openPopupButton = null;
        this._defaultFields = {
            "filterOfferType": "Тип сделки",
            "filterPropertyType": "Тип недвижимости",
            "filterPrice": "Цена",
            "filterSquare": "Площадь",
        };
        this._filterCheckLists = ["filterOfferType", "filterPropertyType"];
        this._filterData = {
            "filterOfferType": new Set(),
            "filterPropertyType": new Set(),
            "filterPriceLeft": '',
            "filterPriceRight": '',
            "filterSquareLeft": '',
            "filterSquareRight": '',
            "filterInputAddress": '',
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
        this.initListener('filterInputAddress', 'focusout', this._filterInputChange);
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
        event.preventDefault();

        if (!event.currentTarget) {
            return;
        }
        const currentTarget = event.currentTarget as HTMLInputElement;
        this._filterValid[currentTarget.name] = this._page.formInputHandler(event, false)

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

        if (this._filterData[elem.parentElement.id] instanceof Set && elem.children[1].textContent) {
            const currentSet = this._filterData[elem.parentElement.id] as Set<string>;
            if (elem.classList.toggle('checked')) {
                currentSet.add(elem.children[1].textContent)
            } else {
                currentSet.delete(elem.children[1].textContent)
            }
        }
        const checked = elem.parentElement.querySelectorAll('.checked');

        if (checked && checked.length > 0) {
            selectButton.innerHTML = `Выбрано ${checked.length}`
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
        button.classList.remove('red');
        if (!this._filterValid[button.name] && this._filterValid[button.name] !== undefined) {
            button.classList.add('red');
        }

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

    _filterSetData() {
        this._filterData = FilterModel.getFilterData();
        const filterInputs = document.getElementById('filterInputs');
        if (filterInputs === null) {
            return;
        }
        const inputs = filterInputs.querySelectorAll('input');
        inputs.forEach(input => {
            console.log(input, this._filterData[input.id]);
            input.value = <string>this._filterData[input.id];
        })

        this._filterCheckLists.forEach(id => {
            const ul = document.getElementById(id);
            console.log(ul);
            if (ul === null) {
                return;
            }
            const liElements = ul.querySelectorAll('li.filter__check-elem');

            liElements.forEach(li => {
                if (li === null) {
                    return;
                }
                const spanText = li.children[1].textContent as string;
                console.log(spanText);
                console.log(this._filterData[id]);
                if (this._filterData[id] instanceof Set && this._filterData[id].has(spanText)) {
                    li.classList.add('checked');
                }
            });
            if (ul.parentElement === null) {
                return;
            }
            const selectButton = ul.parentElement.previousElementSibling as HTMLButtonElement;
            const checked = ul.querySelectorAll('.checked');

            if (checked && checked.length > 0) {
                selectButton.innerHTML = `Выбрано ${checked.length}`
            } else {
                selectButton.innerHTML = this._defaultFields[id];
            }
        });

    }
}