'use strict'

import HousingComplexCarousel from "../../components/HousingComplex/Carousel/HousingComplexCarousel.js";
import HousingComplexInformation from "../../components/HousingComplex/Information/HousingComplexInformation.js";
import HousingComplexReviews from "../../components/HousingComplex/Reviews/HousingComplexReviews.js";
import Page from "../page.js";
import {getHousingComplex} from "../../util/ApiUtil.js";
import housingComplexCarouselTemplate from "../../components/HousingComplex/Carousel/HousingComplexCarousel.precompiled.js";
import housingComplexInformationTemplate from "../../components/HousingComplex/Information/HousingComplexInformation.precompiled.js";
import template from "./housing-complex.precompiled.js";
import YandexUtil from "../../util/YandexUtil.js";
import Map from "../../models/Map.js";


/**
 * @class IndexPage
 * @description Страница ЖК
 * @extends Page
 */
export default class HousingComplexPage extends Page {
    render ({root, props: {id}}) {
        root.innerHTML = template();
        super.render({root});
        this._getInformation()
        .then ((data) => {
            document.getElementById('housingComplexInformation').innerHTML = housingComplexInformationTemplate(data);
            document.getElementById('housingComplexCarousel').innerHTML = housingComplexCarouselTemplate(data);
            this._carousel = new HousingComplexCarousel();
            this._information = new HousingComplexInformation();
            this._reviews = new HousingComplexReviews();

            this.map = new Map({id: 'housing-complex-map', center: [55.557729, 37.313484], zoom: 15})
            this.map.addHouse({coords: [55.557729, 37.313484]});
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