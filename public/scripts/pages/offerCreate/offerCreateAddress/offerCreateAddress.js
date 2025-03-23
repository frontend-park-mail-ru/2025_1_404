'use strict'

import OfferCreateNav from "../../../components/OfferCreateNav/OfferCreateNav.js";
import Page from '../../page.js';
import template from "./offerCreateAddress.precompiled.js";
import OfferCreateBtns from "../../../components/OfferCreateBtns/OfferCreateBtns.js";
//import { YMap, YMapDefaultSchemeLayer } from '../../ymaps.js'

/**
 * @class OfferCreateAddressPage
 * @description Страница создания объявления с выбором адреса
 * @extends Page
 */
export default class OfferCreateAddressPage extends Page {
    render({root}) {
        root.innerHTML = template();

        //this.initMap()

        super.render(root);
    }

    async initMap() {
        // Иницилиазируем карту
        const map = new YMap(
            // Передаём ссылку на HTMLElement контейнера
            document.getElementById('map'),

            // Передаём параметры инициализации карты
            {
                location: {
                    // Координаты центра карты
                    center: [37.588144, 55.733842],

                    // Уровень масштабирования
                    zoom: 10
                }
            }
        );

        // Добавляем слой для отображения схематической карты
        map.addChild(new YMapDefaultSchemeLayer());
    }

    destroy() {
        super.destroy();
    }
}