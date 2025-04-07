import fs from 'fs';
import path from 'path';
import compileHandlebars from "./compileHandlebars.js";
import compileScss from "./compileScss.js";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

compileHandlebars();
compileScss();
copyPublicFolder();

function copyPublicFolder() {
    const rootDir = path.join(path.dirname(__dirname), "../");
    const inputDir = path.join(rootDir, 'public');
    const outputDir = path.join(rootDir, 'dist', 'public');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
    }
    fs.cpSync(inputDir, outputDir, {recursive: true});
}