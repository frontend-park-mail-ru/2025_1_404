
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
const compile = function(inputDir: string, outputDir: string, dir: string) {
    inputDir = path.join(inputDir, dir);
    outputDir = path.join(outputDir, dir);
    fs.readdirSync(inputDir).forEach((file) => {
        let filePath = path.join(inputDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            return compile(inputDir, outputDir, file);
        }
        if (path.extname(file) === '.hbs') {
            const template = fs.readFileSync(filePath, 'utf-8');
            filePath = path.join(outputDir, file);
            const precompiled = Handlebars.precompile(template);
            const outputPath = filePath.replace('.hbs', '.precompiled.js');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, {recursive: true});
            }
            console.log('making')
            fs.writeFileSync(outputPath, `${precompiled}`);
        }
        return null;
    });
}

/**
 * @function compileHandlebars
 * @description Компиляция всех hbs файлов
 */
export default function compileHandlebars() {
    const rootDir = path.join(path.dirname(__dirname), "../");
    const inputDir = path.join(rootDir, 'src', 'scripts');
    const outputDir = path.join(rootDir, 'dist', 'src', 'scripts');
    console.log(rootDir);
    compile(inputDir, outputDir, 'pages');
    compile(inputDir, outputDir, 'components');
    compile(inputDir, outputDir, 'layouts');
}

