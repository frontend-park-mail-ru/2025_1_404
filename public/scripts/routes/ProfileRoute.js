'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class ProfileRoute
 * @description Класс для обработки маршрута страницы профиля.
 * @extends BaseRoute
 */
export class ProfileRoute extends BaseRoute {
    process(path) {
        switch (path.join()) {
            case "main":
                window.pageManager.renderPage('profileMain', {});
                break;
            case "myOffers":
                window.pageManager.renderPage('profileMyOffers', {});
                break;
        }

    }
}