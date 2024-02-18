const cheerio = require("cheerio");
const jetpack = require("fs-jetpack");
const { read, write } = require("../shared/processedFiles");

const processedFilePath = "../data/processed.json";
const coursesFilePath = "../data/courses.json";

const processed = read(processedFilePath);
const courses = read(coursesFilePath);

// const directory = "../../websites/unopar";

// const files = jetpack.find(directory, { matching: "*.htm" }).reverse();

// for (const file of files) {
//     if (processed.includes(file)) {
//         console.info("SKIP: ", file);
//         continue;
//     }

//     const content = jetpack.read(file);
//     const $ = cheerio.load(content);
//     const [courseName, semester] = $(".breadcrumb > li:nth-child(2) > a:nth-child(1)").text()
//         .replace("\n", "")
//         .split(" - Bacharelado - ");

//     const subjectName = $(".page-header > h2:nth-child(2)").text();
//     console.log({ subjectName });
//     const activitiesHtml = $("#js-activities-container .timeline-panel")

//     const course = {
//         id: courses.length + 1,
//         name: courseName.trim(),
//         subject: subjectName.trim(),
//         semester: semester.replace("º Semestre", "").trim(),
//         activities: processActivities($, activitiesHtml)
//     };

//     courses.push(course);

//     processed.push(file);
// }

// write(processedFilePath, processed);
// write(coursesFilePath, courses);

// function processActivities($, activitiesHtml) {
//     const activities = [];

//     for (const activityHmtl of activitiesHtml) {

//         const activityName = $(activityHmtl).find("h4 small").text().trim();

//         let [startDate, endDate] = $(activityHmtl)
//             .find("div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > small:nth-child(1) > em:nth-child(2)")
//             .text().split(" - ");

//         startDate = startDate?.split("/").reverse().join("/")
//         endDate = endDate?.split("/").reverse().join("/") || startDate

//         const activity = { id: activities.length + 1, name: activityName, startDate, endDate };

//         activities.push(activity)
//     }

//     return activities;
// }

/* *
const activities = [];
const outdatedActivities = [];

const today = new Date();

function getDate(dateStr) {
    const [year, month, day] = (dateStr || "").split("/");
    return new Date("20" + year, month - 1, day);
}


for (const course of courses) {
    if (course.semester != 6) {
        continue;
    }

    for (let activity of course.activities) {
        const startDate = getDate(activity.startDate);
        const endDate = getDate(activity.endDate || activity.startDate);

        activity = {
            ...activity,
            subject: course.subject,
            startDt: startDate,
            endDt: endDate,

        }

        if (today.getTime() > startDate.getTime()) {
            activities.push(activity);
        }

        if (today.getTime() > endDate.getTime()) {
            outdatedActivities.push(activity);
        }
    }
}

activities.sort((a1, a2) => a1.startDt.getTime() - a2.startDt.getTime())
outdatedActivities.sort((a1, a2) => a1.endDt.getTime() - a2.endDt.getTime())


if (outdatedActivities.length) {
    const nextActivity = outdatedActivities.at(0);
    console.error(`You have ${outdatedActivities.length} activities outdated.`);
    console.error(`You could start with: ${nextActivity.name}`);
    console.warn({ nextActivity });
} else {
    const nextActivity = activities.at(0);
    console.info(`Your next activity could be: ${nextActivity.name}`);
}
/* */

sendToApi().then(() => console.log("All Done")).catch(err => console.log(err.message));

async function sendToApi() {
    const axios = require('axios').create({
        baseURL: 'http://localhost:3001',
    });

    for (const currentCourse of courses) {

        console.log(`Saving Course: ${currentCourse.name}`);
        const { data: savedCourse } = await axios.post("/course", { name: currentCourse.name });

        console.log(`Saving Subject: ${currentCourse.subject} - ${currentCourse.semester} Semester`);
        const { data: savedSubject } = await axios.post("/subject", {
            name: currentCourse.subject,
            semester: currentCourse.semester,
            course: savedCourse
        });

        for (const currentActivity of currentCourse.activities) {

            console.log(`Saving Activity: ${currentActivity.name}. Length: ${currentActivity.name.length}`)

            await axios.post("/activity", {
                name: currentActivity.name,
                startDate: currentActivity.startDate,
                endDate: currentActivity.endDate,
                subject: savedSubject
            })
        }
    }
}

