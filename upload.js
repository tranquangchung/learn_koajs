const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");
const exec = require('child_process').exec;


async function Upload(context, next) {
    try {
        const uploadfile = context.request.files.file;

        const savefile = `${Date.now()}#${uploadfile.name}`;

        const readStream = fs.createReadStream(uploadfile.path);

        const writeStream = fs.createWriteStream(path.join("uploads", savefile));

        await promisePipe(
            readStream.on("error", () => {
                throw new Error({
                    errors: "File Read Error"
                });
            }),
            writeStream.on("error", () => {
                throw new Error({
                    errors: "Write Error"
                });
            })
        );

        let extension = savefile.split('.').pop();
        if (extension == 'mp3'){
            savefile_convert = savefile.replace('mp3', 'wav');
        }
        else if (extension == 'wav'){
            savefile_convert = savefile.replace('wav', 'mp3');
        }
        exec(`sox uploads/${savefile} uploads/${savefile_convert}`,
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });

        context.body = {
            message: "File Uploaded \n" +
                `Convert file: ${savefile} to ${savefile_convert}`
        };
    } catch (err) {
        console.log(err);
        context.body = {
            message: "There was an error",
            errors: err
        };
    }
}
module.exports = Upload
