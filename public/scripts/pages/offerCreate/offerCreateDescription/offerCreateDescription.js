'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateDescription.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";
import OfferCreate from "../../../models/OfferCreate.js";
import offerCreateBtnsTemplate from "../../../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";

/**
 * @class OfferCreateDescriptionPage
 * @description Страница создания объявления с полем описания
 * @extends Page
 */
export default class OfferCreateDescriptionPage extends Page {
    render({layout, root}) {
        root.innerHTML = template();
        super.render(root);

        this._layout = layout;

        document.getElementById("offerCreateBtns").innerHTML = offerCreateBtnsTemplate({firstPage: false, lastPage: true});
        this._offerDescriptionData = {};
        this._getDataFromModel();
        if (Object.keys(this._offerDescriptionData).length !== 0) {
            this._setDataFromModel();
        }
    }

    initListeners() {
        this.initListener('input-description', 'focusout', this._offerDescriptionTextareaChange);
    }

    destroy() {
        super.destroy();
    }

    _isInputsFilled() {
        let isFilled = true;
        for (let key in this._offerDescriptionData) {
            if (this._offerDescriptionData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()["description"]) {
            this._offerDescriptionData = OfferCreate.getOfferData()["description"];
        }
    }

    _setDataFromModel() {
        const input = document
            .getElementById('input-description')
        input.value = this._offerDescriptionData[input.id];
    }

    _offerDescriptionTextareaChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'TEXTAREA') {
            return;
        }

        this._offerDescriptionData[target.id] = target.value;
        OfferCreate.setData("description", this._offerDescriptionData);
        OfferCreate.setPageFilled("description", this._isInputsFilled());
    }
}