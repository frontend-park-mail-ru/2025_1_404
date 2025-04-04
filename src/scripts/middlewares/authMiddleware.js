'use strict'

import BaseMiddleware from "./baseMiddleware.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

export default class AuthMiddleware extends BaseMiddleware {
    check(route) {
        return {
            process: (params) => {
                if (User.isLoaded() && !User.isAuthenticated()) {
                    return RouteManager.navigateTo('/login');
                }
                return super.check(route).process(params);
            }
        }
    }
}