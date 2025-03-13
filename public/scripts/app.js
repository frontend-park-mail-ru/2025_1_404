'use strict';

import { PageManager } from "./managers/PageManager.js";
import { RouteManager } from "./managers/RouteManager.js";
import { getProfile } from "./util/ApiUtil.js";
import registerComponents from "./util/ComponentUtil.js";
import registerPages from "./util/PageUtil.js";
import registerRoutes from "./util/RouteUtil.js";

window.pageManager = new PageManager();
window.routeManager = new RouteManager();
window.currentUser = null;

/**
 * @function init
 * @description Инициализация приложения
 */
const init = function() {
    window.root = document.getElementById('root');

    registerComponents();
    registerPages();
    registerRoutes();

    window.addEventListener('popstate', () => window.routeManager.navigateToPageByCurrentURL());

    getProfile().then((response) => {
        window.currentUser = response;
    }).finally(() => {
        window.pageManager.setHeaderStatus(window.currentUser !== null);
        window.routeManager.navigateToPageByCurrentURL();
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

