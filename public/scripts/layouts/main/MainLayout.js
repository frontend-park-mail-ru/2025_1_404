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
                for (const logoHref of this._logoHrefs) {
                    logoHref.removeEventListener('click', this._logoHrefHandler)
                }
                this._header.destroy();
                this._loginForm.destroy();

                super.process(page).destroy();
            },
            render: ({root, props}) => {
                super.process(page).render({props, root});
                this.setHeaderStatus(User.isAuthenticated());

                this._logoHrefs = document.getElementsByClassName('logo-href');
                this._logoHrefHandler = this._logoHrefHandler.bind(this);
                for (const logoHref of this._logoHrefs) {
                    logoHref.addEventListener('click', this._logoHrefHandler)
                }

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

    /**
     * @method _logoHrefHandler
     * @description Обработчик клика по логотипу в шапке
     * @param event
     * @private
     */
    _logoHrefHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    _profileHrefHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
    }
}

export default new MainLayout();