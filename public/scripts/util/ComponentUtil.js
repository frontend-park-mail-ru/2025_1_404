'use strict';

import PrimaryButton from '../components/PrimaryButton/PrimaryButton.precompiled.js';

/**
 * @description Регистрация компонентов
 */
export default function registerComponents() {
    Handlebars.registerPartial('PrimaryButton', PrimaryButton);
}