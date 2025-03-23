'use strict';

import HousingComlpexPage from "../pages/housing-complex/housing-complex.js";
import IndexPage from "../pages/index/index.js";
import MainLayout from "../layouts/main/MainLayout.js";
import OfferCreateAddressPage from "../pages/offerCreate/offerCreateAddress/offerCreateAddress.js";
import OfferCreateDescriptionPage from "../pages/offerCreate/offerCreateDescription/offerCreateDescription.js";
import OfferCreateParamsPage from "../pages/offerCreate/offerCreateParams/offerCreateParams.js";
import OfferCreatePhotosPage from "../pages/offerCreate/offerCreatePhotos/offerCreatePhotos.js";
import OfferCreatePricePage from "../pages/offerCreate/offerCreatePrice/offerCreatePrice.js";
import OfferCreateTypePage from "../pages/offerCreate/offerCreateType/offerCreateType.js";
import PageManager from "../managers/PageManager.js";
import ProfileMainPage from "../pages/profile/profileMain/profileMain.js";
import ProfileMyOffersPage from "../pages/profile/profileMyOffers/profileMyOffers.js";
import RegisterPage from "../pages/register/register.js";
import UnknownPage from "../pages/404/unknown.js";
import OfferCreateLayout from "../layouts/offerCreate/OfferCreateLayout.js";
import HousingComplexPage from "../pages/housing-complex/housing-complex.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    PageManager.registerPage('index', new MainLayout().process(new IndexPage()));
    PageManager.registerPage('register', new RegisterPage());
    PageManager.registerPage('404', new MainLayout().process(new UnknownPage()));

    PageManager.registerPage('profileMain', new MainLayout().process(new ProfileMainPage()));
    PageManager.registerPage('profileMyOffers', new MainLayout().process(new ProfileMyOffersPage()));

    PageManager.registerPage('offerCreateType', OfferCreateLayout.process(new OfferCreateTypePage()));
    PageManager.registerPage('offerCreateAddress', OfferCreateLayout.process(new OfferCreateAddressPage()));
    PageManager.registerPage('offerCreateParams', OfferCreateLayout.process(new OfferCreateParamsPage()));
    PageManager.registerPage('offerCreatePrice', OfferCreateLayout.process(new OfferCreatePricePage()));
    PageManager.registerPage('offerCreatePhotos', OfferCreateLayout.process(new OfferCreatePhotosPage()));
    PageManager.registerPage('offerCreateDescription', OfferCreateLayout.process(new OfferCreateDescriptionPage()));

    PageManager.registerPage('zhk', new MainLayout().process(new HousingComplexPage()));
}