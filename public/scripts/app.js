/*
    Точка входа приложения в браузере.
    Инициализирует менеджер страниц, регистрирует компоненты для использования в шаблоназиторах и регистрирует страницы.
*/

'use strict';

import { PageManager } from "./managers/PageManager.js";
import registerComponents from "./util/ComponentUtil.js";
import {RouteManager} from "./managers/RouteManager.js";
import registerPages from "./util/PageUtil.js";
import registerRoutes from "./util/RouteUtil.js";

window.pageManager = new PageManager();
window.routeManager = new RouteManager();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * @description Инициализация приложения
 */
function init() {
    window.root = document.getElementById('root');

    registerComponents();
    registerPages();
    registerRoutes();

    window.addEventListener('popstate', () => routeManager.navigateToPageByCurrentURL());
    routeManager.navigateToPageByCurrentURL();
}
