import {BaseLayout} from "../baseLayout.ts";
import Header from "../../components/header";
import Login from "../../components/login";
import {Page, PageRenderInterface} from "../../pages/page.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import SubmitModal from "../../components/submitModal";
import {deleteOffer} from "../../util/apiUtil.ts";

/**
 * @class MainLayout
 * @description Макет приложения с хедером
 * @augments BaseLayout
 */
export default class MainLayout extends BaseLayout {
    private loginForm: Login | undefined;
    private header: Header | undefined;
    /**
     * @description Конструктор класса.
     */
    // eslint-disable-next-line max-lines-per-function
    constructor() {
        super();

        this.on('showLogin', () => {
            if (this.loginForm) {
                this.loginForm.setShowModal(true);
            }
        });

        this.on('logout', () => {
            RouteManager.navigateTo('/');
        });

        this.on('login', () => {
            RouteManager.navigateToPageByCurrentURL();
        });

        this.on('tryExit', () => {
            if (this.submitForm && this.submitForm instanceof SubmitModal) {
                this.submitForm.showSubmitForm({
                    title: 'Вы точно хотите выйти?',
                    submitButtonName: 'Выйти',
                    submitButtonClass: 'red',
                    denyButtonName: 'Отмена',
                    denyButtonClass: 'light',
                    onSubmit: () => {
                        this.makeRequest(User.logout.bind(User)).then(() => {
                            this.emit('logout');
                        }).catch((e: Error) => {
                            this?.addPopup('Ошибка сервера', e.message);
                        });
                    }
                });
            }
        });

        this.on('editOffer', (id: number) => {
            RouteManager.navigateTo(`/offer/edit/${id}/type`);
        });

        this.on('tryDelete', (id: number) => {
            if (this.submitForm && this.submitForm instanceof SubmitModal) {
                this.submitForm.showSubmitForm({
                    title: 'Вы точно хотите удалить объявление?',
                    submitButtonName: 'Удалить',
                    submitButtonClass: 'red',
                    denyButtonName: 'Отмена',
                    denyButtonClass: 'light',
                    onSubmit: () => {
                        this.makeRequest(deleteOffer, id).then(() => {
                            RouteManager.navigateTo('/');
                        }).catch((e: Error) => {
                            this?.addPopup('Ошибка сервера', e.message);
                        })
                    }
                });
            }
        });
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
                if (this.header) {
                    this.header.destroy();
                }
                if (this.loginForm) {
                    this.loginForm.destroy();
                }

                super.process(page).destroy();
            },
            render: ({root, props}: PageRenderInterface) => {

                super.process(page).render({props, root});

                this.header = new Header({layout: this, page});
                this.loginForm = new Login({layout: this, page, id: 'login'});
                this.submitForm = new SubmitModal({layout: this, page, id: 'submitModal'});

                this.setHeaderStatus(User.isAuthenticated());

                if (props && props.showLogin) {
                    if (this.loginForm) {
                        this.loginForm.setShowModal(true);
                    }
                }
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
            formInputHandler: page.formInputHandler,
            resetApiError: page.resetApiError,
            showApiError: page.showApiError,
            showFieldError: page.showFieldError,
            validateFormFields: page.validateFormFields,
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
                if (!userData) {
                    return;
                }
                const headerName = authorizedHeader.querySelector('.header__name') as HTMLElement;
                headerName.textContent = `${userData.firstName}`;
                if (userData.avatar) {
                    const avatar = authorizedHeader.querySelector('.user__avatar-img') as HTMLImageElement;
                    avatar.src = userData.avatar;
                }
            } else {
                header.style.display = 'block';
                authorizedHeader.style.display = 'none';
            }
        }
    }
}