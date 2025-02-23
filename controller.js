/*
    Маршрутизатор приложения.
    Получает путь и вызывает соответствующий контроллер.
    В будущем можно будет сделать маршрутизацию сразу по роутам, потому тут немного закомменченного кода есть.
*/

'use strict';

// import IndexPage from "./public/scripts/pages/index/index.js";
// import RegisterPage from "./public/scripts/pages/register/register.js";
import {getAbsolutePathForDir} from "./util/pathUtil.js";

// Контроллер index маршрута
export function indexPageController(req, res) {
  res.sendFile(getAbsolutePathForDir('public/index.html'));
}

// Контроллер /register маршрута (временно не используется)
// export function registerPageController(req, res) {
//   res.send(new RegisterPage().render());
// }