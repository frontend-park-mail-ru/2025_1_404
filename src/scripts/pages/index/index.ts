
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from '../page';
import User from "../../models/user.ts";
import cardTemplate from "../../components/card/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil";
import {getOffers} from "../../util/apiUtil.ts";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import Offer from "../../models/offer.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

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
        if (this._cardsList !== null) {
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
     * @private
     * @param offer
     */
    _addCard(offer: Offer) {
        if (!this._cardsList) {
            return;
        }
        let cardTitle = `${offer.price.toLocaleString('ru-RU')} ₽`;
        if (offer.offerType === 'Аренда') {
            cardTitle = 'Аренда: ' + cardTitle;
            cardTitle += `/${offer.rentType === 'Долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            cardTitle = 'Продажа: ' + cardTitle;
        }
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({id: offer.id, address: offer.address, cardTitle, floor: offer.floor, image: offer.images[0], metroColor: getMetroColorByLineName(offer.metroLine), metroStation: offer.metroStation || "Нет", rooms: offer.rooms, square: offer.area, totalFloors: offer.totalFloors}));
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
            if (!offers || !Array.isArray(offers)) {
                return;
            }
            Array.from(offers).forEach((offerData) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                this._addCard(offer);
            });
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
        event.preventDefault();
        let currentTarget = target as HTMLElement | null;
        if (!currentTarget) {
            return;
        }
        let parentElement = currentTarget;
        let heart = currentTarget;
        while (parentElement.parentElement !== null && !parentElement.classList.contains('card__link')) {
            if (parentElement.classList.contains('heart')) {
                heart = parentElement;
            }
            parentElement = parentElement.parentElement;
        }
        if (heart.classList.contains('heart')) {
            heart.classList.toggle('active');
            return;
        }
        if (parentElement.classList.contains('card__link')) {
            RouteManager.navigateTo(`/offer/details/${parentElement.dataset.id}`);
        }
    }
}