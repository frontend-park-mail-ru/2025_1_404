'use strict'

import Page from '../../page.js';
import template from "./offerCreateType.precompiled.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreateTypePage
 * @description Страница создания объявления с типом сделки
 * @extends Page
 */
export default class OfferCreateTypePage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: true, lastPage: false});
        this._offerTypeData = {}
        this._getDataFromModel();
        if (Object.keys(this._offerTypeData).length !== 0) {
            this._setDataFromModel();
        } else {
            this._initReadTypeData();
        }
    }

    initListeners() {
        this.initListener('offerCreateChoices', 'change', this._offerTypeDataChange);
    }

    destroy() {
        super.destroy();
    }

    _initReadTypeData() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input:checked');
        selects.forEach(input => {
            this._offerTypeData[input.name] = input.labels[0].textContent;
        })
        OfferCreate.setData("type", this._offerTypeData);
        OfferCreate.setPageFilled("type", true);
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["type"]) {
            this._offerTypeData = OfferCreate.getOfferData()["type"];
        }
    }

    _setDataFromModel() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input');
        selects.forEach(input => {
            if (input.labels[0].textContent === this._offerTypeData[input.name]) {
                input.checked = true;
            }
        })
    }

    _offerTypeDataChange(event, {target} = event) {
        event.preventDefault();

        this._offerTypeData[target.name] = target.labels[0].textContent;
        OfferCreate.setData("type", this._offerTypeData);
    }
}