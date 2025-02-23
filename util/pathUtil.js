/*
    Всякие полезные утилиты для работы с путями (пока всего одна :d)
*/

'use strict';

import path from "path";
import {fileURLToPath} from "url";

export function getAbsolutePathForDir(dir) {
    const currentPath = path.dirname(fileURLToPath(import.meta.url));
    return path.resolve(path.dirname(currentPath), dir);
}