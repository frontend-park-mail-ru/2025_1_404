'use strict'

import Map from "../../../models/map.js";
import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @extends Page
 */
export default class OfferCreateAddressPage extends OfferPage {
    render({layout, root}) {
        root.innerHTML = template();
        super.render({layout, root});

        this._getDataFromModel();
        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }

        const coords = [55.557729, 37.313484]; // TODO: replace to data from API

        this.map = new Map({center: coords, id: 'offerCreateMap', zoom: 15})
        this.house = this.map.addHouse({coords});
    }

    changeHousePos(coords) {
        this.map.removePlacemark({placemark: this.house});
        this.house = this.map.addHouse({coords});
    }

    initListeners() {
        this.initListener('offerCreateAddressInputs', 'focusout', this._offerDataChange);
    }

    _setDataFromModel() {
        const inputs = document
            .getElementById('offerCreateAddressInputs')
            .querySelectorAll('input');
        inputs.forEach(input => {
            input.value = this._offerData[input.id];
        })
    }

    _isInputsFilled() {
        let isFilled = true;
        for (const key in this._offerData) {
            if (this._offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _offerDataChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        if (target.id === 'input-address') {
            this.map.geoCode(target.value).then(() => {
                this.changeHousePos(this.map.center);
            });
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}