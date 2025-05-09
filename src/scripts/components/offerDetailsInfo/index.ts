import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import OfferEditLayout from "../../layouts/offerEdit/index.ts";
import {likeOfer} from "../../util/apiUtil.ts";
import LikeButton from "../likeButton";

/**
 * @class OfferDetailsInfo
 * @description Компонент информации страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsInfo extends BaseComponent {
    public likeButton: LikeButton;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this.likeButton = new LikeButton({page, layout});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerDetailsSellerBtns', 'click', this.offerDetailsSellerBtnsHandler);
    }

    /**
     * @function offerDetailsSellerBtnsHandler
     * @description Метод обработки клика по ссылке на кнопки в блоке информации о продавце
     * @param {Event} event событие
     */
    private offerDetailsSellerBtnsHandler(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target && target.parentElement) {
            const parent = target.parentElement;
            if (!parent.dataset.id) {
                return;
            }
            if (target.id === 'offerDetailsChangeButton') {
                OfferEditLayout.reset();
                this.layout?.emit('editOffer', parent.dataset.id)
                return;
            }
            this.layout?.emit('tryDelete', parent.dataset.id);
        }
    }
}