
import BackgroundlessButton from '../components/backgroundlessButton/template.precompiled.js';
import Card from '../components/card/template.precompiled.js';
import Characteristic from "../components/characteristic/template.precompiled.js";
import ChevronLeft from '../components/chevron/left/template.precompiled.js';
import ChevronRight from '../components/chevron/right/template.precompiled.js';
import ChoiceButtons from "../components/choiceButtons/template.precompiled.js";
import Filter from "../components/filter/template.precompiled.js";
import FilterCheckList from "../components/filterCheckList/template.precompiled.js";
import FilterCheckListSelect from "../components/filterCheckListSelect/template.precompiled.js";
import FilterDoubleInput from "../components/filterDoubleInput/template.precompiled.js";
import FilterDoubleInputSelect from "../components/filterDoubleInputSelect/template.precompiled.js";
import FilterSelect from "../components/filterSelect/template.precompiled.js";
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
import OfferDetailsLeft from "../components/offerDetailsLeft/template.precompiled.js";
import PicturesCarousel from '../components/picturesCarousel/template.precompiled.js';
import PrimaryButton from '../components/primaryButton/template.precompiled.js';
import ProfileDataInput from "../components/profileDataInput/template.precompiled.js";
import ProfileFavorite from "../components/profileFavorite/template.precompiled.js";
import ProfileLeft from '../components/profileLeft/template.precompiled.js';
import ProfileOffer from "../components/profileOffer/template.precompiled.js";
import ProfilePreview from "../components/profilePreview/template.precompiled.js";
import ProgressBar from "../components/progressBar/template.precompiled.js";
import RedButton from "../components/redButton/template.precompiled.js";
import SearchListOffer from "../components/searchListOffer/template.precompiled.js";
import UserAvatar from "../components/userAvatar/template.precompiled.js";
import PicturesCarouselPreviews from "../components/picturesCarouselPreviews/template.precompiled.js";
import BaseModal from "../components/baseModal/template.precompiled.js";
import SubmitModal from "../components/submitModal/template.precompiled.js";
import PasswordInput from "../components/passwordInput/template.precompiled.js";
import ClearInput from "../components/clearInput/template.precompiled.js";
import AddressInput from "../components/addressInput/template.precompiled.js";
import Popup from "../components/popup/template.precompiled.js";
import Popups from "../components/popups/template.precompiled.js";
import BottomNavigationBar from "../components/bottomNavigationBar/template.precompiled.js";
import Csat from "../components/csat/template.precompiled.js"
import CsatStatsAvg from "../components/csatStatsAvg/template.precompiled.js";
import Cluster from "../components/cluster/template.precompiled.js";
import Balloon from "../components/balloon/template.precompiled.js";
import OfferDetailsGraph from "../components/offerDetailsGraph/template.precompiled.js";
import OfferDetailsGraphPopup from "../components/offerDetailsGraphPopup/template.precompiled.js";

/**
 * @function registerComponents
 * @description Регистрация компонентов
 */
// eslint-disable-next-line max-lines-per-function
export default function registerComponents() {
    const components: [Handlebars.TemplateDelegate, string][] = [
        [AddressInput, 'AddressInput'],
        [BackgroundlessButton, 'BackgroundlessButton'],
        [BaseModal, 'BaseModal'],
        [Card, 'Card'],
        [Characteristic, 'Characteristic'],
        [ChevronLeft, 'ChevronLeft'],
        [ChevronRight, 'ChevronRight'],
        [ChoiceButtons, 'ChoiceButtons'],
        [ClearInput, 'ClearInput'],
        [Filter, 'Filter'],
        [FilterCheckList, 'FilterCheckList'],
        [FilterCheckListSelect, 'FilterCheckListSelect'],
        [FilterDoubleInput, 'FilterDoubleInput'],
        [FilterDoubleInputSelect, 'FilterDoubleInputSelect'],
        [FilterSelect, 'FilterSelect'],
        [Header, 'Header'],
        [HeaderAuthorized, 'HeaderAuthorized'],
        [HeartButton, 'HeartButton'],
        [HousingComplexInformation, 'HousingComplexInformation'],
        [HousingComplexReviews, 'HousingComplexReviews'],
        [HousingComplexSlider, 'HousingComplexSlider'],
        [Input, 'Input'],
        [LightButton, 'LightButton'],
        [Loader, 'Loader'],
        [Login, 'Login'],
        [Logo, 'Logo'],
        [MetroStation, 'MetroStation'],
        [OfferCreateBtns, 'OfferCreateBtns'],
        [OfferCreateNav, 'OfferCreateNav'],
        [OfferCreatePhotosPreview, 'OfferCreatePhotosPreview'],
        [OfferCreateStage, 'OfferCreateStage'],
        [OfferCreateTitle, 'OfferCreateTitle'],
        [OfferDetailsHeader, 'OfferDetailsHeader'],
        [OfferDetailsInfo, 'OfferDetailsInfo'],
        [OfferDetailsLeft, 'OfferDetailsLeft'],
        [PasswordInput, 'PasswordInput'],
        [PicturesCarousel, 'PicturesCarousel'],
        [PicturesCarouselPreviews, 'PicturesCarouselPreviews'],
        [Popup, 'Popup'],
        [Popups, 'Popups'],
        [PrimaryButton, 'PrimaryButton'],
        [ProfileDataInput, 'ProfileDataInput'],
        [ProfileFavorite, 'ProfileFavorite'],
        [ProfileLeft, 'ProfileLeft'],
        [ProfileOffer, 'ProfileOffer'],
        [ProfilePreview, 'ProfilePreview'],
        [ProgressBar, 'ProgressBar'],
        [RedButton, 'RedButton'],
        [SearchListOffer, 'SearchListOffer'],
        [SubmitModal, 'SubmitModal'],
        [UserAvatar, 'UserAvatar'],
        [BottomNavigationBar, 'BottomNavigationBar'],
        [Csat, 'Csat'],
        [CsatStatsAvg, 'CsatStatsAvg'],
        [Cluster, 'Cluster'],
        [Balloon, 'Balloon'],
        [OfferDetailsGraph, 'OfferDetailsGraph'],
        [OfferDetailsGraphPopup, 'OfferDetailsGraphPopup']
    ];

    components.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}
