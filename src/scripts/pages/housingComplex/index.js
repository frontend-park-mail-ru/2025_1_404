'use strict'

import HousingComplexCarousel from "../../components/housingComplex/carousel/index.js";
import HousingComplexInformation from "../../components/housingComplex/information/index.js";
import HousingComplexReviews from "../../components/housingComplex/reviews/index.js";
import Map from "../../models/map.js";
import Page from "../page.js";
import {getHousingComplex} from "../../util/apiUtil.js";
import housingComplexCarouselTemplate from "../../components/housingComplex/carousel/template.precompiled.js";
import housingComplexInformationTemplate from "../../components/housingComplex/information/template.precompiled.js";
import template from "./template.precompiled.js";


/**
 * @class IndexPage
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
            document.getElementById('housingComplexCarousel').innerHTML = housingComplexCarouselTemplate(data);
            this._carousel = new HousingComplexCarousel();
            this._information = new HousingComplexInformation();
            this._reviews = new HousingComplexReviews();

            const housePos = [55.557729, 37.313484];
            this.map = new Map({center: housePos, id: 'housingComplex-map', zoom: 15})
            this.map.addHouse({coords: housePos});
        })
        
    }

    destroy() {
        if (this._carousel) {
            this._carousel.destroy();
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