
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
import MapUtil from "../../util/mapUtil.ts";


/**
 * @class HousingComplexPage
 * @description Страница ЖК
 * @augments Page
 */
export default class HousingComplexPage extends Page {
    private slider: HousingComplexSlider | undefined;
    private information: HousingComplexInformation | undefined;
    private reviews: HousingComplexReviews | undefined;
    private layout: BaseLayout | undefined;
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
        this.layout = layout;
        root.innerHTML = template();
        super.render({root});
        this.getInformation(props.id)
        .then ((data) => {
            const housingComplexInformation = document.getElementById('housingComplexInformation');
            if (housingComplexInformation !== null) {
                housingComplexInformation.innerHTML = housingComplexInformationTemplate(data);
            }
            const housingComplexSlider = document.getElementById('housingComplexSlider');
            if (housingComplexSlider !== null) {
                housingComplexSlider.innerHTML = housingComplexSliderTemplate(data);
            }
            this.slider = new HousingComplexSlider({page: this, layout});
            console.log(data);
            this.information = new HousingComplexInformation({page: this, layout, phone: data.contacts.phone});
            this.reviews = new HousingComplexReviews({page: this, layout});

            let coords: [number, number] = [55.557729, 37.313484];
            this.map = new Map({center: coords, id: 'housingComplexMap', zoom: 15});
            this.map.geoCode(data.address.address).then(() => {
                if (this.map) {
                    coords = this.map.getCenter();
                    this.map.addHouse({coords});
                }
            });
        })
        
    }

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        if (this.slider) {
            this.slider.destroy();
        }
        if (this.information) {
            this.information.destroy();
        }
        if (this.reviews) {
            this.reviews.destroy();
        }

        super.destroy();
    }

    /**
     * @function getInformation
     * @description Метод получения информации о ЖК.
     * @param {number} id id ЖК
     * @returns {Promise<unknown>} Промис с информацией о ЖК
     * @private
     */
    private getInformation(id: number) {
        if (!this.layout) {
            return Promise.reject(new Error('Layout is not defined'));
        }
        return this.layout?.makeRequest(getHousingComplex, id)
        .then((data) => data)
        .catch (() => {
            PageManager.renderPage('404');
            throw new Error('Error while getting housing complex information');
        });
    }
}