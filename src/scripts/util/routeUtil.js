'use strict';

import AuthMiddleware from "../middlewares/authMiddleware.js";
import {HousingComplexRoute} from "../routes/housingComplexRoute.js";
import {IndexRoute} from "../routes/indexRoute.js";
import {LoginRoute} from "../routes/loginRoute.js";
import {OfferCreateAddressRoute} from "../routes/offer/offerCreateAddressRoute.js";
import {OfferCreateDescriptionRoute} from "../routes/offer/offerCreateDescriptionRoute.js";
import OfferCreateMiddleware from "../middlewares/offerCreateMiddleware.js";
import {OfferCreateParamsRoute} from "../routes/offer/offerCreateParamsRoute.js";
import {OfferCreatePhotosRoute} from "../routes/offer/offerCreatePhotosRoute.js";
import {OfferCreatePriceRoute} from "../routes/offer/offerCreatePriceRoute.js";
import {OfferCreateTypeRoute} from "../routes/offer/offerCreateTypeRoute.js";
import {OfferDetailsRoute} from "../routes/offerDetailsRoute.js";
import {ProfileMainRoute} from "../routes/profile/profileMainRoute.js";
import {ProfileOffersRoute} from "../routes/profile/profileOffersRoute.js";
import {RegisterRoute} from "../routes/registerRoute.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import {SearchRoute} from "../routes/searchRoute.js";
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