
import PageManager from "./managers/pageManager.ts";
import RouteManager from "./managers/routeManager/routeManager.ts";
import registerComponents from "./util/componentUtil.ts";
import registerHandlebarsHelper from './util/handlebarsHelper.js'
import registerLayouts from "./util/layoutUtil.ts";
import registerPages from "./util/pageUtil.ts";
import registerRoutes from "./util/routeUtil.ts";

/**
 * @function init
 * @description Инициализация приложения
 */
const init = function() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker не поддерживается вашим браузером.');
    }
    else {
        navigator.serviceWorker.register('/scripts/serviceWorker.js', {scope: '/'});
    }

    registerComponents();
    registerPages();
    registerRoutes();
    registerLayouts();
    registerHandlebarsHelper();

    PageManager.emit('init');
    RouteManager.navigateToPageByCurrentURL();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}