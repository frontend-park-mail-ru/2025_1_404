
import * as sass from 'sass-embedded';
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @function compileScss
 * @description Функция для компиляции SCSS в CSS.
 */
export default function compileScss() {
    const rootDir = path.join(path.dirname(__dirname), "../");
    const inputDir = path.join(rootDir, 'src', 'style', 'scss');
    const outputDir = path.join(rootDir, 'dist', 'src', 'style', 'css');

    sass.compileAsync(inputDir.concat('/app.scss'), { style: 'expanded' })
        .then(result => {
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            fs.writeFileSync(outputDir.concat("/app.css"), result.css);
            console.log('CSS файл скомпилирован!');
        })
        .catch(error => {
            console.error('Ошибка компиляции SCSS:', error);
        });
}
