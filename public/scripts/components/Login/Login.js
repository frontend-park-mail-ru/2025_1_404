import BaseComponent from "../BaseComponent.js";
import template from './Login.precompiled.js';

/**
 * @class Login
 * @description Компонент авторизации.
 * @extends BaseComponent
 */
export default class Input extends BaseComponent {
    render() {
        return template();
    }
}