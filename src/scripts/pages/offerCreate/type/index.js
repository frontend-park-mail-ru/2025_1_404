'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreateTypePage
 * @description Страница создания объявления с типом сделки
 * @extends Page
 */
export default class OfferCreateTypePage extends OfferPage {
    render({layout, root}) {
        root.innerHTML = template();
        super.render({layout, root});

        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
            return;
        }
        this._initReadTypeData();
    }

    initListeners() {
        this.initListener('offerCreateChoices', 'change', this._offerDataChange);
    }

    _initReadTypeData() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input:checked');
        selects.forEach(input => {
            this._offerData[input.name] = input.labels[0].textContent;
        })
        OfferCreate.setData(this._pageName, this._offerData);
    }

    _setDataFromModel() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input');
        selects.forEach(input => {
            if (input.labels[0].textContent === this._offerData[input.name]) {
                input.checked = true;
            }
        })
    }

    _offerDataChange(event, {target} = event) {
        event.preventDefault();

        this._offerData[target.name] = target.labels[0].textContent;
        OfferCreate.setData(this._pageName, this._offerData);
    }
}