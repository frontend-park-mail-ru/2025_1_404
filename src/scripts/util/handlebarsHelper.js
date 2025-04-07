'use strict'

import Handlebars from "handlebars";

/**
 * @function renderRating
 * @param {number} rating - Рейтинг от 1 до 5
 * @returns {Handlebars.SafeString} HTML-строка с иконками звезд
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

/**
 * @function registerHandlebarsHelpers
 * @description Регистрация хелперов Handlebars
 */
export default function registerHandlebarsHelpers() {
    Handlebars.registerHelper('renderRating', renderRating);
    Handlebars.registerHelper('split', split);
}
