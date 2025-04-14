
/**
 * @class BaseRoute
 * @description Базовый класс маршрута.
 */
export default abstract class BaseRoute<T = unknown> {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    abstract process(params?: T): void;
}