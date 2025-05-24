
import {Page, PageRenderInterface} from '../page';
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {checkPayment as checkPaymentAPI} from "../../util/apiUtil.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

/**
 * @class CheckPaymentPage
 * @description Страница проверки оплаты
 * @augments Page
 */
export default class CheckPaymentPage extends Page {
    private layout: BaseLayout | undefined;
    private title: HTMLElement | undefined;
    private profileButton: HTMLElement | undefined;

    /**
     * @function render
     * @description Метод рендеринга страницы проверки оплаты.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     * @param {Record<string, unknown>} props параметры страницы
     */
    render({root, layout, props}: PageRenderInterface) {
        if (!props || typeof props.id !== 'number' || typeof props.paymentId !== 'number') {
            return;
        }

        root.innerHTML = template();

        this.layout = layout;
        this.title = document.getElementById('title') as HTMLElement;
        this.profileButton = document.getElementById('checkPaymentProfile') as HTMLElement;

        this.checkPayment(props.id, props.paymentId);

        super.render({root});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('checkPaymentProfile', 'click', this.handleProfileButton);
    }

    /**
     * @function handleProfileButton
     * @description Метод обработки клика по кнопке возвращения в профиль.
     * @param {Event} event событие
     */
    handleProfileButton(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
    }

    checkPayment(offerId: number, paymentId: number) {
        this.layout?.makeRequest(checkPaymentAPI, offerId, paymentId).then((data) => {
            if (!this.title || !this.profileButton) {
                return;
            }
            if (data.is_active && data.is_paid) {
                this.title.textContent = 'Спасибо за покупку!';
                this.profileButton.classList.add('active');
                return;
            }
            this.title.textContent = 'Транкзация истекла.';
        }).catch((e) => {
            this.layout?.addPopup('Ошибка сервера', e.message);
        })
    }
}