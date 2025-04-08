import {BaseLayout} from "../baseLayout.ts";
import Header from "../../components/header";
import Login from "../../components/login";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import {Page, PageRenderInterface} from "../../pages/page.ts";

/**
 * @class MainLayout
 * @description Макет приложения с хедером
 * @augments BaseLayout
 */
export default class MainLayout extends BaseLayout {
    private _loginForm: Login | undefined;
    private _header: Header | undefined;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();

        this.on('showLogin', () => {
            if (this._loginForm) {
                this._loginForm.setShowLogin(true);
            }
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
    process(page: Page) {
        return {
            destroy: () => {
                if (this._header) {
                    this._header.destroy();
                }
                if (this._loginForm) {
                    this._loginForm.destroy();
                }

                super.process(page).destroy();
            },
            render: ({root, props}: PageRenderInterface) => {

                super.process(page).render({props, root});

                this._header = new Header({layout: this, page});
                this._loginForm = new Login({layout: this, page});

                this.setHeaderStatus(User.isAuthenticated());

                if (props.showLogin) {
                    const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
                    passwordInput.value = '';
                    const login = document.querySelector(".login") as HTMLElement;
                    const overlay = document.querySelector(".overlay") as HTMLElement;
                    login.classList.add('active');
                    overlay.classList.add('active');
                }
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
        }
    }

    /**
     * @function setHeaderStatus
     * @description Установка статуса шапки (для авторизованного пользователя или нет)
     * @param {boolean} isAuthorized - авторизован ли пользователь
     */
    setHeaderStatus(isAuthorized: boolean) {
        const header = document.getElementById('header');
        const authorizedHeader = document.getElementById('header-authorized') as HTMLElement;
        if (header && authorizedHeader) {
            if (isAuthorized) {
                header.style.display = 'none';
                authorizedHeader.style.display = 'block';
                const userData = User.getData();
                if (userData === null) {
                    return;
                }
                const headerName = authorizedHeader.querySelector('.header__name') as HTMLElement;
                headerName.textContent = `${userData.firstName}`;
                const avatar = authorizedHeader.querySelector('.user__avatar-img') as HTMLImageElement;
                avatar.src = userData.avatar;
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}