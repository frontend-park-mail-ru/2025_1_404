import PageManager from "./managers/pageManager.ts";
import CSATPage from "./pages/csat";
import registerComponents from "./util/componentUtil.ts";

const init = () => {
    PageManager.emit('init');
    registerPages();
    registerComponents();

    PageManager.renderPage('csat');
}

const registerPages = () => {
    PageManager.registerPage('csat', new CSATPage());
}

init();