
const   EMPTY_LENGTH = 0,
        MIN_PASSWORD_LENGTH = 8;
      
/**
 * @function validateEmail
 * @description Функция для валидации почты.
 * @param {string} email Электронная почта
 * @returns {string} Результат валидации
 */
const validateEmail = function(email: string) {
    return String(email)
        .toLowerCase()
        .match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
        ) ? '' : 'Неправильный email';
}

/**
 * @function validateNickname
 * @description Функция для валидации имени/фамилии.
 * @param {string} name Имя/фамилия
 * @returns {boolean} Результат валидации
 */
const validateNickname = function(name: string) {
    return /^[A-Za-zА-Яа-яЁё-]+$/u.test(name);
}

/**
 * @function validateName
 * @description Функция для валидации имени/фамилии.
 * @param {string} value Значение
 * @param {string} fieldName Имя поля
 * @returns {string} Результат валидации
 */
const validateName = function(value: string, fieldName: string): string {
    if (validateNickname(value)) {
        return '';
    }
    return fieldName === 'first_name' ? 'Неправильно введено имя' : 'Неправильно введена фамилия';
}

/**
 * @function validatePassword
 * @description Функция для валидации пароля.
 * @param {string} password Пароль
 * @param {boolean} additionalChecks Дополнительные проверки
 * @returns {string} Результат валидации
 */
const validatePassword = function(password: string, additionalChecks=false) {
    if (additionalChecks) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u.test(password) ? '' : 'Пароль должен включать хотя бы одну букву каждого регистра и цифру';
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        return 'Пароль должен быть не меньше 8 символов';
    }
    return String(password).length > EMPTY_LENGTH ? '' : 'Пароль не может быть пустым';
}

/**
 * @function validateDoubleNumeric
 * @description Функция для валидации чисел от 1 до 99.
 * @param {string} number Число
 * @returns {string} Результат валидации
 */
const validateDoubleNumeric = function(number: string) {
    const num = Number(number);
    return !isNaN(num) && num >= 1 && num <= 99 ? '' : 'От 1 до 99';
}

/**
 * @function validateTripleNumeric
 * @description Функция для валидации чисел от 1 до 999.
 * @param {string} number Число
 * @returns {string} Результат валидации
 */
const validateTripleNumeric = function(number: string) {
    const num = Number(number);
    return !isNaN(num) && num >= 1 && num <= 999 ? '' : 'От 1 до 999';
}

/**
 * @function validateFlat
 * @description Функция для валидации номера квартиры.
 * @param {string} flatNumber Номер квартиры
 * @returns {string} Результат валидации
 */
const validateFlat = function(flatNumber: string) {
    return /^(?:[1-9][0-9]{0,3}|[1-9][0-9]{0,3}[A-Za-z])$/u.test(flatNumber) ? '' : 'от 1 до 9999';
}

/**
 * @function validateAddress
 * @description Функция для валидации адреса.
 * @param {string} address Адрес
 * @returns {string} Результат валидации
 */
const validateAddress = function(address: string) {
    return /^(?<city>[А-Яа-яЁё\s-]+)[,\s]+(?<street>(?:[А-Яа-яЁё0-9\s-]+\s+(?:ул\.?|улица|пр\.?|проспект|бульвар|пер\.?|переулок|проезд|шоссе|набережная|аллея|площадь)|(?:ул\.?|улица|пр\.?|проспект|бульвар|пер\.?|переулок|проезд|шоссе|набережная|аллея|площадь)\s+[А-Яа-яЁё0-9\s-]+))[,\s]+(?<houseNumber>(?:д\.?|дом)?\s*\d+(?:\s*[А-Яа-яЁё]?)(?:\/\d+)?)$/iu.test(address) ? '' : 'Неправильный формат адреса';
}

/**
 * @function validateNumeric
 * @description Функция для валидации чисел.
 * @param {string} number Число
 * @returns {string} Результат валидации
 */
const validateNumeric = function(number: string) {
    const num = Number(number);
    if (isNaN(num) || num < 1) {
        return 'Неправильно введена цена';
    }
    return num > 10000000000 ? 'Цена слишком большая' : '';
}

/**
 * @interface ValidateFormInputInterface
 * @description Интерфейс для валидации формы.
 */
interface ValidateFormInputInterface {
    /**
     * @property {string} value Значение поля ввода
     */
    value: string;
    /**
     * @property {string} name Имя поля ввода
     */
    name: string;
}

/**
 * @function validateFormInput
 * @description Функция для валидации input.
 * @param {ValidateFormInputInterface} param Объект с параметрами
 * @param {string} param.value Значение поля ввода
 * @param {string} param.name Имя поля ввода
 * @param {boolean} additionalDetails Дополнительные проверки
 * @param {boolean} required обязательное поле
 * @returns {string} Ошибка валидации
 */
export const validateFormInput = function ({value, name:valueName}: ValidateFormInputInterface, additionalDetails=false, required=true) {
    const valueLength = value.length;
    if (valueLength === EMPTY_LENGTH) {
        return required ? 'Это поле обязательное' : '';
    }
    let password = '';
    const passwordDocument = document.getElementById('registerPassword__input') as HTMLInputElement | null;
    if (passwordDocument) {
        password = passwordDocument.value;
    }
    return getValidatorForField({fieldName: valueName, password})(value, additionalDetails);
}

interface ValidatorIntarface {
    fieldName: string;
    password?: string;
}

/**
 * @function getValidatorForField
 * @description Функция для получения валидатора для поля.
 * @param {string} fieldName Имя поля
 * @param {string} password Пароль
 * @returns {Function} Функция валидатора
 */
const getValidatorForField = function ({fieldName, password}: ValidatorIntarface): (value: string, additionalDetails?: boolean) => string {
    const validators: Record<string, (value: string, additionalDetails?: boolean) => string> = {
        'first_name': (value) => validateName(value, 'first_name'),
        'last_name': (value) => validateName(value, 'last_name'),
        'email': (value) => validateEmail(value),
        'password': (value, additionalDetails) => validatePassword(value, additionalDetails),
        'confirm_password': (value)  => password === value ? '' : 'Пароли не совпадают',
        'offer_floor': (value) => validateDoubleNumeric(value),
        'offer_total_floors': (value) => validateDoubleNumeric(value),
        'offer_flat': (value) => validateFlat(value),
        'offer_address': (value) => validateAddress(value),
        'offer_ceiling_height': (value) => validateDoubleNumeric(value),
        'offer_square': (value) => validateTripleNumeric(value),
        'offer_price': (value) => validateNumeric(value),
    };

    return validators[fieldName] || (() => '');
}

/**
 * @function parseForm
 * @description Функция для парсинга форм.
 * @param {HTMLFormElement} form Форма
 * @returns {{name: *, value: *, error: string}[]} Массив объектов с именем, значением и ошибкой
 */
export const parseForm = function(form: HTMLFormElement) {
    const {elements} = form;
    return Array.from(elements)
        .filter((item) => {
            const input = item as HTMLInputElement;
            return input.name;
        })
        .map((element) => {
            const input = element as HTMLInputElement;
            const {name, value} = input;
            const error = "";

            return {error, name, value};
        });
}

