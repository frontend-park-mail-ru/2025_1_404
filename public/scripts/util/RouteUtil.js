'use strict';

import {IndexRoute} from "../routes/IndexRoute.js";
import {RegisterRoute} from "../routes/RegisterRoute.js";
import {ProfileOffersRoute} from "../routes/profile/ProfileOffersRoute.js";
import {OfferCreateTypeRoute} from "../routes/offers/OfferCreateTypeRoute.js";
import RouteManager from "../managers/RouteManager.js";
import {ProfileMainRoute} from "../routes/profile/ProfileMainRoute.js";
import {OfferCreateAddressRoute} from "../routes/offers/OfferCreateAddressRoute.js";
import {OfferCreateParamsRoute} from "../routes/offers/OfferCreateParamsRoute.js";
import {OfferCreatePriceRoute} from "../routes/offers/OfferCreatePriceRoute.js";
import {OfferCreatePhotosRoute} from "../routes/offers/OfferCreatePhotosRoute.js";
import {OfferCreateDescriptionRoute} from "../routes/offers/OfferCreateDescriptionRoute.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import {LoginRoute} from "../routes/LoginRoute.js";

/**
 * @function registerRoutes
 * @description Регистрация маршрутов
 */
export default function registerRoutes() {
    RouteManager.registerRoute('', new IndexRoute());
    RouteManager.registerRoute('register', new RegisterRoute())
    RouteManager.registerRoute('login', new LoginRoute());

    RouteManager.registerRoute('profile', AuthMiddleware.check(new ProfileMainRoute()));
    RouteManager.registerRoute('profile/offers', AuthMiddleware.check(new ProfileOffersRoute()));

    RouteManager.registerRoute('offer/create/type', AuthMiddleware.check(new OfferCreateTypeRoute()));
    RouteManager.registerRoute('offer/create/address', AuthMiddleware.check(new OfferCreateAddressRoute()));
    RouteManager.registerRoute('offer/create/params', AuthMiddleware.check(new OfferCreateParamsRoute()));
    RouteManager.registerRoute('offer/create/price', AuthMiddleware.check(new OfferCreatePriceRoute()));
    RouteManager.registerRoute('offer/create/photos', AuthMiddleware.check(new OfferCreatePhotosRoute()));
    RouteManager.registerRoute('offer/create/description', AuthMiddleware.check(new OfferCreateDescriptionRoute()));
}