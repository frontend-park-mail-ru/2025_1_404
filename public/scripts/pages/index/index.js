'use strict'

import Page from '../page.js';
import template from "./index.precompiled.js";
import cardTemplate from "../../components/Card/Card.precompiled.js";
import {getOffers, login, logout} from "../../util/ApiUtil.js";
import {validateForm} from "../../util/ValidatorUtil.js";

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
    _logoutButton = null;
    _loginForm = null;

    /**
     * @method _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        window.routeManager.navigateTo('/register');
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

    _logoutButtonHandler() {
        logout().then(() => {
            window.currentUser = null;
            this.setHeaderStatus(false);
        })
    }

    _loginFormHandler(event) {
        event.preventDefault();
        const [isValid, data] = validateForm(event.target)
        const errorFields = event.target
            .getElementsByClassName('error');
        data.forEach((field, index) => {
            errorFields[index].textContent = field.error;
            if (field.error !== "")
                errorFields[index].classList.add('error__visible');
            else
                errorFields[index].classList.remove('error__visible');
        })

        if (isValid) {
            const values = data.map(field => field.value);
            login(...values).then((user) => {
                window.currentUser = user;
                this.setHeaderStatus(true);
                this._loginCloseButtonHandler();
            }).catch((error) => {
                console.error(error)
            })
        }
    }

    /**
     * @method _addCard
     * @description Добавление карточки
     * @param price цена объявления
     * @param address адрес
     * @param rooms количество комнат
     * @param floor этаж
     * @param square площадь
     * @param metro станция метро
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

    render(root) {
        root.innerHTML = template();
        this._registerButton = document.getElementById('registerButton');
        this._registerButton.addEventListener('click', () => this._registerButtonHandler());

        this._loginButton = document.getElementById('loginButton');
        this._loginButton.addEventListener('click', () => this._loginButtonHandler())

        this._logoutButton = document.getElementById('logoutButton');
        this._logoutButton.addEventListener('click', () => this._logoutButtonHandler())

        this._loginCloseButton = document.getElementById('loginCloseButton');
        this._loginCloseButton.addEventListener('click', () => this._loginCloseButtonHandler())

        this._loginForm = document.getElementById('login-form');
        this._loginForm.addEventListener('submit', (event) => this._loginFormHandler(event))

        this._cardsList = document.querySelector('.cards__list');
        this._getOffers();
    }

    destroy() {
        if (this._registerButton) {
            this._registerButton.removeEventListener('click', this._registerButtonHandler);
        }
        if (this._loginButton) {
            this._loginButton.removeEventListener('click', this._loginButtonHandler);
        }
        if (this._loginCloseButton) {
            this._loginCloseButton.removeEventListener('click', this._loginCloseButtonHandler);
        }
        if (this._logoutButton) {
            this._logoutButton.removeEventListener('click', this._logoutButtonHandler);
        }
        if (this._loginForm) {
            this._loginForm.removeEventListener('submit', this._loginFormHandler);
        }
    }
}