const activityService = require("./services/activityService");
const apiService = require("./services/apiService");

const htmlService = require("./services/htmlService");
const fileService = require("./services/fileService");

const directory = "./websites/7_Semestre";

const processed = fileService.readProcessedFiles();
const courses = fileService.readCourses();

function collectInformation() {
    const files = fileService.getHtmlFilesFromFolder(directory);

    for (const file of files) {
        if (processed.includes(file)) {
            console.info("SKIP: ", file);
            continue;
        }

        console.log("FILE =>", file)

        const content = fileService.readHtml(file);

        htmlService.setHtmlContent(content);
        const course = htmlService.getCourse(courses)

        courses.push(course);

        processed.push(file);
    }
}

function saveInformation() {
    fileService.writeProcessedFiles(processed);
    fileService.writeCourses(courses);
}

function findActivities() {
    const semester = "7";
    activityService.loadFromCurse(courses, semester);
    activityService.showActivitiesInfo();
}

async function main() {

    collectInformation();

    saveInformation()

    await apiService.send(courses)

    findActivities();

}

main()
    .then(() => console.log("All Done"))
    .catch(err => console.log(err.message));