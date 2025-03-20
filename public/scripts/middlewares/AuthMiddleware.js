'use strict'

import RouteManager from "../managers/RouteManager.js";
import BaseMiddleware from "./BaseMiddleware.js";

class AuthMiddleware extends BaseMiddleware {
    check(route) {
        return {
            process: (params) => {
                if (window.currentUser === null) {
                    return RouteManager.navigateTo('/login');
                }
                super.check(route).process(params);
            }
        }
    }
}

export default new AuthMiddleware();