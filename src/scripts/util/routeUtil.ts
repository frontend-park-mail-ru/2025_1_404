
import AuthMiddleware from "../middlewares/authMiddleware.ts";
import {HousingComplexRoute} from "../routes/housingComplexRoute.ts";
import {IndexRoute} from "../routes/indexRoute.ts";
import {LoginRoute} from "../routes/loginRoute.ts";
import {OfferCreateAddressRoute} from "../routes/offer/create/offerCreateAddressRoute.ts";
import {OfferCreateDescriptionRoute} from "../routes/offer/create/offerCreateDescriptionRoute.ts";
import OfferCreateMiddleware from "../middlewares/offerCreateMiddleware.ts";
import {OfferCreateParamsRoute} from "../routes/offer/create/offerCreateParamsRoute.ts";
import {OfferCreatePhotosRoute} from "../routes/offer/create/offerCreatePhotosRoute.ts";
import {OfferCreatePriceRoute} from "../routes/offer/create/offerCreatePriceRoute.ts";
import {OfferCreateTypeRoute} from "../routes/offer/create/offerCreateTypeRoute.ts";
import {OfferDetailsRoute} from "../routes/offerDetailsRoute.ts";
import {ProfileMainRoute} from "../routes/profile/profileMainRoute.ts";
import {ProfileOffersRoute} from "../routes/profile/profileOffersRoute.ts";
import {RegisterRoute} from "../routes/registerRoute.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";
import {SearchRoute} from "../routes/searchRoute.ts";
import {OfferEditTypeRoute} from "../routes/offer/edit/offerEditTypeRoute.ts";
import {OfferEditAddressRoute} from "../routes/offer/edit/offerEditAddressRoute.ts";
import {OfferEditParamsRoute} from "../routes/offer/edit/offerEditParamsRoute.ts";
import {OfferEditPriceRoute} from "../routes/offer/edit/offerEditPriceRoute.ts";
import {OfferEditPhotosRoute} from "../routes/offer/edit/offerEditPhotosRoute.ts";
import {OfferEditDescriptionRoute} from "../routes/offer/edit/offerEditDescriptionRoute.ts";
import {ProfileFavoritesRoute} from "../routes/profile/profileFavoritesRoute.ts";
/**
 * @function registerRoutes
 * @description Регистрация маршрутов
 */
// eslint-disable-next-line max-statements
export default function registerRoutes() {
    const authMiddleware = new AuthMiddleware();

    RouteManager.registerRoute('', new IndexRoute());
    RouteManager.registerRoute('register', new RegisterRoute())
    RouteManager.registerRoute('login', new LoginRoute());

    RouteManager.registerRoute('profile', authMiddleware.check(new ProfileMainRoute()));
    RouteManager.registerRoute('profile/offers', authMiddleware.check(new ProfileOffersRoute()));
    RouteManager.registerRoute('profile/favorites', authMiddleware.check(new ProfileFavoritesRoute()));

    RouteManager.registerRoute('offer/create/type', OfferCreateMiddleware.check(new OfferCreateTypeRoute()));
    RouteManager.registerRoute('offer/create/address', OfferCreateMiddleware.check(new OfferCreateAddressRoute()));
    RouteManager.registerRoute('offer/create/params', OfferCreateMiddleware.check(new OfferCreateParamsRoute()));
    RouteManager.registerRoute('offer/create/price', OfferCreateMiddleware.check(new OfferCreatePriceRoute()));
    RouteManager.registerRoute('offer/create/photos', OfferCreateMiddleware.check(new OfferCreatePhotosRoute()));
    RouteManager.registerRoute('offer/create/description', OfferCreateMiddleware.check(new OfferCreateDescriptionRoute()));

    RouteManager.registerRoute('offer/edit/:id/type', authMiddleware.check(new OfferEditTypeRoute()));
    RouteManager.registerRoute('offer/edit/:id/address', authMiddleware.check(new OfferEditAddressRoute()));
    RouteManager.registerRoute('offer/edit/:id/params', authMiddleware.check(new OfferEditParamsRoute()));
    RouteManager.registerRoute('offer/edit/:id/price', authMiddleware.check(new OfferEditPriceRoute()));
    RouteManager.registerRoute('offer/edit/:id/photos', authMiddleware.check(new OfferEditPhotosRoute()));
    RouteManager.registerRoute('offer/edit/:id/description', authMiddleware.check(new OfferEditDescriptionRoute()));

    RouteManager.registerRoute('zhk/:id', new HousingComplexRoute());

    RouteManager.registerRoute('offer/details/:id', new OfferDetailsRoute());

    RouteManager.registerRoute('search', new SearchRoute());
}