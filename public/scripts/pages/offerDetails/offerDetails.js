'use strict'

import Page from '../page.js';
import template from "./offerDetails.precompiled.js";
import offerDetailsHeaderTemplate
    from "../../components/OfferDetailsHeader/OfferDetailsHeader.precompiled.js";
import offerDetailsSliderTemplate
    from "../../components/OfferDetailsSlider/OfferDetailsSlider.precompiled.js";
import offerDetailsInfoTemplate
    from "../../components/OfferDetailsInfo/OfferDetailsInfo.precompiled.js";
import {getHousingComplex, getOfferById} from "../../util/ApiUtil.js";

/**
 * @class offerDetailsPage
 * @description Страница с подробностями об объявлении
 * @extends Page
 */
export default class OfferDetailsPage extends Page {
    render({root, props: {id}}) {
        root.innerHTML = template();
        super.render(root);
        this._getOfferById()
        .then ((data) => {
            document.getElementById("offerDetailsHeader").innerHTML = offerDetailsHeaderTemplate(data);
            document.getElementById("offerDetailsLeft").innerHTML = offerDetailsSliderTemplate(data);
            document.getElementById("offerDetailsInfo").innerHTML = offerDetailsInfoTemplate(data);
        })
    }

    destroy() {

        super.destroy();
    }

    _getOfferById() {
        return getOfferById(0)
            .then((data) => data)
            .catch ((error) => {
                console.log(error);
            });
    }
}