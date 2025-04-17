
import {BaseLayout} from "../layouts/baseLayout.ts";
import HousingComplexPage from "../pages/housingComplex/index.ts";
import IndexPage from "../pages/index/index.ts";
import MainLayout from "../layouts/main/index.ts";
import OfferCreateAddressPage from "../pages/offerCreate/address/index.ts";
import OfferCreateDescriptionPage from "../pages/offerCreate/description/index.ts";
import OfferCreateLayout from "../layouts/offerCreate/index.ts";
import OfferEditLayout from "../layouts/offerEdit/index.ts";
import OfferCreateParamsPage from "../pages/offerCreate/params/index.ts";
import OfferCreatePhotosPage from "../pages/offerCreate/photos/index.ts";
import OfferCreatePricePage from "../pages/offerCreate/price/index.ts";
import OfferCreateTypePage from "../pages/offerCreate/type/index.ts";
import OfferDetailsPage from "../pages/offerDetails/index.ts";
import PageManager from "../managers/pageManager.ts";
import ProfileLayout from "../layouts/profile/index.ts";
import ProfileMainPage from "../pages/profile/main/index.ts";
import ProfileMyOffersPage from "../pages/profile/offers/index.ts";
import RegisterPage from "../pages/register/index.ts";
import SearchPage from "../pages/search/index.ts";
import UnknownPage from "../pages/404/index.ts";
import OfferEditTypePage from "../pages/offerEdit/type";
import OfferEditAddressPage from "../pages/offerEdit/address";
import OfferEditParamsPage from "../pages/offerEdit/params";
import OfferEditPricePage from "../pages/offerEdit/price";
import OfferEditPhotosPage from "../pages/offerEdit/photos";
import OfferEditDescriptionPage from "../pages/offerEdit/description";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
// eslint-disable-next-line max-statements
export default function registerPages() {
    const mainLayout = new MainLayout();
    const baseLayout = new BaseLayout();

    PageManager.registerPage('index', mainLayout.process(new IndexPage()));
    PageManager.registerPage('register', baseLayout.process(new RegisterPage()));
    PageManager.registerPage('404', mainLayout.process(new UnknownPage()));

    PageManager.registerPage('main', ProfileLayout.process(new ProfileMainPage()));
    PageManager.registerPage('offers', ProfileLayout.process(new ProfileMyOffersPage()));

    PageManager.registerPage('type', OfferCreateLayout.process(new OfferCreateTypePage("type", 4)));
    PageManager.registerPage('address', OfferCreateLayout.process(new OfferCreateAddressPage("address", 3)));
    PageManager.registerPage('params', OfferCreateLayout.process(new OfferCreateParamsPage("params", 4)));
    PageManager.registerPage('price', OfferCreateLayout.process(new OfferCreatePricePage("price", 1)));
    PageManager.registerPage('photos', OfferCreateLayout.process(new OfferCreatePhotosPage("photos")));
    PageManager.registerPage('description', OfferCreateLayout.process(new OfferCreateDescriptionPage("description", 1)));

    PageManager.registerPage('edit_type', OfferEditLayout.process(new OfferEditTypePage("type", 4)));
    PageManager.registerPage('edit_address', OfferEditLayout.process(new OfferEditAddressPage("address", 3)));
    PageManager.registerPage('edit_params', OfferEditLayout.process(new OfferEditParamsPage("params", 4)));
    PageManager.registerPage('edit_price', OfferEditLayout.process(new OfferEditPricePage("price", 1)));
    PageManager.registerPage('edit_photos', OfferEditLayout.process(new OfferEditPhotosPage("photos")));
    PageManager.registerPage('edit_description', OfferEditLayout.process(new OfferEditDescriptionPage("description", 1)));

    PageManager.registerPage('zhk', mainLayout.process(new HousingComplexPage()));

    PageManager.registerPage('offerDetails', mainLayout.process(new OfferDetailsPage()));

    PageManager.registerPage('search', mainLayout.process(new SearchPage()));
}