const jetpack = require("fs-jetpack");

const dinosFilePath = "./data/dinos.json";

function fileExists(filePath) {
    if (!jetpack.exists(filePath)) {
        jetpack.write(filePath, "[]");
    }
}

function readDinos() {
    return read(dinosFilePath);
}

function readHtml(filePath) {
    return jetpack.read(filePath) || "";
}

function read(filePath) {
    fileExists(filePath);

    const jsonContent = jetpack.read(filePath) || "[]";

    const processed = JSON.parse(jsonContent) || [];

    return processed
}

function getHtmlFilesFromFolder(directory) {
    return jetpack.find(directory, { matching: "*.htm" }).reverse();
}

function write(filePath, value) {
    fileExists(filePath);

    const content = JSON.stringify(value, null, 2) || "[]";

    jetpack.write(filePath, content);
}


function writeDinos(dinos){
    write(dinosFilePath, dinos);
}

module.exports = {
    readDinos,
    readHtml,
    getHtmlFilesFromFolder,
    writeDinos
}