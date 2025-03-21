'use strict'

import Page from '../page.js';
import cardTemplate from "../../components/Card/Card.precompiled.js";
import {getOffers} from "../../util/ApiUtil.js";
import template from "./index.precompiled.js";

/**
 * @class IndexPage
 * @description Главная страница
 * @extends Page
 */
export default class IndexPage extends Page {
    _metroColor = {
        'Арбатско-Покровская': '#0033A0',
        'Большая кольцевая': '#82C0C0',
        'Бутовская': '#A1A2A3',
        'Замоскворецкая': '#007D3C',
        'Калининская': '#FFD702',
        'Калужско-Рижская': '#FFA300',
        'Каховская': '#A1A2A3',
        'Кольцевая': '#894E35',
        'Люблинско-Дмитровская': '#9EC862',
        'МЦД-2': '#0078BE',
        'МЦД-3': '#DEA62C',
        'МЦД-4': '#AD1D33',
        'МЦД-5': '#ADB3B8',
        'МЦК': '#FF8642',
        'Некрасовская': '#DE64A1',
        'Нет': '#999999',
        'Рублёво-Архангельская': '#78C596',
        'Серпуховско-Тимирязевская': '#A1A2A3',
        'Сокольническая': '#EF161E',
        'Таганско-Краснопресненская': '#97005E',
        'Троицкая': '#009A49',
        'Филёвская': '#0078BE',
    };

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