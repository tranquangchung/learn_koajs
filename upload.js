const promisePipe = require("promisepipe");
const fs = require("fs");
const path = require("path");


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

        context.body = {
            message: "File Uploaded"
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
