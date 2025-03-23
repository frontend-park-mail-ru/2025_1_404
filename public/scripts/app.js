'use strict';

import PageManager from "./managers/PageManager.js";
import RouteManager from "./managers/RouteManager/RouteManager.js";
import User from "./models/User.js";
import registerComponents from "./util/ComponentUtil.js";
import registerHandlebarsHelper from './util/HandlebarsHelper.js'
import registerLayouts from "./util/LayoutUtil.js";
import registerPages from "./util/PageUtil.js";
import registerRoutes from "./util/RouteUtil.js";

/**
 * @function init
 * @description Инициализация приложения
 */
const init = function() {
    registerComponents();
    registerPages();
    registerRoutes();
    registerLayouts();
    registerHandlebarsHelper();

    User.update().finally(() => {
        PageManager.emit('init');
        RouteManager.navigateToPageByCurrentURL();
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}