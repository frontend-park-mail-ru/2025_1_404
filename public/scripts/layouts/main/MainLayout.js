import BaseLayout from "../BaseLayout.js";
import RouteManager from "../../managers/RouteManager.js";
import Header from "../../components/Header/Header.js";
import Login from "../../components/Login/Login.js";

class MainLayout extends BaseLayout {
    constructor() {
        super();

        this.on('showLogin', () => {
            this._loginForm.setShowLogin(true);
        })

        this.on('logout', () => {
            window.currentUser = null;
            this.setHeaderStatus(false);
            RouteManager.navigateTo('/');
        })

        this.on('login', () => {
            this.setHeaderStatus(true);
        })
    }

    process(page) {
        return {
            render: ({root, props}) => {
                super.process(page).render({root, props});
                this.setHeaderStatus(window.currentUser !== null);

                this._logoHrefs = document.getElementsByClassName('logo-href');
                this._logoHrefHandler = this._logoHrefHandler.bind(this);
                for (const logoHref of this._logoHrefs) {
                    logoHref.addEventListener('click', this._logoHrefHandler)
                }

                this._header = new Header({page, layout: this});
                this._loginForm = new Login({page, layout: this});

                if (props.showLogin) {
                    document.querySelector('#passwordInput').value = '';
                    document.querySelector(".login").classList.add('active');
                    document.querySelector(".overlay").classList.add('active');
                }
            },
            destroy: () => {
                for (const logoHref of this._logoHrefs) {
                    logoHref.removeEventListener('click', this._logoHrefHandler)
                }
                this._profileHref.removeEventListener('click', this._profileHrefHandler)
                this._header.destroy();
                this._loginForm.destroy();

                super.process(page).destroy();
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
                authorizedHeader.querySelector('.header__name').textContent = `${window.currentUser.first_name}`;

                this._profileHref = document.getElementById('profile-href');
                this._profileHref.addEventListener('click', this._profileHrefHandler)
                // TODO добавить деструктор
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