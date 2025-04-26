import PageManager from "./managers/pageManager.ts";
import CSATPage from "./pages/csat";
import registerComponents from "./util/componentUtil.ts";

registerComponents()

PageManager.emit('init');
PageManager.registerPage('csat', new CSATPage());
PageManager.renderPage('csat');