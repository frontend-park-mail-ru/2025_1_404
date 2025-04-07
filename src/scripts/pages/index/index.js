'use strict'

import Filter from "../../components/filter/index.js";
import Page from '../page.js';
import User from "../../models/user.js";
import cardTemplate from "../../components/card/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil.js";
import {getOffers} from "../../util/apiUtil.js";
import template from "./template.precompiled.js";

/**
 * @class IndexPage
 * @description Главная страница
 * @augments Page
 */
export default class IndexPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}) {
        root.innerHTML = template();
        this._layout = layout;

        this._cardsList = document.querySelector('.cards__list');
        this._cardClickHandler = this._cardClickHandler.bind(this);
        this._cardsList.addEventListener('click', this._cardClickHandler);

        this._filter = new Filter();

        this._getOffers();

        super.render(root);
    }

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        if (this._cardsList) {
            this._cardsList.removeEventListener('click', this._cardClickHandler);
        }
        if (this._filter) {
            this._filter.destroy();
        }
        super.destroy();
    }

    /**
     * @function _addCard
     * @description Добавление карточки
     * @param {number} price цена объявления
     * @param {string} address адрес
     * @param {number} rooms количество комнат
     * @param {number} floor этаж
     * @param {number} totalFloors максимальное число этажей
     * @param {number} square площадь
     * @param {string[]} images изображения
     * @param {string} metroStation стацния метро
     * @param {string} metroLine ветка метро
     * @param {string} offerType тип объявления
     * @param {string} rentType тип аренды
     * @private
     */
    _addCard({price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, photos: images, offer_type: offerType, rent_type: rentType}) {
        let cardTitle = `${price.toLocaleString('ru-RU')} ₽`;
        if (offerType === 'аренда') {
            cardTitle = 'Аренда: ' + cardTitle;
            cardTitle += `/${rentType === 'долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            cardTitle = 'Продажа: ' + cardTitle;
        }
        const [image] = images
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({address, cardTitle, floor, image, metroColor: getMetroColorByLineName([metroLine]), metroStation, rooms, square, totalFloors}));
    }

    /**
     * @function _getOffers
     * @description Получение предложений
     * @private
     */
    _getOffers() {
        if (!User.isLoaded()) {
            return;
        }
        this._layout.makeRequest(getOffers).then((offers) => {
            for (const offer of offers) {
                this._addCard(offer);
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    /**
     * @function _cardClickHandler
     * @description Обработчик события клика на карточку
     * @param {Event} event событие клика
     * @param {HTMLElement} target элемент, на который кликнули
     * @private
     */
    _cardClickHandler(event, {target} = event) {
        let currentTarget = target;
        while (currentTarget.tagName === 'path' || currentTarget.tagName === 'I') {
            currentTarget = currentTarget.parentElement;
        }
        if (currentTarget.classList.contains('heart')) {
            event.preventDefault();
            currentTarget.classList.toggle('active');
        }
    }
}