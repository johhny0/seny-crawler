const cheerio = require("cheerio");

let $ = "";

function setHtmlContent(content) {
    $ = cheerio.load(content);
}

function getCourse(courses = []) {
    const courseHtml = $(".breadcrumb > li:nth-child(2) > a:nth-child(1)").text();
    const [courseName, semester] = courseHtml
        .replace("\n", "")
        .split(" - Bacharelado - ");

    const subjectName = $(".page-header > h2:nth-child(2)").text();
    const activitiesHtml = $("#js-activities-container .timeline-panel")

    const course = {
        id: courses.length + 1,
        name: courseName.trim(),
        subject: subjectName.trim(),
        semester: semester.replace("º Semestre", "").trim(),
        activities: processActivities($, activitiesHtml)
    };

    return course;
}

function processActivities($, activitiesHtml) {
    const activities = [];

    for (const activityHmtl of activitiesHtml) {

        const activityName = $(activityHmtl).find("h4 small").text().trim();

        let [startDate, endDate] = $(activityHmtl)
            .find("div:nth-child(2) > div:nth-child(1) > p:nth-child(2) > small:nth-child(1) > em:nth-child(2)")
            .text().split(" - ");

        startDate = startDate?.split("/").reverse().join("/")
        endDate = endDate?.split("/").reverse().join("/") || startDate

        const activity = { id: activities.length + 1, name: activityName, startDate, endDate };

        activities.push(activity)
    }

    return activities;
}

module.exports = {
    setHtmlContent,
    getCourse
}