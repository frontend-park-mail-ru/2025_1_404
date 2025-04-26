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
        this.initListener('profileMainButton', 'click', this.mainPageButtonHandler);
        this.initListener('offerCreateButton', 'click', this.offerCreatePageButtonHandler);
        this.initListener('profileFavoritesButton', 'click', this.favoritesButtonHandler);
        this.initListener('profileMyOffersButton', 'click', this.myOffersButtonHandler);
        this.initListener('profileCsatStatsButton', 'click', this.csatStatsButtonHandler)
        this.initListener('profileLogoutButton', 'click', this.logoutButtonHandler);
        this.initListener('profileAvatarUpload', 'click', this.processAvatarHandler);
        this.initListener('profileAvatarInput', 'change', this.getAvatarAfterChooseClickHandler);
        this.initListener('profileData', 'submit', this.profileDataHandler);
        this.initListener('profileData', 'input', this.profileDataInputHandler);
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
            this.addAvatar(userData.avatar);
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
     * @function addAvatar
     * @description Метод добавления аватара в профиль.
     * @param {string} source источник изображения аватара.
     * @private
     */
    private addAvatar(source: string) {
        const profileAvatar = document.getElementById('profileAvatar') as HTMLImageElement;
        if (!profileAvatar.firstElementChild) {
            return;
        }
        profileAvatar.firstElementChild.setAttribute('src', source);
    }

    /**
     * @function removeAvatarHandler
     * @description Метод удаления аватара из профиля.
     * @private
     */
    private removeAvatarHandler() {
        this.resetApiError();
        User.removeAvatar().then(() => {
            RouteManager.navigateToPageByCurrentURL();
        }).catch((err: Error) => {
            this.showApiError(err);
        })
    }

    /**
     * @function uploadAvatar
     * @description Метод загрузки аватара.
     * @param {File} file файл аватара.
     * @private
     */
    private uploadAvatar(file: File) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (!event.target || !event.target.result) {
                    return;
                }
                const source = event.target.result.toString();
                this.addAvatar(source);

                this.resetApiError();

                User.updateAvatar({avatar: file}).then(() => {
                    RouteManager.navigateToPageByCurrentURL();
                }).catch((err) => {
                    this.showApiError(err);
                })
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * @function resetApiError
     * @description Метод сброса ошибки API
     */
    private resetApiError() {
        const apiError = document.getElementById('profile-api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
    }

    /**
     * @function showApiError
     * @description Метод отображения ошибки API
     * @param {Error} error ошибка API
     */
    private showApiError(error: Error) {
        const apiError = document.getElementById('profile-api-error') as HTMLElement;
        apiError.textContent = 'Ошибка: '.concat(error.message);
        apiError.classList.add('error__visible');
    }

    /**
     * @function profileDataHandler
     * @description Обработчик события отправки формы данных профиля.
     * @param {Event} event событие отправки формы
     * @private
     */
    private profileDataHandler(event: Event) {
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
            let errorField = target.nextElementSibling;
            if ((target.dataset.clearfield || target.dataset.passwordfield) && target.parentElement) {
                errorField = target.parentElement.nextElementSibling;
            }
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
        this.resetApiError();
        this.layout.makeRequest(User.updateProfile.bind(User), {
            first_name: this.currentData.firstName,
            last_name: this.currentData.lastName,
            email: this.currentData.email
        } as ProfileInterface).then(() => {
            RouteManager.navigateToPageByCurrentURL();
        }).catch((err: Error) => {
            this.showApiError(err);
        })
    }

    /**
     * @function profileDataInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @private
     */
    private profileDataInputHandler(event: Event) {
        event.preventDefault();
        const inputElement = this.getValidInputElement(event);
        if (!inputElement || !this.currentData) {
            return;
        }

        this.currentData[inputElement.name] = inputElement.value;
        const saveButton = document.getElementById('profileDataSave') as HTMLButtonElement;
        saveButton.disabled = !this.isDataChanged()

        const errorText = validateFormInput(inputElement, true);
        let errorField = inputElement.nextElementSibling;
        if ((inputElement.dataset.clearfield || inputElement.dataset.passwordfield) && inputElement.parentElement) {
            errorField = inputElement.parentElement.nextElementSibling;
        }
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
     * @function getValidInputElement
     * @description Метод получения валидного элемента input.
     * @param {Event} event событие
     * @returns {HTMLInputElement | null} валидный элемент input или null
     */
    private getValidInputElement(event: Event): HTMLInputElement | null {
        if (!event.target) {
            return null;
        }

        const target = event.target as HTMLElement;
        return target.tagName === 'INPUT' ? target as HTMLInputElement : null;
    }

    /**
     * @function processAvatarHandler
     * @description Метод обработки событий, связанных с аватаром профиля.
     * @param {Event} event событие, инициировавшее обработку
     * @private
     */
    private processAvatarHandler(event: Event) {
        if (!event.target) {
            return;
        }
        const target = event.target as HTMLElement;
        switch (target.id) {
            case 'profileAvatarUpload': {
                this.chooseAvatarClickHandler();
                break;
            }
            case 'profileAvatarRemove': {
                this.removeAvatarHandler();
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * @function chooseAvatarClickHandler
     * @description Обработчик события клика по аватару профиля.
     * @private
     */
    private chooseAvatarClickHandler() {
        const profileAvatarInput = document.getElementById('profileAvatarInput') as HTMLElement;
        profileAvatarInput.click();
    }

    /**
     * @function getAvatarAfterChooseClickHandler
     * @description Обработчик события выбора аватара.
     * @param {Event} event событие выбора файла
     * @private
     */
    private getAvatarAfterChooseClickHandler(event: Event) {
        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }
        const [file] = Array.from(target.files);
        this.uploadAvatar(file);
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
     * @function mainPageButtonHandler
     * @description Обработчик события перехода на главную страницу профиля
     * @private
     */
    private mainPageButtonHandler() {
        RouteManager.navigateTo('/profile');
    }

    /**
     * @function offerCreatePageButtonHandler
     * @description Обработчик события перехода на страницу создания объявления
     * @private
     */
    private offerCreatePageButtonHandler() {
        OfferCreate.reset();
        OfferCreateLayout.init();
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @function favoritesButtonHandler
     * @description Обработчик события перехода на страницу избранного
     * @private
     */
    private favoritesButtonHandler() {
        RouteManager.navigateTo('/profile/favorites');
    }

    /**
     * @function myOffersButtonHandler
     * @description Обработчик события перехода на страницу "мои объявления"
     * @private
     */
    private myOffersButtonHandler() {
        RouteManager.navigateTo('/profile/offers');
    }

    /**
     * @function csatStatsButtonHandler
     * @description Обработчик события перехода на страницу статистики csat
     * @private
     */
    private csatStatsButtonHandler() {
        RouteManager.navigateTo('/csat/stats');
    }

    /**
     * @function logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта на странице профиля
     * @private
     */
    private logoutButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('tryExit');
    }
}