'use strict';

// Базовый класс для всех страниц
export default class Page {
    // Рендер содержимого страницы
    render(root, path={}) {}

    // Своего рода деструктор. Щас используется для очистки event listener-ов
    destroy() {}
}