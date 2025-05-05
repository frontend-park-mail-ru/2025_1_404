import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ProgressBar
 * @description Компонент прогресс бара
 * @augments BaseComponent
 */
export default class ProgressBar extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }

    /**
     * @function setPercentage
     * @description Метод установки процента прогресс бара.
     * @param {number} percent - процент от 0 до 100.
     */
    setPercentage(percent: number) {
        const correctedPercent = Math.min(Math.max(percent, 0), 100);
        const progressBar = document.getElementsByClassName('progressBar__line')[0] as HTMLElement;
        progressBar.style.width = `${correctedPercent}%`;
        if (correctedPercent === 100) {
            // Todo: сделать нормально
            if (progressBar.style.width !== '100%') {
                return;
            }
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    progressBar.style.width = '0%';
                    progressBar.style.opacity = '1';
                }, 500)
            }, 300);
        }
    }
}