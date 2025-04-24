
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";
import {BaseLayout} from "../../../layouts/baseLayout.ts";
import {searchOffers} from "../../../util/apiUtil.ts";
import profileOfferTemplate from "../../../components/profileOffer/template.precompiled.js"
import Offer from "../../../models/offer.ts";
import getMetroColorByLineName from "../../../util/metroUtil.ts";
import RouteManager from "../../../managers/routeManager/routeManager.ts";
import User from "../../../models/user.ts";
import OfferEditLayout from "../../../layouts/offerEdit";
import OfferMock from "../../../models/offerMock.ts";

/**
 * @class ProfileMyOffersPage
 * @description Страница "мои объявления" в профиле
 * @augments Page
 */
export default class ProfileMyOffersPage extends Page {
    private layout: BaseLayout | undefined;
    private offerStatus: string = '';
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root} : PageRenderInterface) {
        this.layout = layout;
        root.innerHTML = template();
        this.offerStatus = '';
        super.render({layout, root});
        this.updateContent(this.offerStatus);
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('profile-right-nav', 'click', this.handleTabClick);
        this.initListener('profile-right-list', 'click', this.handleCardClick);
    }

    /**
     * @function handleCardClick
     * @description Метод обработки клика по карточке объявления.
     * @param {Event} event событие
     */
    private handleCardClick(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        let parent = target;
        while (parent.parentElement && !parent.classList.contains('profile__offer')) {
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
        if (target.classList.contains('profile__offer-link')) {
            RouteManager.navigateTo(`/offer/details/${offerId}`);
        }
        if (target.classList.contains("light-btn")) {
            OfferEditLayout.reset();
            this.layout?.emit('editOffer', offerId);
        }
        if (target.classList.contains("red-btn")) {
            this.layout?.emit('tryDelete', offerId);
        }
    }

    /**
     * @function handleTabClick
     * @description Метод обработки клика по вкладке.
     * @param {Event} event событие
     */
    private handleTabClick(event: Event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('profile__right-nav-href') && target.dataset && target.dataset.tab && target.dataset.offerstatus) {
            event.preventDefault();
            this.offerStatus = target.dataset.offerstatus;
            this.setActiveTab(parseInt(target.dataset.tab, 10));
            this.updateContent(this.offerStatus);
        }
    }

    /**
     * @function updateContent
     * @description Метод обновления контента страницы.
     * @param {number} offerType тип объявления
     */
    private updateContent(offerType: string) {
        const offerList = document.querySelector('.profile__right-list') as HTMLElement;
        if (!offerList || !this.layout) {
            return;
        }
        offerList.innerHTML = '';
        const user = User.getData();
        if (!user || typeof user.id !== 'number') {
            return;
        }
        this.layout.makeRequest(searchOffers, {
            'seller_id': user.id.toString(),
            'offer_type_id': offerType,
            'offer_status_id': '1'
        }).then((response) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.forEach((offerData: any) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                let cardTitle = `${offer.price.toLocaleString('ru-RU')} ₽`;
                if (offer.offerType === 'Аренда') {
                    cardTitle = 'Аренда: ' + cardTitle;
                    cardTitle += `/${offer.rentType === 'Долгосрок' ? 'мес.' : 'сут.'}`
                }
                else {
                    cardTitle = 'Продажа: ' + cardTitle;
                }
                offerList.innerHTML += profileOfferTemplate({
                    id: offer.id,
                    title: cardTitle,
                    metroStation: offer.metroStation || 'Нет',
                    address: offer.address,
                    rooms: offer.rooms,
                    square: offer.area,
                    floor: offer.floor,
                    totalFloors: offer.totalFloors,
                    metroColor: getMetroColorByLineName(offer.metroLine),
                    image: offer.images[0],
                    views: offer.sellDetails.views,
                    favorites: offer.sellDetails.favorites,
                    likes: offer.sellDetails.likes
                });
            });
        }).catch((error) => {
            this.layout?.addPopup('Ошибка сервера', error.message);
        })
    }

    /**
     * @function setActiveTab
     * @description Метод установки активной вкладки.
     * @param {number} tabIndex индекс вкладки
     */
    private setActiveTab(tabIndex: number) {
        const tabs = document.querySelectorAll('.profile__right-nav-href');
        tabs.forEach((tab, index) => {
            if (index === tabIndex) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
}