'use strict';

// TODO: Пока временный костыль, нужно найти решение как это через условный массив все делать
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.precompiled.js';

export default function registerComponents() {
    Handlebars.registerPartial('PrimaryButton', PrimaryButton);
}