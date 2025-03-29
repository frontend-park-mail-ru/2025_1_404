'use strict'

import Page from '../../page.js';
import template from "./offerCreateAddress.precompiled.js";
import Map from "../../../models/Map.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @extends Page
 */
export default class OfferCreateAddressPage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: false, lastPage: false});
        this._offerAddressData = {};
        this._getDataFromModel();
        if (Object.keys(this._offerAddressData).length !== 0) {
            this._setDataFromModel();
        }

        this.map = new Map({id: 'offerCreateMap', center: [55.557729, 37.313484], zoom: 15})
        this.map.addHouse({coords: [55.557729, 37.313484]});
    }

    initListeners() {
        this.initListener('offerCreateAddressInputs', 'focusout', this._offerAddressDataChange);
    }

    destroy() {
        super.destroy();
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["address"]) {
            this._offerAddressData = OfferCreate.getOfferData()["address"];
        }
    }

    _setDataFromModel() {
        const inputs = document
            .getElementById('offerCreateAddressInputs')
            .querySelectorAll('input');
        inputs.forEach(input => {
            input.value = this._offerAddressData[input.id];
        })
    }

    _isInputsFilled() {
        let isFilled = true;
        for (let key in this._offerAddressData) {
            if (this._offerAddressData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _offerAddressDataChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerAddressData[target.id] = target.value;
        OfferCreate.setData("address", this._offerAddressData);
        OfferCreate.setPageFilled("address", this._isInputsFilled());
    }
}