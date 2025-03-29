'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateParams.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";
import Map from "../../../models/Map.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreateParamsPage
 * @description Страница создания объявления с выборо параметров
 * @extends Page
 */
export default class OfferCreateParamsPage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: false, lastPage: false});
        this._offerParamsData = {};
        this._getDataFromModel();
        if (Object.keys(this._offerParamsData).length !== 0) {
            this._setDataFromModel();
        } else {
            this._initReadParamsData();
        }
    }

    initListeners() {
        this.initListener('input-square', 'focusout', this._offerParamsInputChange);
        this.initListener('offerCreateParams', 'change', this._offerParamsSelectsChange);
    }

    destroy() {
        super.destroy();
    }

    _initReadParamsData() {
        const input = document
            .getElementById('input-square')
        this._offerParamsData[input.id] = '';

        const selects = document.getElementById("offerCreateParams").querySelectorAll('input:checked');
        selects.forEach(input => {
            this._offerParamsData[input.name] = input.labels[0].textContent;
        })
        OfferCreate.setData("params", this._offerParamsData);
        OfferCreate.setPageFilled("params", this._isInputsFilled());
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["params"]) {
            this._offerParamsData = OfferCreate.getOfferData()["params"];
        }
    }

    _setDataFromModel() {
        const input = document
            .getElementById('input-square')
        if (this._offerParamsData[input.id]) {
            input.value = this._offerParamsData[input.id];
        }

        const selects = document.getElementById("offerCreateParams").querySelectorAll('input');
        selects.forEach(input => {
            if (input.labels[0].textContent === this._offerParamsData[input.name]) {
                input.checked = true;
            }
        })
    }

    _isInputsFilled() {
        let isFilled = true;
        for (let key in this._offerParamsData) {
            if (this._offerParamsData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _offerParamsInputChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerParamsData[target.id] = target.value;
        OfferCreate.setData("params", this._offerParamsData);
        OfferCreate.setPageFilled("params", this._isInputsFilled());
    }

    _offerParamsSelectsChange(event, {target} = event) {
        event.preventDefault();

        this._offerParamsData[target.name] = target.labels[0].textContent;
        OfferCreate.setData("params", this._offerParamsData);
    }
}