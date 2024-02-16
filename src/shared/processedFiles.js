const jetpack = require("fs-jetpack");

function fileExists(filePath) {
    if (!jetpack.exists(filePath)) {
        jetpack.write(filePath, "[]");
    }
}

function read(filePath) {
    fileExists(filePath);

    const jsonContent = jetpack.read(filePath) || "[]";

    const processed = JSON.parse(jsonContent) || [];

    return processed
}

function write(filePath, value){
    fileExists(filePath);

    const content = JSON.stringify(value, null, 2) || "[]";

    jetpack.write(filePath, content);
}

module.exports = {
    read,
    write
}