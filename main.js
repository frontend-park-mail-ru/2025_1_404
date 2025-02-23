/*
    Точка входа программы.
    Инициализация сервера, подключение маршрутизатора и статических файлов.
*/

'use strict';

import express from 'express';
import {router} from './router.js';
import {getAbsolutePathForDir} from "./util/pathUtil.js";

const app = express();

const SERVER_PORT = 3000;

app.use('/', router);
app.use(express.static(getAbsolutePathForDir('public')));

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});