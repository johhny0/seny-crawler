const jetpack = require("fs-jetpack");
const cheerio = require("cheerio");
const { read, write } = require("../shared/processedFiles");

const processedFilePath = "../data/processed.json";
const coursesFilePath = "../data/courses.json";

const processed = read(processedFilePath);
const courses = read(coursesFilePath);

console.log({ processed })
const directory = "../../websites/unopar";

const files = jetpack.find(directory, { matching: "*.htm" }).reverse();

for (const file of files) {
    if (processed.includes(file)) {
        console.info("SKIP: ", file);
        continue;
    }

    const content = jetpack.read(file);
    const $ = cheerio.load(content);
    const [courseName, semester] = $(".breadcrumb > li:nth-child(2) > a:nth-child(1)").text()
        .replace("\n", "")
        .split(" - Bacharelado - ");

    const activitiesHtml = $("#js-activities-container .timeline-panel")

    const course = {
        id: courses.length + 1,
        name: courseName.trim(),
        semester: semester.replace("º Semestre", "").trim(),
        activities: processActivities($, activitiesHtml)
    };

    courses.push(course);

    processed.push(file);
}

write(processedFilePath, processed);
write(coursesFilePath, courses);

function processActivities($, activitiesHtml) {
    const activities = [];

    for (const activityHmtl of activitiesHtml) {

        const activityName = $(activityHmtl).find("h4 small").text().trim();

        let [startDate, endDate] = $(activityHmtl)
            .find("div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > small:nth-child(1) > em:nth-child(2)")
            .text().split(" - ");

        startDate = startDate?.split("/").reverse().join("/")
        endDate = endDate?.split("/").reverse().join("/")

        const activity = { id: activities.length + 1, name: activityName, startDate, endDate };

        console.log({ activity })

        activities.push(activity)
    }

    return activities;
}
