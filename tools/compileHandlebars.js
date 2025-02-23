/*
    Сборщик handlebars темплейтов.
    Использование: npm run compile (также автоматически запускается при npm start)
*/

'use strict';

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import {getAbsolutePathForDir} from "../util/pathUtil.js";

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

const dir = getAbsolutePathForDir('');
compile(path.join(dir, 'public/scripts/pages'));
compile(path.join(dir, 'public/scripts/components'));