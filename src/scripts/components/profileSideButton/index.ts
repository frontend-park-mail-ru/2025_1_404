import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ProfileSideButton
 * @description Компонент боковой кнопки профиля.
 * @augments BaseComponent
 */
export default class ProfileSideButton extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        this.initListener('profileSideButton', 'click', this.sideProfileHandler);
    }

    /**
     * @function sideProfileHandler
     * @description Обработчик события открытия окна данных профиля
     * @private
     */
    private sideProfileHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('toggleShowProfile');
    }
}