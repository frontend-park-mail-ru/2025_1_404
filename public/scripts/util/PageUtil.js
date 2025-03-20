'use strict';

import IndexPage from "../pages/index/index.js";
import RegisterPage from "../pages/register/register.js";
import ProfilePage from "../pages/profile/profileMain/profileMain.js";
import ProfileMainPage from "../pages/profile/profileMain/profileMain.js";
import ProfileMyOffersPage from "../pages/profile/profileMyOffers/profileMyOffers.js";
import OfferCreateTypePage from "../pages/offerCreate/offerCreateType/offerCreateType.js";
import OfferCreateAddressPage from "../pages/offerCreate/offerCreateAddress/offerCreateAddress.js";
import OfferCreateParamsPage from "../pages/offerCreate/offerCreateParams/offerCreateParams.js";
import OfferCreatePricePage from "../pages/offerCreate/offerCreatePrice/offerCreatePrice.js";
import OfferCreatePhotosPage from "../pages/offerCreate/offerCreatePhotos/offerCreatePhotos.js";
import OfferCreateDescriptionPage from "../pages/offerCreate/offerCreateDescription/offerCreateDescription.js";
import PageManager from "../managers/PageManager.js";
import UnknownPage from "../pages/404/unknown.js";
import MainLayout from "../layouts/main/MainLayout.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    PageManager.registerPage('index', MainLayout.process(new IndexPage()));
    PageManager.registerPage('register', new RegisterPage());
    PageManager.registerPage('404', MainLayout.process(new UnknownPage()));

    PageManager.registerPage('profileMain', MainLayout.process(new ProfileMainPage()));
    PageManager.registerPage('profileMyOffers', MainLayout.process(new ProfileMyOffersPage()));

    PageManager.registerPage('offerCreateType', MainLayout.process(new OfferCreateTypePage()));
    PageManager.registerPage('offerCreateAddress', MainLayout.process(new OfferCreateAddressPage()));
    PageManager.registerPage('offerCreateParams', MainLayout.process(new OfferCreateParamsPage()));
    PageManager.registerPage('offerCreatePrice', MainLayout.process(new OfferCreatePricePage()));
    PageManager.registerPage('offerCreatePhotos', MainLayout.process(new OfferCreatePhotosPage()));
    PageManager.registerPage('offerCreateDescription', MainLayout.process(new OfferCreateDescriptionPage()));


}