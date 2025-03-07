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
    _loginFormRegisterButton = null;

    _metroColor = {
        'Сокольническая': '#EF161E',
        'Замоскворецкая': '#007D3C',
        'Арбатско-Покровская': '#0033A0',
        'Филёвская': '#0078BE',
        'Кольцевая': '#894E35',
        'Калужско-Рижская': '#FFA300',
        'Таганско-Краснопресненская': '#97005E',
        'Калининская': '#FFD702',
        'Серпуховско-Тимирязевская': '#A1A2A3',
        'Люблинско-Дмитровская': '#9EC862',
        'Каховская': '#A1A2A3',
        'Бутовская': '#A1A2A3',
        'МЦК': '#FF8642',
        'Некрасовская': '#DE64A1',
        'Большая кольцевая': '#82C0C0',
        'Троицкая': '#009A49',
        'Рублёво-Архангельская': '#78C596',
        'МЦД-2': '#0078BE',
        'МЦД-3': '#DEA62C',
        'МЦД-4': '#AD1D33',
        'МЦД-5': '#ADB3B8',
        'Нет': '#999999'
    };

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
            const values = data.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {});
            login(values).then((user) => {
                window.currentUser = user;
                this.setHeaderStatus(true);
                this._loginCloseButtonHandler();
                let apiError = document.getElementById('api-error');
                apiError.classList.remove('error__visible');
            }).catch((error) => {
                let apiError = document.getElementById('api-error');
                apiError.textContent = error.message;
                apiError.classList.add('error__visible');
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
     * @param totalFloors максимальное число этажей
     * @param square площадь
     * @param metro станция метро
     * @param images картинки объявления
     * @param metroStation стацния метро
     * @param metroLine ветка метро
     * @private
     */
    _addCard({price, address, rooms, floor, total_floors: totalFloors, area: square, metro_station: metroStation, metro_line: metroLine, photos: images, offer_type: offerType, rent_type: rentType}) {
        let cardTitle = `${price} ₽`;
        if (offerType === 'аренда') {
            cardTitle = 'Аренда: ' + cardTitle;
            cardTitle += `/${rentType === 'долгосрок' ? 'мес.' : 'сут.'}`
        }
        else {
            cardTitle = 'Продажа: ' + cardTitle;
        }
        this._cardsList.insertAdjacentHTML('beforeend', cardTemplate({cardTitle, address, rooms, floor, totalFloors, square, metroColor: this._metroColor[metroLine], metroStation, image: images[0]}));
    }

    _loginFormRegisterButtonHandler() {
        window.routeManager.navigateTo('/register');
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

    _overlayHandler(event) {
        if (event.target === this._overlay) {
            this._loginCloseButtonHandler();
        }
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

        this._loginFormRegisterButton = document.getElementById('registerHrefButton');
        this._loginFormRegisterButton.addEventListener('click', () => this._loginFormRegisterButtonHandler())

        this._loginForm = document.getElementById('login-form');
        this._loginForm.addEventListener('submit', (event) => this._loginFormHandler(event))

        this._overlay = document.getElementsByClassName('overlay')[0];
        this._overlay.addEventListener('click', (event) => this._overlayHandler(event))

        this._cardsList = document.querySelector('.cards__list');
        this._getOffers();

        super.render(root);
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
        if (this._loginFormRegisterButton) {
            this._loginFormRegisterButton.removeEventListener('click', this._loginFormRegisterButtonHandler);
        }
        if (this._overlay) {
            this._overlay.removeEventListener('click', this._loginCloseButtonHandler);
        }

        super.destroy();
    }
}