
const axios = require('axios').create({
    baseURL: 'http://localhost:3001',
});

async function send(courses) {
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

module.exports = {
    send
}