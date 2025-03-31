'use strict'

import template from "./template.precompiled.js";
import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";

/**
 * @class OfferCreatePricePage
 * @description Страница создания объявления с выбором цены
 * @extends OfferPage
 */
export default class OfferCreatePricePage extends OfferPage {
    render({layout, root}) {
        root.innerHTML = template();
        super.render({root, layout});

        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }
    }

    initListeners() {
        this.initListener('input-price', 'focusout', this._offerPriceInputChange);
    }

    _setDataFromModel() {
        const input = document
            .getElementById('input-price')
        input.value = this._offerData[input.id];
    }

    _isInputsFilled() {
        let isFilled = true;
        for (let key in this._offerData) {
            if (this._offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _offerPriceInputChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}