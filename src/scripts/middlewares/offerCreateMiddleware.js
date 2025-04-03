'use strict'

import AuthMiddleware from "./authMiddleware.js";
import OfferCreate from "../models/offerCreate.js";
import RouteManager from "../managers/routeManager/routeManager.js";

class OfferCreateMiddleware extends AuthMiddleware {
    check(route) {
        return {
            process: (params) => {
                const currentStep = route._pageName;

                if (!OfferCreate.isPreviousPageFilled(currentStep)) {

                    return RouteManager.navigateTo('/offer/create/'.concat(OfferCreate.getLastFilledPage()));
                }

                return super.check(route).process(params);
            }
        }
    }
}

export default new OfferCreateMiddleware();