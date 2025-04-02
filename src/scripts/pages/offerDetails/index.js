'use strict'

import Page from '../page.js';
import {getOfferById} from "../../util/apiUtil.js";
import offerDetailsHeaderTemplate
    from "../../components/offerDetailsHeader/template.precompiled.js";
import offerDetailsInfoTemplate
    from "../../components/offerDetailsInfo/template.precompiled.js";
import offerDetailsSliderTemplate
    from "../../components/offerDetailsSlider/template.precompiled.js";
import template from "./template.precompiled.js";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @extends Page
 */
export default class OfferDetailsPage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);
        this._getOfferById()
        .then ((data) => {
            document.getElementById("offerDetailsHeader").innerHTML = offerDetailsHeaderTemplate(data);
            document.getElementById("offerDetailsLeft").innerHTML = offerDetailsSliderTemplate(data);
            document.getElementById("offerDetailsInfo").innerHTML = offerDetailsInfoTemplate(data);
        })
    }

    _getOfferById() {
        return getOfferById(0)
            .then((data) => data)
            .catch ((error) => {
                console.warn(error);
            });
    }
}