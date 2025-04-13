
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";
import User from "../../../models/user.ts";
import {searchOffers} from "../../../util/apiUtil.ts";
import Offer from "../../../models/offer.ts";
import profilePreviewTemplate from "../../../components/profilePreview/template.precompiled.js";
import getMetroColorByLineName from "../../../util/metroUtil.ts";
import {BaseLayout} from "../../../layouts/baseLayout.ts";

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

    _updateMyOffers() {
        const offerType = 2;
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
            'seller_id': user.id.toString(),
            'offer_type_id': offerType.toString()
        }).then((response) => {
            let myOffersCnt = 0;
            response.forEach((offerData) => {
                const offer = new Offer();
                offer.parseJSON(offerData);
                myOffersCnt++;
                if (myOffersCnt > 3) {
                    console.log(myOffersButtton);
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