
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from '../page';
import User from "../../models/user.ts";
import cardTemplate from "../../components/card/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil";
import {getOffers} from "../../util/apiUtil.ts";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";

/**
 * @interface AddCardInterface
 * @description Интерфейс для описания структуры объекта недвижимости, который добавляется на главную страницу.
 */
interface AddCardInterface {
    /**
     * @property {string} address Адрес объекта недвижимости
     */
    price: number;
    /**
     * @property {string} address Адрес объекта недвижимости
     */
    address: string;
    /**
     * @property {number} rooms Количество комнат
     */
    rooms: number;
    /**
     * @property {number} floor Этаж
     */
    floor: number;
    /**
     * @property {number} totalFloors Максимальное количество этажей в здании
     */
    total_floors: number;
    /**
     * @property {number} area Площадь объекта недвижимости
     */
    area: number;
    /**
     * @property {string[]} photos Список URL изображений объекта недвижимости
     */
    photos: string[];
    /**
     * @property {string} metro_station Станция метро
     */
    metro_station: string;
    /**
     * @property {string} metro_line Ветка метро
     */
    metro_line: string;
    /**
     * @property {string} offer_type Тип предложения (например, "аренда" или "продажа")
     */
    offer_type: string;
    /**
     * @property {string} rent_type Тип аренды (например, "долгосрок" или "сутки"), используется только для аренды
     */
    rent_type: string;
}

/**
 * @class IndexPage
 * @description Главная страница
 * @augments Page
 */
export default class IndexPage extends Page {
    private _layout: BaseLayout | undefined;
    private _cardsList: Element | null | undefined;
    private _filter: Filter | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        this._layout = layout;

        this._cardsList = document.querySelector('.cards__list');
        if (this._cardsList != null) {
            this._cardClickHandler = this._cardClickHandler.bind(this);
            this._cardsList.addEventListener('click', this._cardClickHandler);
        }
        
        this._filter = new Filter({page: this, layout});

        this._getOffers();

        super.render({root, layout});
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
    _addCard({price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, photos: images, offer_type: offerType, rent_type: rentType}: AddCardInterface) {
        if (!this._cardsList) {
            return;
        }
        let cardTitle = `${price.toLocaleString('ru-RU')} ₽`;
        if (offerType === 'аренда') {
            cardTitle = 'Аренда: ' + cardTitle;
            cardTitle += `/${rentType === 'долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            cardTitle = 'Продажа: ' + cardTitle;
        }
        const [image] = images
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({address, cardTitle, floor, image, metroColor: getMetroColorByLineName(metroLine), metroStation, rooms, square, totalFloors}));
    }

    /**
     * @function _getOffers
     * @description Получение предложений
     * @private
     */
    _getOffers() {
        if (!User.isLoaded() || !this._layout) {
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
    _cardClickHandler(event: Event, {target} = event) {
        let currentTarget = target as HTMLElement | null;
        if (currentTarget === null) {
            return;
        }
        while (currentTarget.parentElement !== null && (currentTarget.tagName === 'path' || currentTarget.tagName === 'I')) {
            currentTarget = currentTarget.parentElement;
        }
        if (currentTarget.classList.contains('heart')) {
            event.preventDefault();
            currentTarget.classList.toggle('active');
        }
    }
}