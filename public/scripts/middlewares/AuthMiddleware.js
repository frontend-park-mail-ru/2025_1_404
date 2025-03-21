'use strict'

import BaseMiddleware from "./BaseMiddleware.js";
import RouteManager from "../managers/RouteManager/RouteManager.js";
import User from "../models/User.js";

class AuthMiddleware extends BaseMiddleware {
    check(route) {
        return {
            process: (params) => {
                if (!User.isAuthenticated()) {
                    return RouteManager.navigateTo('/login');
                }
                return super.check(route).process(params);
            }
        }
    }
}

export default new AuthMiddleware();