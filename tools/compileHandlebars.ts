'use strict';

import Handlebars from 'handlebars';
import {fileURLToPath} from "url";
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @function compile
 * @description Компиляция всех hbs файлов в директории
 * @param {string} dir Директория
 */
const compile = function(dir: string) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            return compile(filePath);
        }
        if (path.extname(filePath) === '.hbs') {
            const template = fs.readFileSync(filePath, 'utf-8');
            const precompiled = Handlebars.precompile(template);
            const outputPath = filePath.replace('.hbs', '.precompiled.js');

            fs.writeFileSync(outputPath, `import Handlebars from "handlebars"; export default Handlebars.template(${precompiled});`);
        }
        return null;
    });
}

/**
 * @function compileHandlebars
 * @description Компиляция всех hbs файлов
 */
export default function compileHandlebars() {
    const rootDir = path.dirname(__dirname);
    compile(path.join(rootDir, 'src', 'scripts', 'pages'));
    compile(path.join(rootDir, 'src', 'scripts', 'components'));
    compile(path.join(rootDir, 'src', 'scripts', 'layouts'));
}