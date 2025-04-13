
import Map from "../../../models/map";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import {Marker} from "leaflet";

/**
 * @class OfferEditAddressPage
 * @description Страница режактирования объявления с выбором адреса
 * @augments OfferPage
 */
export default class OfferEditAddressPage extends OfferPage {
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

        const coords: [number, number] = [55.557729, 37.313484]; // TODO: replace to data from API

        this.map = new Map({center: coords, id: 'offerCreateMap', zoom: 15})
        this.house = this.map.addHouse({coords});

        this._getDataFromModel();
        if (this._offerData && Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }
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
        this.initListener('offerCreateAddressForm', 'change', this._offerDataChange);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const offerCreateAddressInputs = document.getElementById('offerCreateAddressForm');
        if (offerCreateAddressInputs === null) {
            return;
        }
        const inputs = offerCreateAddressInputs.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = this._offerData[input.id] || '';

            if (input.id === 'input-address') {
                this._changeMap(input);
            }
        })

    }

    /**
     * @function _offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @returns {Promise<void>} промис
     * @private
     */
    _offerDataChange(event: Event) {
        const response = super._offerDataChange(event);
        if (response.result) {
            if (response.input.id === 'input-address') {
                this._changeMap(response.input);
            }
        }
        return response;
    }

    /**
     * @function _changeMap
     * @description Метод изменения карты.
     * @param {HTMLInputElement} input инпут с адресом
     */
    _changeMap(input: HTMLInputElement) {
        if (this.map) {
            this.map.geoCode(input.value).then(() => {
                if (this.map) {
                    const coords = this.map.getCenter();
                    this.changeHousePos(coords);
                }
            });
        }
    }
}