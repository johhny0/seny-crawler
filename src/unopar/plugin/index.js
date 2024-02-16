document.body.style.border = "5px solid red";

async function main() {
    let coursesHtml = document.getElementsByClassName("atividadesCronogramaTableNome");

    for (let course of coursesHtml) {

        const href = course.firstElementChild.getAttribute("href");

        const urlDiscipline = `https://www.colaboraread.com.br/${href}`;

        fetch(urlDiscipline)
            .then(function (response) { return response.text() })
            .then(function (html) {

                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                const activitiesHtml = doc.getElementsByClassName("timeline-heading");

                const activities = [];
                for (const activityHtml of activitiesHtml) {
                    const activity = getActivityFromHtml(activityHtml)

                    activities.push(activity);
                }

                console.log("activities", activities)

            })
            .catch(function (err) { console.warn('Something went wrong.', err) });
    }
}

function getActivityFromHtml(activityHtml) {
    const title = activityHtml.querySelector(".timeline-title small").innerText.replace("\n", "").trim();
    const dates = activityHtml.querySelector("p em").innerText.split(" - ");
    const startDate = dates[0].split("/").reverse().join("/");
    const endDate = dates[1]?.split("/").reverse().join("/") ?? startDate;
    const id = activityHtml.parentNode.parentNode.id.split("-")[1];

    return { id, title, startDate, endDate };
}

window.onload = main
