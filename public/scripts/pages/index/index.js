'use strict'

import Page from '../page.js';
import cardTemplate from "../../components/Card/Card.precompiled.js";
import {getOffers} from "../../util/ApiUtil.js";
import metroColours from "../../../resources/img/metroColours/metroColours.js";
import template from "./index.precompiled.js";

/**
 * @class IndexPage
 * @description Главная страница
 * @extends Page
 */
export default class IndexPage extends Page {
    _metroColor = metroColours;

    render({root}) {
        root.innerHTML = template();

        this._cardsList = document.querySelector('.cards__list');
        this._cardClickHandler = this._cardClickHandler.bind(this);
        this._cardsList.addEventListener('click', this._cardClickHandler);

        this._getOffers();

        super.render(root);
    }

    destroy() {
        if (this._cardsList) {
            this._cardsList.removeEventListener('click', this._cardClickHandler);
        }
        super.destroy();
    }

    /**
     * @method _addCard
     * @description Добавление карточки
     * @param price цена объявления
     * @param address адрес
     * @param rooms количество комнат
     * @param floor этаж
     * @param totalFloors максимальное число этажей
     * @param square площадь
     * @param metro станция метро
     * @param images картинки объявления
     * @param metroStation стацния метро
     * @param metroLine ветка метро
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
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({address, cardTitle, floor, image, metroColor: this._metroColor[metroLine],   metroStation, rooms, square,  totalFloors}));
    }

    /**
     * @method _getOffers
     * @description Получение предложений
     * @private
     */
    _getOffers() {
        getOffers().then((offers) => {
            for (const offer of offers) {
                this._addCard(offer);
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    /**
     * @method _cardClickHandler
     * @description Обработчик события клика на карточку
     * @param event
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