'use strict';

import MainLayout from "../layouts/main/MainLayout.precompiled.js";

/**
 * @function registerLayouts
 * @description Регистрация layout-ов
 */
export default function registerLayouts() {
    const layouts = [
        [MainLayout, 'MainLayout'],
    ];

    layouts.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}