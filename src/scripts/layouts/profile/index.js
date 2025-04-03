import MainLayout from "../main/index.js";
import ProfileLeft from "../../components/profileLeft/index.js";

class ProfileLayout extends MainLayout {

    process(page) {
        return {
            destroy: () => {
                super.process(page).destroy();
            },
            render: ({root, props}) => {
                super.process(page).render({props, root});
                this._profileLeft = new ProfileLeft();
                this._profileLeft.setActiveProfileTab(props.activeProfileTabIndex);
            }
        }
    }
}

export default new ProfileLayout();