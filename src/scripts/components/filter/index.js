import BaseComponent from "../baseComponent.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import FilterModel from "../../models/filterModel.js"
/**
 * @class Filter
 * @description Компонент фильтра.
 * @extends BaseComponent
 */
export default class Filter extends BaseComponent {
    constructor() {
        super({});
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
            if (!this._openPopupButton.nextElementSibling.contains(event.target)) {
                this._filterSelectClosePopup(this._openPopupButton);
                this._openPopupButton = null;
            }
        }
    }

    initListeners() {
        this.initListenerForClass('filter__select-button', 'click', this._filterSelectOpenPopup);
        this.initListenerForClass('filter__check-elem', 'click', this._filterCheckListElem);
        this.initListener('filterPriceLeft', 'focusout', this._filterInputChange);
        this.initListener('filterPriceRight', 'focusout', this._filterInputChange);
        this.initListener('filterSquareLeft', 'focusout', this._filterInputChange);
        this.initListener('filterSquareRight', 'focusout', this._filterInputChange);
        this.initListener('filterSubmitButton', 'click', this._filterSubmit);
    }

    _filterSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        for (const [key, value] of Object.entries(this._filterData)) {
            FilterModel.setData(key, value);
        }
        console.log(FilterModel.getFilterData())
        RouteManager.navigateTo('/search');
    }

    _filterInputChange(event) {
        event.preventDefault();
        this._filterData[event.currentTarget.id] = event.currentTarget.value;
        console.log(this._filterData);
    }

    _filterCheckListElem(event) {
        event.preventDefault();
        event.stopPropagation();

        let elem = event.target;
        while (elem.tagName.toLowerCase() !== 'li') {
            elem = elem.parentElement;
        }
        let selectButton = elem.parentElement.parentElement.previousElementSibling;

        if (elem.classList.toggle('checked')) {
            this._filterData[selectButton.id].add(elem.children[1].textContent)
            console.log(this._filterData);
        } else {
            this._filterData[selectButton.id].delete(elem.children[1].textContent)
            console.log(this._filterData);
        }
        let checked = elem.parentElement.querySelectorAll('.checked');

        if (checked && checked.length > 0) {
            selectButton.innerHTML = `Выбрано ${checked.length}`
        } else {
            selectButton.innerHTML = this._defaultFields[selectButton.id];
        }
    }

    _filterSelectClosePopup(button) {
        button.classList.remove('active');
        button.nextElementSibling.classList.remove('active');
    }

    _filterSelectOpenPopup(event) {
        event.preventDefault();
        if (this._openPopupButton === null) {
            event.stopPropagation();
        } else if (this._openPopupButton !== event.target) {
            event.stopPropagation();
            this._filterSelectClosePopup(this._openPopupButton);
        }
        this._openPopupButton = event.target;
        event.target.classList.toggle('active');
        event.target.nextElementSibling.classList.toggle('active');
    }
}