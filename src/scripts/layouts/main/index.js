import BaseLayout from "../baseLayout.js";
import Header from "../../components/header/index.js";
import Login from "../../components/login/index.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";

/**
 * @class MainLayout
 * @description Макет приложения с хедером
 * @augments BaseLayout
 */
export default class MainLayout extends BaseLayout {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();

        this.on('showLogin', () => {
            this._loginForm.setShowLogin(true);
        })

        this.on('logout', () => {
            this.setHeaderStatus(false);
            RouteManager.navigateTo('/');
        })

        this.on('login', () => {
            this.setHeaderStatus(true);
        })
    }

    /**
     * @function process
     * @description Метод обработки страницы.
     * @param {Page} page экземпляр класса Page.
     * @returns {{destroy: *, render: *}} Метод destroy и метод render.
     */
    process(page) {
        return {
            destroy: () => {
                this._header.destroy();
                this._loginForm.destroy();

                super.process(page).destroy();
            },
            render: ({root, props}) => {

                super.process(page).render({props, root});

                this._header = new Header({layout: this, page});
                this._loginForm = new Login({layout: this, page});

                this.setHeaderStatus(User.isAuthenticated());

                if (props.showLogin) {
                    document.querySelector('#passwordInput').value = '';
                    document.querySelector(".login").classList.add('active');
                    document.querySelector(".overlay").classList.add('active');
                }
            }
        }
    }

    /**
     * @function setHeaderStatus
     * @description Установка статуса шапки (для авторизованного пользователя или нет)
     * @param {boolean} isAuthorized - авторизован ли пользователь
     */
    setHeaderStatus(isAuthorized) {
        const header = document.getElementById('header');
        const authorizedHeader = document.getElementById('header-authorized');
        if (header && authorizedHeader) {
            if (isAuthorized) {
                header.style.display = 'none';
                authorizedHeader.style.display = 'block';
                authorizedHeader.querySelector('.header__name').textContent = `${User.getData().firstName}`;
                authorizedHeader.querySelector('.user__avatar-img').src = User.getData().avatar;
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}