'use strict';

import {IndexRoute} from "../routes/IndexRoute.js";
import {RegisterRoute} from "../routes/RegisterRoute.js";

/**
 * @description Регистрация маршрутов
 */
export default function registerRoutes() {
    routeManager.registerRoute('', new IndexRoute());
    routeManager.registerRoute('register', new RegisterRoute());
}