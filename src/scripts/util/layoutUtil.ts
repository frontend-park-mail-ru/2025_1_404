
import BaseLayout from "../layouts/template.precompiled.js";
import Handlebars from "handlebars";
import MainLayout from "../layouts/main/template.precompiled.js";
import OfferCreateLayout from "../layouts/offerCreate/template.precompiled.js";
import OfferEditLayout from "../layouts/offerEdit/template.precompiled.js";
import ProfileLayout from "../layouts/profile/template.precompiled.js";

/**
 * @function registerLayouts
 * @description Регистрация layout-ов
 */
export default function registerLayouts() {
    const layouts: [Handlebars.TemplateDelegate, string][] = [
        [BaseLayout, 'BaseLayout'],
        [MainLayout, 'MainLayout'],
        [OfferCreateLayout, 'OfferCreateLayout'],
        [OfferEditLayout, 'OfferEditLayout'],
        [ProfileLayout, 'ProfileLayout']
    ];

    layouts.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}