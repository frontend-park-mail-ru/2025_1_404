import Filter from "../../components/filter";
import {Page, PageRenderInterface} from '../page';
import User from "../../models/user.ts";
import cardTemplate from "../../components/card/template.precompiled.js";
import getMetroColorByLineName from "../../util/metroUtil";
import {favourite, getOffers} from "../../util/apiUtil.ts";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import Offer from "../../models/offer.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import {CSATType} from "../../components/csat";

/**
 * @class IndexPage
 * @description Главная страница
 * @augments Page
 */
export default class IndexPage extends Page {
    private layout: BaseLayout | undefined;
    private cardsList: Element | null | undefined;
    private filter: Filter | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        this.layout = layout;

        this.cardsList = document.querySelector('.cards__list');
        if (this.cardsList !== null) {
            this.cardClickHandler = this.cardClickHandler.bind(this);
            this.cardsList.addEventListener('click', this.cardClickHandler);
        }
        
        this.filter = new Filter({page: this, layout});

        this.getOffers();

        this.layout?.processCSAT({
            type: CSATType.STARS,
            event: 'createOffer'
        })

        super.render({root, layout});
    }

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        if (this.cardsList) {
            this.cardsList.removeEventListener('click', this.cardClickHandler);
        }
        if (this.filter) {
            this.filter.destroy();
        }
        super.destroy();
    }

    /**
     * @function addCard
     * @description Добавление карточки
     * @param {Offer} offer - предложение
     * @private
     */
    private addCard(offer: Offer) {
        if (!this.cardsList) {
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
        this.cardsList.insertAdjacentHTML('beforeend', cardTemplate({id: offer.id, address: offer.address, cardTitle, floor: offer.floor, image: offer.images[0], metroColor: getMetroColorByLineName(offer.metroLine), metroStation: offer.metroStation || "Нет", rooms: offer.rooms, square: offer.area, totalFloors: offer.totalFloors, favorite: offer.favorite}));
    }

    /**
     * @function getOffers
     * @description Получение предложений
     * @private
     */
    private getOffers() {
        if (!User.isLoaded() || !this.layout) {
            return;
        }
        this.layout.makeRequest(getOffers).then((offers) => {
            if (!offers || !Array.isArray(offers)) {
                return;
            }
            if (this.cardsList) {
                this.cardsList.innerHTML = '';
            }
            Array.from(offers).forEach((offerData) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                this.addCard(offer);
            });
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }

    /**
     * @function cardClickHandler
     * @description Обработчик события клика на карточку
     * @param {Event} event событие клика
     * @param {HTMLElement} target элемент, на который кликнули
     * @private
     */
    private cardClickHandler(event: Event, {target} = event) {
        event.preventDefault();
        const currentTarget = target as HTMLElement | null;
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
        if (!parentElement.classList.contains('card__link')) {
            return;
        }
        if (heart.classList.contains('heart')) {
            if (!User.isAuthenticated()) {
                this.layout?.emit('showLogin');
                return;
            }
            this.layout?.makeRequest(favourite, Number(parentElement.dataset.id)).then((data) => {
                const status = data.status;
                heart.classList.remove('active');
                if (status) {
                    heart.classList.add('active');
                }
            });
            return;
        }
        RouteManager.navigateTo(`/offer/details/${parentElement.dataset.id}`);
    }
}