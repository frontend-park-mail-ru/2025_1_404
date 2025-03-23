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
export default class HousingComplexPage extends Page {
    render ({root, props: {id}}) {
        this._getInformation()
        .then ((data) => {
            root.innerHTML = template(data);
            this._carousel = new HousingComplexCarousel();
            this._information = new HousingComplexInformation();
            this._reviews = new HousingComplexReviews();
            super.render(root);
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
            console.log(error);
        });
    }
}