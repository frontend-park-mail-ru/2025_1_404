'use strict'

import HousingComplexSlider from "../../components/housingComplex/housingComplexSlider/index.js";
import HousingComplexInformation from "../../components/housingComplex/housingComplexInformation/index.js";
import HousingComplexReviews from "../../components/housingComplex/housingComplexReviews/index.js";
import Map from "../../models/map.js";
import Page from "../page.js";
import {getHousingComplex} from "../../util/apiUtil.js";
import housingComplexSliderTemplate from "../../components/housingComplex/housingComplexSlider/template.precompiled.js";
import housingComplexInformationTemplate from "../../components/housingComplex/housingComplexInformation/template.precompiled.js";
import template from "./template.precompiled.js";


/**
 * @class HousingComplexPage
 * @description Страница ЖК
 * @extends Page
 */
export default class HousingComplexPage extends Page {
    render ({root}) {
        root.innerHTML = template();
        super.render({root});
        this._getInformation()
        .then ((data) => {
            document.getElementById('housingComplexInformation').innerHTML = housingComplexInformationTemplate(data);
            document.getElementById('housingComplexSlider').innerHTML = housingComplexSliderTemplate(data);
            this._slider = new HousingComplexSlider();
            this._information = new HousingComplexInformation();
            this._reviews = new HousingComplexReviews();

            const housePos = [55.557729, 37.313484];
            this.map = new Map({center: housePos, id: 'housingComplexMap', zoom: 15})
            this.map.addHouse({coords: housePos});
        })
        
    }

    destroy() {
        if (this._slider) {
            this._slider.destroy();
        }
        if (this._information) {
            this._information.destroy();
        }
        if (this._reviews) {
            this._reviews.destroy();
        }

        super.destroy();
    }

    _getInformation() {
        return getHousingComplex()
        .then((data) => data)
        .catch ((error) => {
            console.warn(error);
        });
    }
}