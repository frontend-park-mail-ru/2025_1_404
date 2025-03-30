'use strict';

import IndexPage from "../pages/index/index.js";
import MainLayout from "../layouts/main/index.js";
import OfferCreateAddressPage from "../pages/offerCreate/address/index.js";
import OfferCreateDescriptionPage from "../pages/offerCreate/description/index.js";
import OfferCreateParamsPage from "../pages/offerCreate/params/index.js";
import OfferCreatePhotosPage from "../pages/offerCreate/photos/index.js";
import OfferCreatePricePage from "../pages/offerCreate/price/index.js";
import OfferCreateTypePage from "../pages/offerCreate/type/index.js";
import PageManager from "../managers/pageManager.js";
import ProfileMainPage from "../pages/profile/main/index.js";
import ProfileMyOffersPage from "../pages/profile/offers/index.js";
import RegisterPage from "../pages/register/index.js";
import UnknownPage from "../pages/404/index.js";
import OfferCreateLayout from "../layouts/offerCreate/index.js";
import HousingComplexPage from "../pages/housingComplex/index.js";
import OfferDetailsPage from "../pages/offerDetails/index.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    const mainLayout = new MainLayout();

    PageManager.registerPage('index', mainLayout.process(new IndexPage()));
    PageManager.registerPage('register', new RegisterPage());
    PageManager.registerPage('404', mainLayout.process(new UnknownPage()));

    PageManager.registerPage('main', mainLayout.process(new ProfileMainPage()));
    PageManager.registerPage('offers', mainLayout.process(new ProfileMyOffersPage()));

    PageManager.registerPage('type', OfferCreateLayout.process(new OfferCreateTypePage("type")));
    PageManager.registerPage('address', OfferCreateLayout.process(new OfferCreateAddressPage("address")));
    PageManager.registerPage('params', OfferCreateLayout.process(new OfferCreateParamsPage("params")));
    PageManager.registerPage('price', OfferCreateLayout.process(new OfferCreatePricePage("price")));
    PageManager.registerPage('photos', OfferCreateLayout.process(new OfferCreatePhotosPage("photos")));
    PageManager.registerPage('description', OfferCreateLayout.process(new OfferCreateDescriptionPage("description")));

    PageManager.registerPage('zhk', mainLayout.process(new HousingComplexPage()));

    PageManager.registerPage('offerDetails', mainLayout.process(new OfferDetailsPage()));
}