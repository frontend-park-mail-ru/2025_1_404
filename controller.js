/*
    Контроллер приложения.
    Обрабатывает маршрут, возвращает клиенту соответствующий ответ.
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