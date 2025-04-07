'use strict'

import Handlebars from "handlebars";

/**
 * @function registerHandlebarsHelpers
 * @description Регистрация helper для Handlebars
 */

const renderRating = function(rating) {
    const maxRating = 5;
    const stars =   '<i class="fa-solid fa-star"></i>'.repeat(rating) +
                    '<i class="fa-regular fa-star"></i>'.repeat(maxRating - rating);

    return new Handlebars.SafeString(stars);
}

const split = function(str) {
    return str.split(';');
}

export default function registerHandlebarsHelpers() {
    Handlebars.registerHelper('renderRating', renderRating);
    Handlebars.registerHelper('split', split);
}
