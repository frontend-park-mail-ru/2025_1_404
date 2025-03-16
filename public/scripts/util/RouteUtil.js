'use strict';

import {IndexRoute} from "../routes/IndexRoute.js";
import {RegisterRoute} from "../routes/RegisterRoute.js";
import {ProfileRoute} from "../routes/ProfileRoute.js";

/**
 * @function registerRoutes
 * @description Регистрация маршрутов
 */
export default function registerRoutes() {
    window.routeManager.registerRoute('', new IndexRoute());
    window.routeManager.registerRoute('register', new RegisterRoute());
    window.routeManager.registerRoute('profile', new ProfileRoute());
}