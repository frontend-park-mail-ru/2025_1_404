
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";
import User from "../../../models/user.ts";
import {searchOffers} from "../../../util/apiUtil.ts";
import Offer from "../../../models/offer.ts";
import profilePreviewTemplate from "../../../components/profilePreview/template.precompiled.js";
import {BaseLayout} from "../../../layouts/baseLayout.ts";
import RouteManager from "../../../managers/routeManager/routeManager.ts";

/**
 * @class ProfileMainPage
 * @description Основная страница профиля
 * @augments Page
 */
export default class ProfileMainPage extends Page {
    private _layout: BaseLayout | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root} : PageRenderInterface) {
        root.innerHTML = template();
        this._layout = layout;
        super.render({layout, root});

        this._updateMyOffers();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('profileMyOffersPreviews', 'click', this._handlePreviewClick);
    }

    /**
     * @function _handleTabClick
     * @description Метод обработки клика по вкладке.
     * @param {Event} event событие
     */
    _handlePreviewClick(event: Event) {
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
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    _updateMyOffers() {
        const myOffersList = document.getElementById('profileMyOffersPreviews') as HTMLElement;
        const myOffersButtton = document.getElementById('profileBlockMyOffersButton') as HTMLElement;
        if (!myOffersList || !this._layout) {
            return;
        }
        myOffersList.innerHTML = '';
        const user = User.getData();
        if (!user || typeof user.id !== 'number') {
            return;
        }
        this._layout.makeRequest(searchOffers, {
            'seller_id': user.id.toString()
        }).then((response) => {
            let myOffersCnt = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response.forEach((offerData: any) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                myOffersCnt++;
                if (myOffersCnt > 3) {
                    myOffersButtton.classList.add('active');
                } else {
                    myOffersList.innerHTML += profilePreviewTemplate({
                        id: offer.id,
                        title: `${offer.offerType === 'Продажа' ? 'Продажа' : 'Сдача'} ${offer.rooms}-комн. ${offer.propertyType.toLowerCase()}, ${offer.area} м²`,
                        address: offer.address,
                        image: offer.images[0]
                    });
                }
            });
        }).catch((error) => {
            console.error('Error fetching myOffers:', error);
        })
    }
}