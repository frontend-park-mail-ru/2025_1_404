import BaseLayout from "../BaseLayout.js";
import Header from "../../components/Header/Header.js";
import Login from "../../components/Login/Login.js";
import RouteManager from "../../managers/RouteManager/RouteManager.js";
import User from "../../models/User.js";

class MainLayout extends BaseLayout {
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

    process(page) {
        return {
            destroy: () => {
                this._header.destroy();
                this._loginForm.destroy();

                super.process(page).destroy();
            },
            render: ({root, props}) => {
                super.process(page).render({props, root});
                this.setHeaderStatus(User.isAuthenticated());

                this._header = new Header({layout: this, page});
                this._loginForm = new Login({layout: this, page});

                if (props.showLogin) {
                    document.querySelector('#passwordInput').value = '';
                    document.querySelector(".login").classList.add('active');
                    document.querySelector(".overlay").classList.add('active');
                }
            }
        }
    }

    /**
     * @method setHeaderStatus
     * @description Установка статуса шапки (для авторизованного пользователя или нет)
     * @param isAuthorized
     */
    setHeaderStatus(isAuthorized) {
        const header = document.getElementById('header');
        const authorizedHeader = document.getElementById('header-authorized');
        if (header && authorizedHeader) {
            if (isAuthorized) {
                header.style.display = 'none';
                authorizedHeader.style.display = 'block';
                authorizedHeader.querySelector('.header__name').textContent = `${User.getData().firstName}`;
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}

export default new MainLayout();