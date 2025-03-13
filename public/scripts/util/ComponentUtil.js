'use strict';

import BackgroundlessButton from '../components/BackgroundlessButton/BackgroundlessButton.precompiled.js';
import Card from '../components/Card/Card.precompiled.js';
import Header from '../components/Header/Header.precompiled.js';
import HeaderAuthorized from "../components/Header/HeaderAuthorized.precompiled.js";
import HeartButton from '../components/HeartButton/HeartButton.precompiled.js';
import Input from '../components/Input/Input.precompiled.js';
import LightButton from '../components/LightButton/LightButton.precompiled.js';
import Login from '../components/Login/Login.precompiled.js';
import Logo from '../components/Logo/Logo.precompiled.js';
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.precompiled.js';
import SelectButton from "../components/SelectButton/SelectButton.precompiled.js";
import UserImage from "../components/UserImage/UserImage.precompiled.js";

/**
 * @function registerComponents
 * @description Регистрация компонентов
 */
export default function registerComponents() {
    const components = [
        [PrimaryButton, 'PrimaryButton'],
        [Header, 'Header'],
        [HeaderAuthorized, 'HeaderAuthorized'],
        [UserImage, 'UserImage'],
        [SelectButton, 'SelectButton'],
        [Card, 'Card'],
        [Logo, 'Logo'],
        [Input, 'Input'],
        [Login, 'Login'],
        [LightButton, 'LightButton'],
        [BackgroundlessButton, 'BackgroundlessButton'],
        [HeartButton, 'HeartButton']
    ];

    components.forEach(([component, name]) => {
        Handlebars.registerPartial(name, component);
    });
}