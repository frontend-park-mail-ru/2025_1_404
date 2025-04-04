'use strict';

import PageManager from "./managers/pageManager.js";
import RouteManager from "./managers/routeManager/routeManager.js";
import registerComponents from "./util/componentUtil.js";
import registerHandlebarsHelper from './util/handlebarsHelper.js'
import registerLayouts from "./util/layoutUtil.js";
import registerPages from "./util/pageUtil.js";
import registerRoutes from "./util/routeUtil.js";

/**
 * @function init
 * @description Инициализация приложения
 */
const init = function() {
    navigator.serviceWorker.register('/scripts/serviceWorker.js', {scope: '/'});

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