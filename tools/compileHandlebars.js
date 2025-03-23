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
 * @param dir директория
 */
const compile = function(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            return compile(filePath);
        }
        if (path.extname(filePath) === '.hbs') {
            const template = fs.readFileSync(filePath, 'utf-8');
            const precompiled = Handlebars.precompile(template);
            const outputPath = filePath.replace('.hbs', '.precompiled.js');

            fs.writeFileSync(outputPath, `export default Handlebars.template(${precompiled});`);
        }
        return null;
    });
}

const rootDir = path.dirname(__dirname);
compile(path.join(rootDir, 'public', 'scripts', 'pages'));
compile(path.join(rootDir, 'public', 'scripts', 'components'));
