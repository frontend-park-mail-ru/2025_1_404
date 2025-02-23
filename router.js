/*
    Маршрутизатор приложения.
    Берет путь и сопоставляет ему нужный контроллер.
    В будущем возможно также будет использоваться для автоматического открытия нужной страницы по пути.
*/

'use strict';

import {indexPageController} from './controller.js';
import express from 'express';

export const router = express.Router();

router.get('/', indexPageController);

// TODO: Автооткрытие нужной страницы
//router.get('/register', registerPageController);