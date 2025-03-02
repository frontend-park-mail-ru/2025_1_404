'use strict';

import {IndexRoute} from "../routes/IndexRoute.js";
import {RegisterRoute} from "../routes/RegisterRoute.js";

/**
 * @function registerRoutes
 * @description Регистрация маршрутов
 */
export default function registerRoutes() {
    routeManager.registerRoute('', new IndexRoute());
    routeManager.registerRoute('register', new RegisterRoute());
}