import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";
import {evaluateOffer} from "../../../util/apiUtil.ts";
import Offer from "../../../models/offer.ts";
import OfferCreate from "../../../models/offerCreate.ts";
import User from "../../../models/user.ts";

/**
 * @class OfferEditPricePage
 * @description Страница редактирования объявления с выбором цены
 * @augments OfferPage
 */
export default class OfferEditPricePage extends OfferPage {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});

        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }

        this.evaluateOffer();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('input-price', 'input', this.offerDataChange);
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const input = document
            .getElementById('input-price') as HTMLInputElement
        input.value = this.offerData[input.id] || '';
    }

    evaluateOffer() {
        if (!User.isLoaded()) {
            return;
        }

        const offer = new Offer();
        offer.parseOfferData(OfferCreate.getOfferData(), {});

        this.layout?.setLoaderStatus(true);
        this.layout?.makeRequest(evaluateOffer, {
            offerType: offer.offerType,
            metroStation: offer.metroStation,
            rentType: offer.rentType,
            purchaseType: offer.purchaseType,
            propertyType: offer.propertyType,
            renovation: offer.renovation,
            complex: "",
            area: offer.area,
            floor: offer.floor,
            totalFloors: offer.totalFloors,
            rooms: Number(offer.rooms),
            ceilingHeight: offer.ceilingHeight,
            address: offer.address,
        }).then((response) => {
            const marketPrice = document.getElementById('offerCreate-market-price') as HTMLElement;
            const marketSquarePrice = document.getElementById('offerCreate-market-price-square') as HTMLElement;
            const priceRange = document.getElementById('offerCreate-price-range') as HTMLElement;
            if (!marketPrice || !marketSquarePrice || !priceRange) {
                return;
            }
            marketPrice.innerText = `${Math.floor(response.market_price.total).toLocaleString('ru-RU')} ₽`;
            marketSquarePrice.innerText = `${Math.floor(response.market_price.per_square_meter).toLocaleString('ru-RU')} ₽/м²`;
            priceRange.innerText = `${Math.floor(response.possible_cost_range.min).toLocaleString('ru-RU')} - ${Math.floor(response.possible_cost_range.max).toLocaleString('ru-RU')} ₽`;
        }).finally(() => {
            this.layout?.setLoaderStatus(false);
        })
    }
}