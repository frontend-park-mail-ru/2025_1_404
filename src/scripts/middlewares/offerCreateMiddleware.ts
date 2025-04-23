
import AuthMiddleware from "./authMiddleware.ts";
import OfferCreate from "../models/offerCreate.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";
import {OfferCreateRoute} from "../routes/offer/create/OfferCreateRoute.ts";

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
                const currentStep = route.pageName;

                if (!OfferCreate.isPreviousPageFilled(currentStep)) {

                    return RouteManager.navigateTo('/offer/create/'.concat(OfferCreate.getLastFilledPage()));
                }

                return super.check(route).process(params);
            }
        }
    }
}

export default new OfferCreateMiddleware();