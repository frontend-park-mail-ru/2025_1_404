import MainLayout from "../main/index.js";
import ProfileLeft from "../../components/profileLeft/index.js";

/**
 * @class ProfileLayout
 * @description Макет страницы профиля.
 * @augments MainLayout
 */
class ProfileLayout extends MainLayout {
    /**
     * @function process
     * @description Метод обработки страницы.
     * @param {Page} page экземпляр класса Page.
     * @returns {{destroy: *, render: *}} Метод destroy и метод render.
     */
    process(page) {
        return {
            destroy: () => {
                super.process(page).destroy();
            },
            render: ({root, props}) => {
                super.process(page).render({props, root});
                this._profileLeft = new ProfileLeft({page, layout: this});
                this._profileLeft.setActiveProfileTab(props.activeProfileTabIndex);
            }
        }
    }
}

export default new ProfileLayout();