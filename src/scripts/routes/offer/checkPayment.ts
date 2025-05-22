
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

/**
 * @interface CheckPaymentRouteParams
 * @description Интерфейс для параметров маршрута страницы проверки оплаты.
 */
interface CheckPaymentRouteParams {
    /**
     * @property {number} id ID объявления.
     */
    id: string;
    /**
     * @property {number} paymentId ID оплаты.
     */
    paymentId: string;
}

/**
 * @class CheckPaymentRoute
 * @description Класс для обработки маршрута страницы проверки оплаты.
 * @augments BaseRoute
 */
export class CheckPaymentRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     * @param {string} id ID объявления.
     * @param paymentId IU платежа
     */
    process({id, paymentId}: CheckPaymentRouteParams) {
        const idNumber = parseInt(id, 10);
        const paymentIdNumber = parseInt(paymentId, 10);
        if (isNaN(idNumber) || isNaN(paymentIdNumber)) {
            RouteManager.navigateTo('/');
            return;
        }
        PageManager.renderPage('checkPayment', {id: idNumber, paymentId: paymentIdNumber});
    }
}