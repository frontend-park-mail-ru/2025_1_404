
import HousingComplexInformation from "../../components/housingComplex/housingComplexInformation";
import HousingComplexReviews from "../../components/housingComplex/housingComplexReviews";
import HousingComplexSlider from "../../components/housingComplex/housingComplexSlider";
import Map from "../../models/map";
import {Page, PageRenderInterface} from "../page.ts";
import {getHousingComplex} from "../../util/apiUtil.ts";
import housingComplexInformationTemplate
    from "../../components/housingComplex/housingComplexInformation/template.precompiled.js";
import housingComplexSliderTemplate from "../../components/housingComplex/housingComplexSlider/template.precompiled.js";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import PageManager from "../../managers/pageManager.ts";


/**
 * @class HousingComplexPage
 * @description Страница ЖК
 * @augments Page
 */
export default class HousingComplexPage extends Page {
    private _slider: HousingComplexSlider | undefined;
    private _information: HousingComplexInformation | undefined;
    private _reviews: HousingComplexReviews | undefined;
    private _layout: BaseLayout | undefined;
    private map: Map | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     * @param {Record<string, unknown>} props параметры страницы
     */
    render({root, layout, props}: PageRenderInterface) {
        if (!props || typeof props.id !== 'number') {
            return;
        }
        this._layout = layout;
        root.innerHTML = template();
        super.render({root});
        this._getInformation(props.id)
        .then ((data) => {
            const housingComplexInformation = document.getElementById('housingComplexInformation');
            if (housingComplexInformation !== null) {
                housingComplexInformation.innerHTML = housingComplexInformationTemplate(data);
            }
            const housingComplexSlider = document.getElementById('housingComplexSlider');
            if (housingComplexSlider !== null) {
                housingComplexSlider.innerHTML = housingComplexSliderTemplate(data);
            }
            this._slider = new HousingComplexSlider({page: this, layout});
            this._information = new HousingComplexInformation({page: this, layout});
            this._reviews = new HousingComplexReviews({page: this, layout});

            const housePos: [number, number] = [55.557729, 37.313484];
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
     * @param {number} id id ЖК
     * @returns {Promise<unknown>} Промис с информацией о ЖК
     * @private
     */
    _getInformation(id: number) {
        if (!this._layout) {
            return Promise.reject(new Error('Layout is not defined'));
        }
        return this._layout?.makeRequest(getHousingComplex, id)
        .then((data) => data)
        .catch (() => {
            PageManager.renderPage('404');
            throw new Error('Error while getting housing complex information');
        });
    }
}