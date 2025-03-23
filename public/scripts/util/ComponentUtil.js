'use strict';

import BackgroundlessButton from '../components/BackgroundlessButton/BackgroundlessButton.precompiled.js';
import Card from '../components/Card/Card.precompiled.js';
import ChevronLeft from '../components/Chevron/ChevronLeft/ChevronLeft.precompiled.js';
import ChevronRight from '../components/Chevron/ChevronRight/ChevronRight.precompiled.js';
import Header from '../components/Header/Header.precompiled.js';
import HeaderAuthorized from "../components/Header/HeaderAuthorized.precompiled.js";
import HeartButton from '../components/HeartButton/HeartButton.precompiled.js';
import HousingComplexCarousel from '../components/HousingComplex/Carousel/HousingComplexCarousel.precompiled.js';
import HousingComplexInformation from '../components/HousingComplex/Information/HousingComplexInformation.precompiled.js';
import HousingComplexReviews from '../components/HousingComplex/Reviews/HousingComplexReviews.precompiled.js';
import Input from '../components/Input/Input.precompiled.js';
import LightButton from '../components/LightButton/LightButton.precompiled.js';
import Login from '../components/Login/Login.precompiled.js';
import Logo from '../components/Logo/Logo.precompiled.js';
import OfferCreateBtns from "../components/OfferCreateBtns/OfferCreateBtns.precompiled.js";
import OfferCreateNav from "../components/OfferCreateNav/OfferCreateNav.precompiled.js";
import OfferCreateTitle from "../components/OfferCreateTitle/OfferCreateTitle.precompiled.js";
import MetroStation from '../components/MetroStation/MetroStation.precompiled.js';
import PicturesCarousel from '../components/PicturesCarousel/PicturesCarousel.precompiled.js';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.precompiled.js';
import ProfileLeft from '../components/ProfileLeft/ProfileLeft.precompiled.js';
import ProfileOffer from "../components/ProfileOffer/ProfileOffer.precompiled.js";
import ProfilePreview from "../components/ProfilePreview/ProfilePreview.precompiled.js";
import RedButton from "../components/RedButton/RedButton.precompiled.js";
import SelectButton from "../components/SelectButton/SelectButton.precompiled.js";
import UserAvatar from "../components/UserAvatar/UserAvatar.precompiled.js";

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
        [HeartButton, 'HeartButton'],
        [HousingComplexCarousel, 'HousingComplexCarousel'],
        [HousingComplexInformation, 'HousingComplexInformation'],
        [HousingComplexReviews, 'HousingComplexReviews'],
        [ChevronLeft, 'ChevronLeft'],
        [ChevronRight, 'ChevronRight'],
        [PicturesCarousel, 'PicturesCarousel'],
        [MetroStation, 'MetroStation']
    ];

    components.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}