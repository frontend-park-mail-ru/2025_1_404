import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';

export enum CSATType {
    STARS = 'csat_stars',
    SCORE = 'csat_score'
}

/**
 * @class Csat
 * @description Компонент Csat опроса.
 * @augments BaseComponent
 */
export default class Csat extends BaseComponent {
    private element: HTMLElement | undefined;

    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this.element = document.getElementById('csat') as HTMLElement;
    }

    show({type, title} : {type: CSATType, title: string}) {
        if (!this.element) {
            return;
        }
        // this.element.
    }

    /**
         * @function render
         * @description Метод рендеринга компонента.
         * @returns {string} HTML-строка с разметкой компонента.
         */
        render() {
            return template();
    }
}