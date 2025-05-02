import MainLayout from "../main/index";
import ProfileLeft from "../../components/profileLeft";
import {Page, PageRenderInterface} from "../../pages/page.ts";
import ProfileSideButton from "../../components/profileSideButton";

/**
 * @class ProfileLayout
 * @description Макет страницы профиля.
 * @augments MainLayout
 */
class ProfileLayout extends MainLayout {
    private profileLeft: ProfileLeft | undefined;
    private profileSideButton: ProfileSideButton | undefined;

    constructor() {
        super();

        this.on('toggleShowProfile', () => {
            this.toggleShowProfile();
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
                super.process(page).destroy();
            },
            render: ({root, props}: PageRenderInterface) => {
                super.process(page).render({props, root});
                this.profileLeft = new ProfileLeft({page, layout: this});
                this.profileSideButton = new ProfileSideButton({page, layout: this});
                if (props && typeof props.activeProfileTabIndex === 'number') {
                    this.profileLeft.setActiveProfileTab(props.activeProfileTabIndex as number);
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
     * @function toggleShowProfile
     * @description Метод установки состояния окна данных профиля.
     */
    toggleShowProfile() {
        const profileLeft = document.getElementById('profileLeft');
        const profileRight = document.getElementById('profileRight');
        const profileSideButtonIcon = document.getElementById('profileSideButton')?.children[0];
        if (profileLeft && profileRight && profileSideButtonIcon) {
            profileLeft.classList.toggle('show');
            profileRight.classList.toggle('show');
            profileSideButtonIcon.classList.toggle('fa-arrow-right');
            profileSideButtonIcon.classList.toggle('fa-arrow-left');
        }
    }
}

export default new ProfileLayout();