
import AuthMiddleware from "./authMiddleware.js";
import OfferCreate from "../models/offerCreate.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import BaseRoute from "../routes/baseRoute.js";
import {OfferCreateRoute} from "../routes/offer/OfferCreateRoute.js";

/**
 * @class OfferCreateMiddleware
 * @description Middleware для страниц создания объявления.
 */
class OfferCreateMiddleware extends AuthMiddleware {
    /**
     * @function check
     * @description Метод предварительной обработки маршрута.
     * @param {Route} route маршрут.
     * @returns {{process: ((function(*): (*))|*)}} Итоговый метод обработки маршрута.
     */
    check(route: OfferCreateRoute) {
        return {
            process: (params?: unknown) => {
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