'use strict';

import BaseComponent from "../baseComponent.js";
import MainLayout from "../../layouts/main/index.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";
import {validateFormInput} from "../../util/validatorUtil.js";

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @extends BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    constructor() {
        super({});
        this._mainLayout = new MainLayout();
        this._profileAvatar = "";
        const saveButton = document.getElementById('profileDataSave');
        saveButton.classList.remove('active');
    }

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

    _addAvatar(source) {
        const profileAvatar = document.getElementById('profileAvatar');
        profileAvatar.firstElementChild.setAttribute('src', source);
    }

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

    _profileDataHandler(event) {
        event.preventDefault();

        // const apiError = document.getElementById('api-error');
        // apiError.classList.remove('error__visible');

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

        // this.profileAvatar;
        // User.update(values).then(() => {
        //     RouteManager.navigateTo('/');
        // }).catch((error) => {
        //     apiError.textContent = error.message;
        //     apiError.classList.add('error__visible');
        // }).finally(() => {
        //     profileDataSaveButton.disabled = false;
        // })
    }

    _profileDataInputHandler(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        const saveButton = document.getElementById('profileDataSave');
        if (target.value !== "") { // TODO Сравнение со старыми данными из базы
            saveButton.classList.add('active');
        } else {
            saveButton.classList.remove('active');
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

    _chooseAvatarClickHandler() {
        document.getElementById('profileAvatarInput').click();
    }

    _getAvatarAfterChooseClickHandler(event) {
        const file = event.target.files[0];
        console.log(file);
        this._uploadAvatar(file);
    }

    setActiveProfileTab(activeProfileTabIndex) {
        document.getElementsByClassName('profile__left-nav-btn')[activeProfileTabIndex].classList.add('active');
    }

    /**
     * @method _mainPageButtonHandler
     * @description Обработчик события перехода на главную страницу профиля
     * @private
     */
    _mainPageButtonHandler() {
        RouteManager.navigateTo('/profile');
    }

    /**
     * @method _offerCreatePageButtonHandler
     * @description Обработчик события перехода на страницу создания объявления
     * @private
     */
    _offerCreatePageButtonHandler() {
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @method _myOffersButtonHandler
     * @description Обработчик события перехода на страницу "мои объявления"
     * @private
     */
    _myOffersButtonHandler() {
        RouteManager.navigateTo('/profile/offers');
    }

    /**
     * @method _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта на странице профиля
     * @private
     */
    _logoutButtonHandler() {
        User.logout().finally(() => {
            this._mainLayout.setHeaderStatus(false);
        });
    }
}