'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class ProgressBar
 * @description Компонент прогресс бара
 * @extends BaseComponent
 */
export default class ProgressBar extends BaseComponent {
    constructor({page, layout}) {
        super({page, layout});
    }

    render() {
        return template();
    }

    setPercentage(percent) {
        const correctedPercent = Math.min(Math.max(percent, 0), 100);
        const [progressBar] = document.getElementsByClassName('progressBar__line');
        if (correctedPercent === 100) {
            progressBar.addEventListener('transitionend', function reset() {
                console.log(progressBar.style.width)
                if (progressBar.style.width !== '100%') {
                    return;
                }
                progressBar.style.width = '0%';
                progressBar.removeEventListener('transitionend', reset);
            });
        }
        progressBar.style.width = `${correctedPercent}%`;
    }
}