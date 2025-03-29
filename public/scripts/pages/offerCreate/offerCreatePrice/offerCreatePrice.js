'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreatePrice.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreatePricePage
 * @description Страница создания объявления с выбором цены
 * @extends Page
 */
export default class OfferCreatePricePage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: false, lastPage: false});
        this._offerPriceData = {};
        this._getDataFromModel();
        if (Object.keys(this._offerPriceData).length !== 0) {
            this._setDataFromModel();
        }
    }

    initListeners() {
        this.initListener('input-price', 'focusout', this._offerPriceInputChange);
    }

    destroy() {
        super.destroy();
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["price"]) {
            this._offerPriceData = OfferCreate.getOfferData()["price"];
        }
    }

    _setDataFromModel() {
        const input = document
            .getElementById('input-price')
        input.value = this._offerPriceData[input.id];
    }

    _isInputsFilled() {
        let isFilled = true;
        for (let key in this._offerPriceData) {
            if (this._offerPriceData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _offerPriceInputChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerPriceData[target.id] = target.value;
        OfferCreate.setData("price", this._offerPriceData);
        OfferCreate.setPageFilled("price", this._isInputsFilled());
    }
}