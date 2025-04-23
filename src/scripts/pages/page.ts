
import {BaseLayout} from "../layouts/baseLayout.ts";
import {validateFormInput} from "../util/validatorUtil.ts";

export interface PageRenderInterface {
    /**
     * @property {HTMLElement} root корневой элемент страницы
     */
    root: HTMLElement;
    /**
     * @property {BaseLayout} layout макет страницы, которая используется для рендеринга
     */
    layout?: BaseLayout;
    /**
     * @property {Record<string, unknown>} props дополнительные свойства/параметры страницы, которая используется для рендеринга
     */
    props?: Record<string, unknown>;
}

interface HandlerInterface {
    element: Element;
    handler: EventListenerOrEventListenerObject;
    type: string;
}

/**
 * @class Page
 * @description Базовый класс страницы
 */
export class Page {
    handlers: HandlerInterface[];
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.handlers = [];
    }

    /**
     * @function render
     * @description Метод, который вызывается при рендере страницы.
     */
    // eslint-disable-next-line no-empty-pattern
    render({}: PageRenderInterface): void {
        this.initListeners();
    }

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        this.removeListeners();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {}

    /**
     * @function initListener
     * @param {string} elementId id элемента
     * @param {string} type тип события
     * @param {Function} handler обработчик события
     */
    initListener(elementId: string, type: keyof HTMLElementEventMap, handler: (event: DragEvent)=>void) {
        const element = document.getElementById(elementId);
        if (element) {
            const boundedHandler = handler.bind(this);
            element.addEventListener(type, boundedHandler as EventListener);
            this.handlers.push({element, handler: boundedHandler as EventListener, type});
        }
    }

    /**
     * @function removeListeners
     * @description Метод удаления слушателей событий.
     */
    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            element.removeEventListener(type, handler);
        });
    }

    /**
     * @function resetApiError
     * @description Метод сброса ошибки API
     */
    resetApiError() {
        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
    }

    /**
     * @function showApiError
     * @description Метод отображения ошибки API
     * @param {Error} error ошибка API
     */
    showApiError(error: Error) {
        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.textContent = 'Ошибка: '.concat(error.message);
        apiError.classList.add('error__visible');
    }

    /**
     * @function validateFormFields
     * @description Метод валидации полей формы
     * @param {HTMLElement} formElement элемент формы
     * @returns {boolean} true, если форма валидна, иначе false
     */
    validateFormFields(formElement: HTMLElement): boolean {
        let isValid = true;
        const inputFields = formElement.querySelectorAll('input');

        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, false);
            let errorField = input.nextElementSibling;
            if ((input.dataset.clearfield || input.dataset.passwordfield) && input.parentElement) {
                errorField = input.parentElement.nextElementSibling;
            }

            if (!errorField) {
                return;
            }

            if (errorText !== "") {
                isValid = false;
                this.showFieldError(input, errorField, errorText);
            }
        });

        return isValid;
    }

    /**
     * @function showFieldError
     * @description Метод отображения ошибки в поле ввода
     * @param {HTMLInputElement} input поле ввода
     * @param {Element} errorField элемент ошибки
     * @param {string} errorText текст ошибки
     */
    showFieldError(input: HTMLInputElement, errorField: Element, errorText: string) {
        input.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
    }

    /**
     * @function formInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @param {boolean} required обязательное поле
     * @returns {boolean} true, если поле валидно, иначе false
     * @private
     */
    // eslint-disable-next-line max-statements
    formInputHandler(event: Event, required=true) : boolean {
        if (!event.target) {
            return false;
        }
        const target = event.target as HTMLInputElement;

        if (target.tagName !== 'INPUT') {
            return false;
        }

        const errorText = validateFormInput(target, true, required);
        let errorField = target.nextElementSibling;
        if ((target.dataset.clearfield || target.dataset.passwordfield) && target.parentElement) {
            errorField = target.parentElement.nextElementSibling;
        }
        if (!errorField) {
            return false;
        }
        if (errorText === "") {

            let leftField: HTMLInputElement | null = null;
            let rightField: HTMLInputElement | null = null;
            if (target.id.endsWith('Left__input')) {
                leftField = target;
                rightField = document.getElementById(target.id.replace('Left__input', 'Right__input')) as HTMLInputElement;
            }
            if (target.id.endsWith('Right__input')) {
                rightField = target;
                leftField = document.getElementById(target.id.replace('Right__input', 'Left__input')) as HTMLInputElement;
            }
            if (leftField && rightField && parseInt(leftField.value, 10) > parseInt(rightField.value, 10)) {
                rightField.classList.add('input__invalid');
                errorField.classList.add('error__visible');
                errorField.textContent = 'Нижняя граница больше верхней границы';
                return false;
            }

            target.classList.remove('input__invalid');
            errorField.classList.remove('error__visible');
            errorField.textContent = errorText;
            return true;
        }
        target.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
        return false;
    }


}