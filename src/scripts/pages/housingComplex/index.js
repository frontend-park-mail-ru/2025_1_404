'use strict'

import HousingComplexInformation from "../../components/housingComplex/housingComplexInformation/index.js";
import HousingComplexReviews from "../../components/housingComplex/housingComplexReviews/index.js";
import HousingComplexSlider from "../../components/housingComplex/housingComplexSlider/index.js";
import Map from "../../models/map.js";
import Page from "../page.js";
import {getHousingComplex} from "../../util/apiUtil.js";
import housingComplexInformationTemplate
    from "../../components/housingComplex/housingComplexInformation/template.precompiled.js";
import housingComplexSliderTemplate from "../../components/housingComplex/housingComplexSlider/template.precompiled.js";
import template from "./template.precompiled.js";


/**
 * @class HousingComplexPage
 * @description Страница ЖК
 * @augments Page
 */
export default class HousingComplexPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root}) {
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

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
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

    /**
     * @function _getInformation
     * @description Метод получения информации о ЖК.
     * @returns {Promise<null | void>} промис с данными о ЖК.
     * @private
     */
    _getInformation() {
        return getHousingComplex()
        .then((data) => data)
        .catch ((error) => {
            console.warn(error);
        });
    }
}