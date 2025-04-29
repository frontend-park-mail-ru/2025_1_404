import Map from "../../../models/map";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import AddressInput from "../../../components/addressInput";
// import {YMapMarker} from "../../../lib/ymaps.ts";
import {DomEvent, DomEventHandlerObject} from "@yandex/ymaps3-types/imperative/YMapListener";
import MapUtil from "../../../util/mapUtil.ts";
import {YMapMarker} from "@yandex/ymaps3-types";

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @augments OfferPage
 */
export default class OfferCreateAddressPage extends OfferPage {
    private map?: Map;
    private house?: YMapMarker;
    private addressInput?: AddressInput;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});

        const coords: [number, number] = [37.313484, 55.557729];

        this.map = new Map({center: coords, id: 'offerCreateMap', zoom: 15});
        this.map.registerClickHandler(this.onMapClick.bind(this));
        this.house = this.map.addHouse({coords});

        this.getDataFromModel();
        if (this.offerData && Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }

        this.addressInput = new AddressInput({
            page: this,
            layout,
            id: 'input-address'
        });
    }

    /**
     * @function onMapClick
     * @description Метод обработки клика по карте.
     * @param {DomEventHandlerObject} object объект обработчика событий
     * @param {DomEvent} event событие клика
     */
    onMapClick(object: DomEventHandlerObject, event: DomEvent) {
        const coords = event.coordinates;
        this.layout?.setLoaderStatus(true);
        MapUtil.geocodeByCoords([coords[0], coords[1]]).then(async (data) => {
            if (data.length === 0) {
                return;
            }
            const address = data[0].GeoObject.name;
            const suggestions = await MapUtil.suggest(address);
            if (suggestions.length === 0) {
                return;
            }
            this.addressInput?.setAddress(suggestions[0]);
        }).finally(() => {
            this.layout?.setLoaderStatus(false);
        });
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
        this.initListener('offerCreateAddressForm', 'input', this.offerDataChange);
        this.initListener('input-address__input', 'input', this.offerDataChange);
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const offerCreateAddressInputs = document.getElementById('offerCreateAddressForm');
        if (offerCreateAddressInputs === null) {
            return;
        }
        const inputs = offerCreateAddressInputs.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = this.offerData[input.id] || '';

            if (input.id === 'input-address__input') {
                this.changeMap(input);
            }
        })

    }

    /**
     * @function offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @returns {Promise<void>} промис
     * @private
     */
    offerDataChange(event: Event) {
        const response = super.offerDataChange(event);
        if (response.result) {
            if (response.input.id === 'input-address__input') {
                this.changeMap(response.input);
            }
        }
        return response;
    }

    /**
     * @function changeMap
     * @description Метод изменения карты.
     * @param {HTMLInputElement} input инпут с адресом
     * @private
     */
    private changeMap(input: HTMLInputElement) {
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