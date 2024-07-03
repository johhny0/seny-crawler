let activities = [];

let activeActivities = [];
let outdatedActivities = [];

const today = new Date();

function getDate(dateStr) {
    const [year, month, day] = (dateStr || "").split("/");
    return new Date("20" + year, month - 1, day);
}

function loadFromCurse(courses, semester) {
    activities = [];
    activeActivities = [];
    outdatedActivities = [];

    for (const course of courses) {
        if (course.semester != semester) {
            continue;
        }

        course.activities.forEach(a => a.subject = course.subject);
        activities.push(...course.activities);
    }

    organizeActivities();
}

function organizeActivities() {
    for (let activity of activities) {
        const startDate = getDate(activity.startDate);
        const endDate = getDate(activity.endDate || activity.startDate);

        activity = {
            ...activity,
            startDt: startDate,
            endDt: endDate,
        }

        if (today.getTime() > startDate.getTime()) {
            activeActivities.push(activity);
        }

        if (today.getTime() > endDate.getTime()) {
            outdatedActivities.push(activity);
        }

        activeActivities.sort((a1, a2) => a1.startDt.getTime() - a2.startDt.getTime())
        outdatedActivities.sort((a1, a2) => a1.endDt.getTime() - a2.endDt.getTime())
    }
}

function showActivitiesInfo() {

    if (outdatedActivities.length) {
        const nextActivity = outdatedActivities.at(0);
        console.info("----------".repeat(10))
        console.info(`| 🔴 | You have ${outdatedActivities.length} activities outdated.`);
        console.info(`| 🔴 | You could start with: ${nextActivity.name}`);
        console.info("----------".repeat(10))
    }

    if (activeActivities.length) {
        const nextActivity = activeActivities.at(0);
        console.info("----------".repeat(10))
        console.info(`| 🟡 | You have ${activeActivities.length} activities outdated.`);
        console.info(`| 🟡 | Your next activity could be: ${nextActivity.name}.`);
        console.info("----------".repeat(10))
    }

    if (!outdatedActivities.length && !activeActivities.length) {
        console.info("----------".repeat(10))
        console.info(`| 🟢 | You have 0 activities for today.`);
        console.info("----------".repeat(10))
    }
}


module.exports = {
    loadFromCurse,
    showActivitiesInfo
}