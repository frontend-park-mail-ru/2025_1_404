'use strict'

import Page from '../page.js';
import template from "./index.precompiled.js";
import cardTemplate from "../../components/Card/Card.precompiled.js";
import {getOffers} from "../../util/ApiUtil.js";

/**
 * @class IndexPage
 * @description Страница входа
 * @extends Page
 */
export default class IndexPage extends Page {
    _registerButton = null;
    _loginButton = null;
    _loginCloseButton = null;
    _cardsList = null;

    /**
     * @method _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        routeManager.navigateTo('/register');
    }

    /**
     * @method _loginButtonHandler
     * @description Обработчик события открытия окна входа
     * @private
     */
    _loginButtonHandler() {
        document.querySelector(".login").classList.add('active');
        document.querySelector(".overlay").classList.add('active');
    }

    /**
     * @method _loginCloseButtonHandler
     * @description Обработчик события закрытия окна входа
     * @private
     */
    _loginCloseButtonHandler() {
        document.querySelector(".login").classList.remove('active');
        document.querySelector(".overlay").classList.remove('active');
    }

    /**
     * @method _addCard
     * @description Добавление карточки
     * @param price
     * @param address
     * @param rooms
     * @param floor
     * @param square
     * @param metro
     * @private
     */
    _addCard({price, address, rooms, floor, area: square, metro}) {
        price = 52000;
        metro = 'Славянский бульвар';
        floor = `${floor}/${floor}`;
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({price, address, rooms, floor, square, metro}));
    }

    /**
     * @method _getOffers
     * @description Получение предложений
     * @private
     */
    _getOffers() {
        getOffers().then((offers) => {
            for (let offer of offers) {
                this._addCard(offer);
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    render(root, path) {
        root.innerHTML = template();
        this._registerButton = document.getElementById('registerButton');
        this._registerButton.addEventListener('click', () => this._registerButtonHandler());

        this._loginButton = document.getElementById('loginButton');
        this._loginButton.addEventListener('click', () => this._loginButtonHandler())

        this._loginCloseButton = document.getElementById('loginCloseButton');
        this._loginCloseButton.addEventListener('click', () => this._loginCloseButtonHandler())

        this._cardsList = document.querySelector('.cards__list');
        this._getOffers();
    }

    destroy() {
        if (this._loginButton) {
            this._loginButton.removeEventListener('click', this._loginButtonHandler);
        }
        if (this._loginCloseButton) {
            this._loginCloseButton.removeEventListener('click', this._loginCloseButtonHandler);
        }
    }
}