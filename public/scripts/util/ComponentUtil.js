'use strict';

// TODO: Пока временный костыль, нужно найти решение как это через условный массив все делать
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.precompiled.js';
import Header from '../components/Header/Header.precompiled.js';
import SelectButton from "../components/SelectButton/SelectButton.precompiled.js";
import Card from '../components/Card/Card.precompiled.js';
import Logo from '../components/Logo/Logo.precompiled.js';
import Input from '../components/Input/Input.precompiled.js';
import Login from '../components/Login/Login.precompiled.js';
import LightButton from '../components/LightButton/LightButton.precompiled.js';

export default function registerComponents() {
    Handlebars.registerPartial('PrimaryButton', PrimaryButton);
    Handlebars.registerPartial('Header', Header);
    Handlebars.registerPartial('SelectButton', SelectButton);
    Handlebars.registerPartial('Card', Card);
    Handlebars.registerPartial('Logo', Logo);
    Handlebars.registerPartial('Input', Input);
    Handlebars.registerPartial('Login', Login);
    Handlebars.registerPartial('LightButton', LightButton);
}