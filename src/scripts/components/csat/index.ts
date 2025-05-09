import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';
import CsatUtil from "../../util/csatUtil.ts";

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
    private boundOnCSATMessage = this.onCSATMessage.bind(this);

    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        window.addEventListener('message', this.boundOnCSATMessage);
    }

    onCSATMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        switch (data.status) {
            case 'close':
                this.hide();
                break;
            case 'submit':
                this.layout?.makeRequest(CsatUtil.answerToQuestion.bind(CsatUtil), data.questionId, data.rating)
                this.hide();
                break;
            default:
                break;
        }
    }

    destroy() {
        super.destroy();
        window.removeEventListener('message', this.boundOnCSATMessage);
    }

    show({type, title, questionId} : {type: CSATType, title: string, questionId: number}) {
        const element = document.getElementById('csat') as HTMLIFrameElement;
        if (!element){
            return;
        }
        element.style.display = '';

        element.contentWindow?.postMessage(JSON.stringify({
            type,
            title,
            questionId
        }), '*')
    }

    hide() {
        const element = document.getElementById('csat') as HTMLIFrameElement;
        if (!element){
            return;
        }
        element.style.display = 'none';
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