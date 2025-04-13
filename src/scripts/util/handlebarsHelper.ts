
import Handlebars from "handlebars";

/**
 * @function renderRating
 * @param {number} rating - Рейтинг от 1 до 5
 * @returns {Handlebars.SafeString} HTML-строка с иконками звезд
 */
const renderRating = function(rating: number) {
    const maxRating = 5;
    const stars =   '<i class="fa-solid fa-star"></i>'.repeat(rating) +
                    '<i class="fa-regular fa-star"></i>'.repeat(maxRating - rating);

    return new Handlebars.SafeString(stars);
}

const split = function(str: string) {
    return str.split(';');
}

const join = function(array: string[]) {
    if (!array) {
        return '';
    }
    return array.join(', ');
};

const breakLines = function(text: string) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
}

/**
 * @function registerHandlebarsHelpers
 * @description Регистрация хелперов Handlebars
 */
export default function registerHandlebarsHelpers() {
    Handlebars.registerHelper('renderRating', renderRating);
    Handlebars.registerHelper('split', split);
    Handlebars.registerHelper('join', join);
    Handlebars.registerHelper('breakLines', breakLines);
}
