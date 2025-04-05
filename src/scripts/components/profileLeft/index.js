'use strict';

import BaseComponent from "../baseComponent.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";
import {validateFormInput} from "../../util/validatorUtil.js";

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @augments BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}) {
        super({page, layout});
        this._profileAvatar = "";
        const saveButton = document.getElementById('profileDataSave');
        saveButton.classList.remove('active');
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('profileMainButton', 'click', this._mainPageButtonHandler);
        this.initListener('offerCreateButton', 'click', this._offerCreatePageButtonHandler);
        this.initListener('profileMyOffersButton', 'click', this._myOffersButtonHandler);
        this.initListener('profileLogoutButton', 'click', this._logoutButtonHandler);
        this.initListener('profileAvatar', 'click', this._chooseAvatarClickHandler);
        this.initListener('profileAvatarInput', 'change', this._getAvatarAfterChooseClickHandler);
        this.initListener('profileData', 'submit', this._profileDataHandler);
        this.initListener('profileData', 'focusout', this._profileDataInputHandler);
    }

    /**
     * @function _addAvatar
     * @description Метод добавления аватара в профиль.
     * @param {string} source источник изображения аватара.
     * @private
     */
    _addAvatar(source) {
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.firstElementChild.setAttribute('src', source);
    }

    /**
     * @function _uploadAvatar
     * @description Метод загрузки аватара.
     * @param {File} file файл аватара.
     * @private
     */
    _uploadAvatar(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const source = event.target.result.toString();
                this._addAvatar(source);
                this._profileAvatar = source;
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * @function _profileDataHandler
     * @description Обработчик события отправки формы данных профиля.
     * @param {Event} event событие отправки формы
     * @private
     */
    _profileDataHandler(event) {
        event.preventDefault();

        const profileDataSaveButton = event.target.querySelector('#profileDataSave');
        profileDataSaveButton.disabled = true;

        let isValid = true;
        const inputFields = event.target
            .querySelectorAll('input');
        console.log(inputFields);
        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, true);
            console.log(errorText);
            const errorField = input.nextElementSibling;
            console.log(errorField)
            if (errorText !== "") {
                isValid = false;
                input.classList.add('input__invalid');
                errorField.classList.add('error__visible');
                errorField.textContent = errorText;
            }
        })

        if (!isValid) {
            profileDataSaveButton.disabled = false;
            return;
        }

        const values = Array.from(inputFields).reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {});
        console.log(values);
        profileDataSaveButton.disabled = false;
    }

    /**
     * @function _profileDataInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @param {HTMLElement} target элемент, на который кликнули
     * @private
     */
    _profileDataInputHandler(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        const saveButton = document.getElementById('profileDataSave');
        if (target.value === "") { // TODO Сравнение со старыми данными из базы
            saveButton.classList.remove('active');
        } else {
            saveButton.classList.add('active');
        }

        const errorText = validateFormInput(target, true);
        const errorField = target.nextElementSibling;
        if (errorText === "") {
            target.classList.remove('input__invalid');
            errorField.classList.remove('error__visible');
            errorField.textContent = errorText;
            return;
        }
        target.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
    }

    /**
     * @function _chooseAvatarClickHandler
     * @description Обработчик события клика по аватару профиля.
     * @private
     */
    _chooseAvatarClickHandler() {
        document.getElementById('profileAvatarInput').click();
    }

    /**
     * @function _getAvatarAfterChooseClickHandler
     * @description Обработчик события выбора аватара.
     * @param {Event} event событие выбора файла
     * @private
     */
    _getAvatarAfterChooseClickHandler(event) {
        const [file] = event.target.files;
        console.log(file);
        this._uploadAvatar(file);
    }

    /**
     * @function setActiveProfileTab
     * @description Метод установки активной вкладки профиля.
     * @param {number} activeProfileTabIndex индекс активной вкладки профиля.
     */
    setActiveProfileTab(activeProfileTabIndex) {
        document.getElementsByClassName('profile__left-nav-btn')[activeProfileTabIndex].classList.add('active');
    }

    /**
     * @function _mainPageButtonHandler
     * @description Обработчик события перехода на главную страницу профиля
     * @private
     */
    _mainPageButtonHandler() {
        RouteManager.navigateTo('/profile');
    }

    /**
     * @function _offerCreatePageButtonHandler
     * @description Обработчик события перехода на страницу создания объявления
     * @private
     */
    _offerCreatePageButtonHandler() {
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @function _myOffersButtonHandler
     * @description Обработчик события перехода на страницу "мои объявления"
     * @private
     */
    _myOffersButtonHandler() {
        RouteManager.navigateTo('/profile/offers');
    }

    /**
     * @function _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта на странице профиля
     * @private
     */
    _logoutButtonHandler() {
        this.layout.makeRequest(User.logout.bind(User)).finally(() => {
            this.layout.emit('logout');
        });
    }
}