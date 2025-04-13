
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

/**
 * @function split
 * @description Разделяет строку на массив строк по разделителю ';'
 * @param {string} str - Строка для разделения
 * @returns {string[]} Массив строк
 */
const split = function(str: string) {
    return str.split(';');
}

/**
 * @function join
 * @description Объединяет массив строк в строку с разделителем ', '
 * @param {string[]} array - Массив строк для объединения
 * @returns {string} Объединенная строка
 */
const join = function(array: string[]) {
    if (!array) {
        return '';
    }
    return array.join(', ');
};

/**
 * @function breakLines
 * @description Заменяет символы новой строки на <br> в строке
 * @param {text} text - Строка для обработки
 * @returns {Handlebars.SafeString} Обработанная строка с <br>
 */
const breakLines = function(text: string) {
    const escapedText = Handlebars.Utils.escapeExpression(text);
    const withBreaks = escapedText.replace(/(?:\r\n|\n|\r)/gmu, '<br>');
    return new Handlebars.SafeString(withBreaks);
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
