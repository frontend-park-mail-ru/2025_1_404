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

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    window.pageManager.registerPage('index', new IndexPage());
    window.pageManager.registerPage('register', new RegisterPage());

    window.pageManager.registerPage('profileMain', new ProfileMainPage());
    window.pageManager.registerPage('profileMyOffers', new ProfileMyOffersPage());

    window.pageManager.registerPage('offerCreateType', new OfferCreateTypePage());
    window.pageManager.registerPage('offerCreateAddress', new OfferCreateAddressPage());
    window.pageManager.registerPage('offerCreateParams', new OfferCreateParamsPage());
    window.pageManager.registerPage('offerCreatePrice', new OfferCreatePricePage());
    window.pageManager.registerPage('offerCreatePhotos', new OfferCreatePhotosPage());
    window.pageManager.registerPage('offerCreateDescription', new OfferCreateDescriptionPage());


}