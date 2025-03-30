'use strict';

import MainLayout from "../layouts/main/template.precompiled.js";
import OfferCreateLayout from "../layouts/offerCreate/template.precompiled.js";

/**
 * @function registerLayouts
 * @description Регистрация layout-ов
 */
export default function registerLayouts() {
    const layouts = [
        [MainLayout, 'MainLayout'],
        [OfferCreateLayout, 'OfferCreateLayout'],
    ];

    layouts.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}