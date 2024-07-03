const jetpack = require("fs-jetpack");

const processedFilePath = "./data/processed.json";
const coursesFilePath = "./data/courses.json";


function fileExists(filePath) {
    if (!jetpack.exists(filePath)) {
        jetpack.write(filePath, "[]");
    }
}

function readCourses() {
    return read(coursesFilePath);
}

function readProcessedFiles() {
    return read(processedFilePath)
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

function writeProcessedFiles(processed){
    write(processedFilePath, processed);
}

function writeCourses(courses){
    write(coursesFilePath, courses);
}

module.exports = {
    readCourses,
    readProcessedFiles,
    readHtml,
    getHtmlFilesFromFolder,
    writeProcessedFiles,
    writeCourses
}