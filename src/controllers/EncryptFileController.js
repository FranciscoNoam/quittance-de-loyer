const fs = require('fs');
const obfuscator = require('javascript-obfuscator');
const path = require('path');
const UglifyJS = require('uglify-js');

const optionsCript = {
    compress: true,
    mangle: true,
};

const scriptsDir = './dist/scripts';
const outputFilePath = 'public/js/js.js';

const sourceDir = './src/scripts';
const destDir = './dist/scripts';


exports.obfuscateFiles = async (srcPath, destPath) => {
    const files = fs.readdirSync(srcPath);

    for (let file of files) {
        const srcFilePath = path.join(srcPath, file);
        if (path.extname(file) === '.js') {

            const code = fs.readFileSync(srcFilePath, 'utf8');
            const obfuscated = await obfuscator.obfuscate(code);
            let destFilePath = path.join(destPath, file);
            const str = obfuscated.toString();
            fs.writeFileSync(destFilePath, str);

        } else {
            this.obfuscateFiles(srcFilePath, destPath);
        }
    }
};


exports.encryptFileJSCombine = () => {
    var $this = this;
    return new Promise((resolve, reject) => {
        $this.obfuscateFiles(sourceDir, destDir).then(() => {
            fs.readdir(scriptsDir, (err, files) => {
                if (err) {
                    console.error('Erreur lors de la lecture du répertoire des scripts:', err);
                    reject({ status: 400, message: err.message });
                }
                const scripts = files.map((file) => fs.readFileSync(`${scriptsDir}/${file}`, 'utf8'));
                const result = UglifyJS.minify(scripts, optionsCript);

                if (result.error) {
                    console.error('Erreur lors du chiffrement des scripts:', result.error);
                    reject({ status: 400, message: err.message });
                }
                fs.writeFile(outputFilePath, result.code, (err) => {
                    if (err) {
                        console.error('Erreur lors de l\'écriture du fichier de sortie:', err);
                        reject({ status: 400, message: err.message });
                    } else {
                        console.log('Scripts chiffrés générés avec succès.');
                        resolve({ status: 200, message: "File JS encrypted!" });
                    }
                });
            });
        }).catch((err) => {
            reject({ status: 400, message: err.message });
        })


    }).catch((err) => {
        console.log(err.message);
        reject({ status: 400, message: err.message });
    });
};