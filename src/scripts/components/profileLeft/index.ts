import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import {default as User, UserDataInterface} from "../../models/user.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import {validateFormInput} from "../../util/validatorUtil.ts";
import OfferCreate from "../../models/offerCreate.ts";
import OfferCreateLayout from "../../layouts/offerCreate/index.ts"

interface ProfileInterface extends Record<string, string> {
    first_name: string;
    last_name: string;
    email: string;
}

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @augments BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    private previousData: UserDataInterface | null = null;
    private currentData: UserDataInterface | null = null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
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
        if (!userData) {
            return;
        }
        const profileFirstName = document.getElementById('profileFirstName') as HTMLInputElement;
        if (profileFirstName) {
            profileFirstName.value = userData.firstName || "";
        }
        const profileLastName = document.getElementById('profileLastName') as HTMLInputElement;
        if (profileLastName) {
            profileLastName.value = userData.lastName || "";
        }
        const profileEmail = document.getElementById('profileEmail') as HTMLInputElement;
        if (profileEmail) {
            profileEmail.value = userData.email || "";
        }
        if (userData && userData.avatar) {
            this._addAvatar(userData.avatar);
        }
    }

    /**
     * @function isDataChanged
     * @description Метод проверки изменения данных пользователя.
     * @returns {boolean} true, если данные изменены, иначе false.
     */
    isDataChanged(): boolean {
        if (!this.currentData || !this.previousData) {
            return false;
        }
        for (const key of Object.keys(this.currentData)) {
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
    _addAvatar(source: string) {
        const profileAvatar = document.getElementById('profileAvatar') as HTMLImageElement;
        if (!profileAvatar.firstElementChild) {
            return;
        }
        profileAvatar.firstElementChild.setAttribute('src', source);
    }

    /**
     * @function _removeAvatarHandler
     * @description Метод удаления аватара из профиля.
     * @private
     */
    _removeAvatarHandler() {
        this._resetApiError();
        User.removeAvatar().then(() => {
            RouteManager.navigateToPageByCurrentURL();
        }).catch((err: Error) => {
            this._showApiError(err);
        })
    }

    /**
     * @function _uploadAvatar
     * @description Метод загрузки аватара.
     * @param {File} file файл аватара.
     * @private
     */
    _uploadAvatar(file: File) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (!event.target || !event.target.result) {
                    return;
                }
                const source = event.target.result.toString();
                this._addAvatar(source);

                this._resetApiError();

                User.updateAvatar({avatar: file}).then(() => {
                    RouteManager.navigateToPageByCurrentURL();
                }).catch((err) => {
                    this._showApiError(err);
                })
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * @function _resetApiError
     * @description Метод сброса ошибки API
     */
    _resetApiError() {
        const apiError = document.getElementById('profile-api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
    }

    /**
     * @function _showApiError
     * @description Метод отображения ошибки API
     * @param {Error} error ошибка API
     */
    _showApiError(error: Error) {
        const apiError = document.getElementById('profile-api-error') as HTMLElement;
        apiError.textContent = error.message;
        apiError.classList.add('error__visible');
    }

    /**
     * @function _profileDataHandler
     * @description Обработчик события отправки формы данных профиля.
     * @param {Event} event событие отправки формы
     * @private
     */
    _profileDataHandler(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLElement;
        const profileDataSaveButton = target.querySelector('#profileDataSave') as HTMLButtonElement;
        profileDataSaveButton.disabled = true;

        let isValid = true;
        const inputFields = target
            .querySelectorAll('input');
        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, true);
            const errorField = input.nextElementSibling;
            if (errorField !== null && errorText !== "") {
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

        if (!this.currentData || !this.layout) {
            return;
        }
        this._resetApiError();
        this.layout.makeRequest(User.updateProfile.bind(User), {
            first_name: this.currentData.firstName,
            last_name: this.currentData.lastName,
            email: this.currentData.email
        } as ProfileInterface).then(() => {
            RouteManager.navigateToPageByCurrentURL();
        }).catch((err: Error) => {
            this._showApiError(err);
        })
    }

    /**
     * @function _profileDataInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @private
     */
    _profileDataInputHandler(event: Event) {
        event.preventDefault();
        const inputElement = this._getValidInputElement(event);
        if (!inputElement || !this.currentData) {
            return;
        }

        this.currentData[inputElement.name] = inputElement.value;
        const saveButton = document.getElementById('profileDataSave') as HTMLButtonElement;
        saveButton.disabled = !this.isDataChanged()

        const errorText = validateFormInput(inputElement, true);
        const errorField = inputElement.nextElementSibling;
        if (!errorField) {
            return;
        }
        if (errorText === "") {
            inputElement.classList.remove('input__invalid');
            errorField.classList.remove('error__visible');
        } else {
            inputElement.classList.add('input__invalid');
            errorField.classList.add('error__visible');
        }
        errorField.textContent = errorText;
    }

    /**
     * @function _getValidInputElement
     * @description Метод получения валидного элемента input.
     * @param {Event} event событие
     * @returns {HTMLInputElement | null} валидный элемент input или null
     */
    _getValidInputElement(event: Event): HTMLInputElement | null {
        if (!event.target) {
            return null;
        }

        const target = event.target as HTMLElement;
        return target.tagName === 'INPUT' ? target as HTMLInputElement : null;
    }

    /**
     * @function _processAvatarHandler
     * @description Метод обработки событий, связанных с аватаром профиля.
     * @param {Event} event событие, инициировавшее обработку
     * @private
     */
    _processAvatarHandler(event: Event) {
        if (!event.target) {
            return;
        }
        const target = event.target as HTMLElement;
        switch (target.id) {
            case 'profileAvatarUpload': {
                this._chooseAvatarClickHandler();
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
        const profileAvatarInput = document.getElementById('profileAvatarInput') as HTMLElement;
        profileAvatarInput.click();
    }

    /**
     * @function _getAvatarAfterChooseClickHandler
     * @description Обработчик события выбора аватара.
     * @param {Event} event событие выбора файла
     * @private
     */
    _getAvatarAfterChooseClickHandler(event: Event) {
        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }
        const [file] = target.files;
        this._uploadAvatar(file);
    }

    /**
     * @function setActiveProfileTab
     * @description Метод установки активной вкладки профиля.
     * @param {number} activeProfileTabIndex индекс активной вкладки профиля.
     */
    setActiveProfileTab(activeProfileTabIndex: number) {
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
        OfferCreate.reset();
        OfferCreateLayout.init();
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
        if (!this.layout) {
            return;
        }
        this.layout.makeRequest(User.logout.bind(User)).finally(() => {
            if (!this.layout) {
                return;
            }
            this.layout.emit('logout');
        });
    }
}