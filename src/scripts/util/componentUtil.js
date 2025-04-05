'use strict';

import BackgroundlessButton from '../components/backgroundlessButton/template.precompiled.js';
import Card from '../components/card/template.precompiled.js';
import Characteristic from "../components/characteristic/template.precompiled.js";
import ChevronLeft from '../components/chevron/left/template.precompiled.js';
import ChevronRight from '../components/chevron/right/template.precompiled.js';
import Handlebars from "handlebars";
import Header from '../components/header/template.precompiled.js';
import HeaderAuthorized from "../components/header/templateAuthorized.precompiled.js";
import HeartButton from '../components/heartButton/template.precompiled.js';
import HousingComplexInformation from '../components/housingComplex/housingComplexInformation/template.precompiled.js';
import HousingComplexReviews from '../components/housingComplex/housingComplexReviews/template.precompiled.js';
import HousingComplexSlider from "../components/housingComplex/housingComplexSlider/template.precompiled.js";
import Input from '../components/input/template.precompiled.js';
import LightButton from '../components/lightButton/template.precompiled.js';
import Loader from "../components/loader/template.precompiled.js";
import Login from '../components/login/template.precompiled.js';
import Logo from '../components/logo/template.precompiled.js';
import MetroStation from '../components/metroStation/template.precompiled.js';
import OfferCreateBtns from "../components/offerCreateBtns/template.precompiled.js";
import OfferCreateNav from "../components/offerCreateNav/template.precompiled.js";
import OfferCreatePhotosPreview from "../components/offerCreatePhotosPreview/template.precompiled.js";
import OfferCreateStage from "../components/offerCreateStage/template.precompiled.js";
import OfferCreateTitle from "../components/offerCreateTitle/template.precompiled.js";
import OfferDetailsHeader from "../components/offerDetailsHeader/template.precompiled.js";
import OfferDetailsInfo from "../components/offerDetailsInfo/template.precompiled.js";
import OfferDetailsSlider from "../components/offerDetailsSlider/template.precompiled.js";
import PicturesCarousel from '../components/picturesCarousel/template.precompiled.js';
import PrimaryButton from '../components/primaryButton/template.precompiled.js';
import ProfileDataInput from "../components/profileDataInput/template.precompiled.js";
import ProfileLeft from '../components/profileLeft/template.precompiled.js';
import ProfileOffer from "../components/profileOffer/template.precompiled.js";
import ProfilePreview from "../components/profilePreview/template.precompiled.js";
import ProgressBar from "../components/progressBar/template.precompiled.js";
import RedButton from "../components/redButton/template.precompiled.js";
import SelectButton from "../components/selectButton/template.precompiled.js";
import UserAvatar from "../components/userAvatar/template.precompiled.js";

/**
 * @function registerComponents
 * @description Регистрация компонентов
 */
export default function registerComponents() {
    const components = [
        [PrimaryButton, 'PrimaryButton'],
        [Header, 'Header'],
        [HeaderAuthorized, 'HeaderAuthorized'],
        [UserAvatar, 'UserAvatar'],
        [SelectButton, 'SelectButton'],
        [Card, 'Card'],
        [Logo, 'Logo'],
        [Input, 'Input'],
        [Login, 'Login'],
        [LightButton, 'LightButton'],
        [BackgroundlessButton, 'BackgroundlessButton'],
        [HeartButton, 'HeartButton'],
        [ProfileLeft, 'ProfileLeft'],
        [ProfilePreview, 'ProfilePreview'],
        [RedButton, 'RedButton'],
        [ProfileOffer, 'ProfileOffer'],
        [OfferCreateNav, 'OfferCreateNav'],
        [OfferCreateBtns, 'OfferCreateBtns'],
        [OfferCreateTitle, 'OfferCreateTitle'],
        [OfferCreatePhotosPreview, 'OfferCreatePhotosPreview'],
        [OfferCreateStage, 'OfferCreateStage'],
        [HousingComplexSlider, 'HousingComplexSlider'],
        [HousingComplexInformation, 'HousingComplexInformation'],
        [HousingComplexReviews, 'HousingComplexReviews'],
        [ChevronLeft, 'ChevronLeft'],
        [ChevronRight, 'ChevronRight'],
        [PicturesCarousel, 'PicturesCarousel'],
        [MetroStation, 'MetroStation'],
        [Characteristic, 'Characteristic'],
        [OfferDetailsHeader, 'OfferDetailsHeader'],
        [OfferDetailsSlider, 'OfferDetailsSlider'],
        [OfferDetailsInfo, 'OfferDetailsInfo'],
        [Loader, 'Loader'],
        [ProgressBar, 'ProgressBar'],
        [ProfileDataInput, 'ProfileDataInput']
    ];

    components.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}
