/*
    Сборщик handlebars темплейтов.
    Использование: npm run compile (также автоматически запускается при npm start)
*/

'use strict';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @description Компиляция всех hbs файлов в директории
 * @param dir
 */
function compile(dir) {
    for (let file of fs.readdirSync(dir)) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            compile(filePath);
            continue;
        }
        if (path.extname(filePath) === '.hbs') {
            const template = fs.readFileSync(filePath, 'utf-8');
            const precompiled = Handlebars.precompile(template);
            const outputPath = filePath.replace('.hbs', '.precompiled.js');

            fs.writeFileSync(outputPath, `export default Handlebars.template(${precompiled});`);
            console.log(`Compiled ${filePath} to ${outputPath}`);
        }
    }
}

const rootDir = path.dirname(__dirname);
compile(path.join(rootDir, 'public', 'scripts', 'pages'));
compile(path.join(rootDir, 'public', 'scripts', 'components'));