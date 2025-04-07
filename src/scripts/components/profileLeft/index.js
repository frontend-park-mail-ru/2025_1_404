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
        if (!User.isLoaded() || !User.isAuthenticated()) {
            return;
        }
        this.previousData = User.getData();
        this.currentData = User.getData();
        this.fillWithUserData();
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
        this.initListener('profileAvatarUpload', 'click', this._processAvatarHandler);
        this.initListener('profileAvatarInput', 'change', this._getAvatarAfterChooseClickHandler);
        this.initListener('profileData', 'submit', this._profileDataHandler);
        this.initListener('profileData', 'focusout', this._profileDataInputHandler);
    }

    /**
     * @function fillWithUserData
     * @description Метод заполнения формы данными пользователя.
     */
    fillWithUserData() {
        const userData = User.getData();
        document.getElementById('profileFirstName').value = userData.firstName;
        document.getElementById('profileLastName').value = userData.lastName;
        document.getElementById('profileEmail').value = userData.email;
        this._addAvatar(userData.avatar);
    }

    /**
     * @function isDataChanged
     * @description Метод проверки изменения данных пользователя.
     * @returns {boolean} true, если данные изменены, иначе false.
     */
    isDataChanged() {
        for (const key of Object.keys(this.currentData)) {
            console.log(this.currentData[key], this.previousData[key]);
            if (this.currentData[key] !== this.previousData[key]) {
                return true;
            }
        }
        return false;
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
     * @function _removeAvatarHandler
     * @description Метод удаления аватара из профиля.
     * @private
     */
    _removeAvatarHandler() {
        // TODO
        console.log('123')
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

                const apiError = document.getElementById('profile-api-error');
                apiError.classList.remove('error__visible');
                apiError.textContent = '';

                User.updateAvatar({avatar: file}).then(() => {
                    RouteManager.navigateToPageByCurrentURL();
                }).catch((err) => {
                    apiError.classList.add('error__visible');
                    apiError.textContent = err.message;
                })
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

        const apiError = document.getElementById('profile-api-error');

        const profileDataSaveButton = event.target.querySelector('#profileDataSave');
        profileDataSaveButton.disabled = true;

        let isValid = true;
        const inputFields = event.target
            .querySelectorAll('input');
        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, true);
            const errorField = input.nextElementSibling;
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

        this.layout.makeRequest(User.updateProfile.bind(User), {
            first_name: this.currentData.firstName,
            last_name: this.currentData.lastName,
            email: this.currentData.email
        }).then(() => {
            RouteManager.navigateToPageByCurrentURL();
        }).catch((err) => {
            apiError.classList.add('error__visible');
            apiError.textContent = err.message;
        })
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

        this.currentData[target.name] = target.value;
        const saveButton = document.getElementById('profileDataSave');
        saveButton.disabled = !this.isDataChanged()

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
     * @function _processAvatarHandler
     * @description Метод обработки событий, связанных с аватаром профиля.
     * @param {Event} event событие, инициировавшее обработку
     * @private
     */
    _processAvatarHandler(event) {
        switch (event.target.id) {
            case 'profileAvatarUpload': {
                this._chooseAvatarClickHandler(event);
                break;
            }
            case 'profileAvatarRemove': {
                this._removeAvatarHandler();
                break;
            }
            default: {
                break;
            }
        }
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