'use strict'

import * as sass from 'sass-embedded';
import fs from 'fs';

/**
 * @function compileScss
 * @description Функция для компиляции SCSS в CSS.
 */
export default function compileScss() {
    sass.compileAsync('src/style/scss/app.scss', { style: 'expanded' })
        .then(result => {
            fs.writeFileSync('src/style/css/app.css', result.css);
            console.log('CSS файл скомпилирован!');
        })
        .catch(error => {
            console.error('Ошибка компиляции SCSS:', error);
        });
}
