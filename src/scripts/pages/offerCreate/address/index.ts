
import Map from "../../../models/map";
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import {Marker} from "leaflet";

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @augments OfferPage
 */
export default class OfferCreateAddressPage extends OfferPage {
    private map: Map | undefined;
    private house: Marker | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});

        this._getDataFromModel();
        if (this._offerData && Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }

        const coords: [number, number] = [55.557729, 37.313484]; // TODO: replace to data from API

        this.map = new Map({center: coords, id: 'offerCreateMap', zoom: 15})
        this.house = this.map.addHouse({coords});
    }

    /**
     * @function changeHousePos
     * @description Метод изменения позиции дома на карте.
     * @param {[number, number]} coords координаты дома
     */
    changeHousePos(coords: [number, number]) {
        if (!this.map || !this.house) {
            return;
        }
        this.map.removePlacemark({placemark: this.house});
        this.house = this.map.addHouse({coords});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateAddressInputs', 'focusout', this._offerDataChange);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const offerCreateAddressInputs = document.getElementById('offerCreateAddressInputs');
        if (offerCreateAddressInputs === null) {
            return;
        }
        const inputs = offerCreateAddressInputs.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = this._offerData[input.id];
        })
    }

    /**
     * @function _isInputsFilled
     * @description Метод проверки заполненности инпутов.
     * @returns {boolean} true, если все инпуты заполнены, иначе false
     * @private
     */
    _isInputsFilled() {
        let isFilled = true;
        for (const key in this._offerData) {
            if (this._offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    /**
     * @function _offerDataChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @param {HTMLElement} target элемент, на который произошло событие
     * @private
     */
    _offerDataChange(event: Event, {target} = event) {
        event.preventDefault();

        const input = target as HTMLInputElement;

        if (input.tagName !== 'INPUT') {
            return;
        }

        if (input.id === 'input-address' && this.map) {
            this.map.geoCode(input.value).then(() => {
                if (this.map) {
                    this.changeHousePos(this.map.getCenter());
                }
            });
        }

        this._offerData[input.id] = input.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}