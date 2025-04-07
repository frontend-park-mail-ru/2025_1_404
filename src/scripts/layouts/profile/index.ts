import MainLayout from "../main/index";
import ProfileLeft from "../../components/profileLeft";
import {Page, PageRenderInterface} from "../../pages/page.js";
import {BaseLayout} from "../baseLayout.js";

/**
 * @class ProfileLayout
 * @description Макет страницы профиля.
 * @augments MainLayout
 */
class ProfileLayout extends MainLayout {
    private _profileLeft: ProfileLeft | undefined;
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
                this._profileLeft = new ProfileLeft({page, layout: this});
                this._profileLeft.setActiveProfileTab(props.activeProfileTabIndex);
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
        }
    }
}

export default new ProfileLayout();