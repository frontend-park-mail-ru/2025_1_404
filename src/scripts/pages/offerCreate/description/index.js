'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreateDescriptionPage
 * @description Страница создания объявления с полем описания
 * @extends Page
 */
export default class OfferCreateDescriptionPage extends OfferPage {
    render({layout, root}) {
        root.innerHTML = template();
        super.render({layout, root});

        this._getDataFromModel();
        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }
    }

    initListeners() {
        this.initListener('input-description', 'focusout', this._offerDescriptionTextareaChange);
    }

    _isInputsFilled() {
        let isFilled = true;
        for (const key in this._offerData) {
            if (this._offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    _setDataFromModel() {
        const input = document
            .getElementById('input-description')
        input.value = this._offerData[input.id];
    }

    _offerDescriptionTextareaChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'TEXTAREA') {
            return;
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}