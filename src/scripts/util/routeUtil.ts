
import AuthMiddleware from "../middlewares/authMiddleware.ts";
import {HousingComplexRoute} from "../routes/housingComplexRoute.ts";
import {IndexRoute} from "../routes/indexRoute.ts";
import {LoginRoute} from "../routes/loginRoute.ts";
import {OfferCreateAddressRoute} from "../routes/offer/offerCreateAddressRoute.ts";
import {OfferCreateDescriptionRoute} from "../routes/offer/offerCreateDescriptionRoute.ts";
import OfferCreateMiddleware from "../middlewares/offerCreateMiddleware.ts";
import {OfferCreateParamsRoute} from "../routes/offer/offerCreateParamsRoute.ts";
import {OfferCreatePhotosRoute} from "../routes/offer/offerCreatePhotosRoute.ts";
import {OfferCreatePriceRoute} from "../routes/offer/offerCreatePriceRoute.ts";
import {OfferCreateTypeRoute} from "../routes/offer/offerCreateTypeRoute.ts";
import {OfferDetailsRoute} from "../routes/offerDetailsRoute.ts";
import {ProfileMainRoute} from "../routes/profile/profileMainRoute.ts";
import {ProfileOffersRoute} from "../routes/profile/profileOffersRoute.ts";
import {RegisterRoute} from "../routes/registerRoute.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";
import {SearchRoute} from "../routes/searchRoute.ts";
/**
 * @function registerRoutes
 * @description Регистрация маршрутов
 */
export default function registerRoutes() {
    const authMiddleware = new AuthMiddleware();

    RouteManager.registerRoute('', new IndexRoute());
    RouteManager.registerRoute('register', new RegisterRoute())
    RouteManager.registerRoute('login', new LoginRoute());

    RouteManager.registerRoute('profile', authMiddleware.check(new ProfileMainRoute()));
    RouteManager.registerRoute('profile/offers', authMiddleware.check(new ProfileOffersRoute()));

    RouteManager.registerRoute('offer/create/type', OfferCreateMiddleware.check(new OfferCreateTypeRoute()));
    RouteManager.registerRoute('offer/create/address', OfferCreateMiddleware.check(new OfferCreateAddressRoute()));
    RouteManager.registerRoute('offer/create/params', OfferCreateMiddleware.check(new OfferCreateParamsRoute()));
    RouteManager.registerRoute('offer/create/price', OfferCreateMiddleware.check(new OfferCreatePriceRoute()));
    RouteManager.registerRoute('offer/create/photos', OfferCreateMiddleware.check(new OfferCreatePhotosRoute()));
    RouteManager.registerRoute('offer/create/description', OfferCreateMiddleware.check(new OfferCreateDescriptionRoute()));

    RouteManager.registerRoute('zhk/:id', new HousingComplexRoute());

    RouteManager.registerRoute('offer/details/:id', new OfferDetailsRoute());

    RouteManager.registerRoute('search', new SearchRoute());
}