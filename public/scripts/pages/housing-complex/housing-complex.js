'use strict'

import HousingComplexCarousel from "../../components/HousingComplex/Carousel/HousingComplexCarousel.js";
import HousingComplexInformation from "../../components/HousingComplex/Information/HousingComplexInformation.js";
import HousingComplexReviews from "../../components/HousingComplex/Reviews/HousingComplexReviews.js";
import Page from "../page.js";
import {getHousingComplex} from "../../util/ApiUtil.js";
import template from "./housing-complex.precompiled.js";


/**
 * @class IndexPage
 * @description Страница ЖК
 * @extends Page
 */
export default class HousingComlpexPage extends Page {
    render (root, {id}) {

        this._getInformation(id)
        .then ((data) => {
            root.innerHTML = template(data);
            this._carousel = new HousingComplexCarousel();
            this._information = new HousingComplexInformation(id);
            this._reviews = new HousingComplexReviews();
            super.render(root);
        })
        
    }

    destroy() {
        if (this._carousel) {
            this._carousel.destroy();
        }

        super.destroy();
    }

    _getInformation(id) {
        return getHousingComplex(id)
        .then((data) => data)
        .catch ((error) => {
            console.log(error);
        });
    }
}