
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";
import User from "../../../models/user.ts";
import {getFavoritesOffers, searchOffers} from "../../../util/apiUtil.ts";
import Offer from "../../../models/offer.ts";
import profilePreviewTemplate from "../../../components/profilePreview/template.precompiled.js";
import {BaseLayout} from "../../../layouts/baseLayout.ts";
import RouteManager from "../../../managers/routeManager/routeManager.ts";
import OfferCreateLayout from "../../../layouts/offerCreate";

/**
 * @class ProfileMainPage
 * @description Основная страница профиля
 * @augments Page
 */
export default class ProfileMainPage extends Page {
    private layout: BaseLayout | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root} : PageRenderInterface) {
        root.innerHTML = template();
        this.layout = layout;
        super.render({layout, root});

        this.updateMyOffers();
        this.updateMyFavorites();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('profileMyOffersPreviews', 'click', this.handlePreviewClick);
        this.initListener('profileFavoritesPreviews', 'click', this.handlePreviewClick);
        this.initListener('profileBlockCreateOfferButton', 'click', this.handleCreateOfferButton);
        this.initListener('profileBlockMyOffersButton', 'click', this.handleMyOffersButton);
        this.initListener('profileBlockFindOfferButton', 'click', this.handleFindOfferButton);
        this.initListener('profileBlockFavoritesButton', 'click', this.handleFavoritesButton);
        this.initListener('profileRightPromotionButton', 'click', this.handleMyOffersButton);
    }

    /**
     * @function handleMyOffersButton
     * @description Метод обработки клика по кнопке "Мои объявления".
     * @param {Event} event событие
     */
    private handleMyOffersButton(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile/offers');
    }

    /**
     * @function handleFavoritesButton
     * @description Метод обработки клика по кнопке "Избранное".
     * @param {Event} event событие
     */
    private handleFavoritesButton(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile/favorites');
    }

    /**
     * @function handleCreateOfferButton
     * @description Метод обработки клика по кнопке создания объявления.
     * @param {Event} event событие
     */
    private handleCreateOfferButton(event: Event) {
        event.preventDefault();
        OfferCreateLayout.init();
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @function handleFindOfferButton
     * @description Метод обработки клика по кнопке найти объявление.
     * @param {Event} event событие
     */
    private handleFindOfferButton(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/searchList');
    }


    /**
     * @function handlePreviewClick
     * @description Метод обработки клика по превью объявления.
     * @param {Event} event событие
     */
    private handlePreviewClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        let parent = target;
        while (parent.parentElement && !parent.classList.contains('profile__preview')) {
            parent = parent.parentElement as HTMLElement;
        }

        if (!parent || typeof parent.dataset.id !== 'string') {
            return;
        }
        const offerId = parseInt(parent.dataset.id, 10);
        if (isNaN(offerId)) {
            return;
        }
        event.preventDefault();

        RouteManager.navigateTo(`/offer/details/${offerId}`);

    }

    /**
     * @function updateMyOffers
     * @description Метод отображения "мои объявления".
     */
    private updateMyOffers() {
        const myOffersList = document.getElementById('profileMyOffersPreviews') as HTMLElement;
        const myOffersButton = document.getElementById('profileBlockMyOffersButton') as HTMLElement;
        const createOfferButton = document.getElementById('profileBlockCreateOfferButton') as HTMLElement;
        if (!myOffersList || !this.layout) {
            return;
        }
        myOffersList.innerHTML = '';
        const user = User.getData();
        if (!user || typeof user.id !== 'number') {
            return;
        }
        this.layout.makeRequest(searchOffers, {
            'me': 'true',
        }).then((response) => {
            let myOffersCnt = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.forEach((offerData: any) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                myOffersCnt++;
                if (myOffersCnt > 3) {
                    myOffersButton.classList.add('active');
                } else {
                    myOffersList.innerHTML += profilePreviewTemplate({
                        id: offer.id,
                        title: `${offer.offerType === 'Продажа' ? 'Продажа' : 'Сдача'} ${offer.rooms}-комн. ${offer.propertyType.toLowerCase()}, ${offer.area} м²`,
                        address: offer.address,
                        image: offer.images[0]
                    });
                }
            });
            if (myOffersCnt === 0) {
                createOfferButton.classList.add('active');
            }
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }

    /**
     * @function updateMyFavorites
     * @description Метод отображения списка избранного.
     */
    private updateMyFavorites() {
        const favoritesList = document.getElementById('profileFavoritesPreviews') as HTMLElement;
        const favoritesButton = document.getElementById('profileBlockFavoritesButton') as HTMLElement;
        const findOfferButton = document.getElementById('profileBlockFindOfferButton') as HTMLElement;
        if (!favoritesList || !this.layout) {
            return;
        }
        favoritesList.innerHTML = '';
        const user = User.getData();
        if (!user || typeof user.id !== 'number') {
            return;
        }
        this.layout.makeRequest(getFavoritesOffers).then((response) => {
            let favoritesCnt = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.forEach((offerData: any) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                favoritesCnt++;
                if (favoritesCnt > 3) {
                    favoritesButton.classList.add('active');
                } else {
                    favoritesList.innerHTML += profilePreviewTemplate({
                        id: offer.id,
                        title: `${offer.offerType === 'Продажа' ? 'Продажа' : 'Сдача'} ${offer.rooms}-комн. ${offer.propertyType.toLowerCase()}, ${offer.area} м²`,
                        address: offer.address,
                        image: offer.images[0]
                    });
                }
            });
            if (favoritesCnt === 0) {
                findOfferButton.classList.add('active');
            }
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }
}