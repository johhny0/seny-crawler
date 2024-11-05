const cheerio = require("cheerio");

let $ = "";

function setHtmlContent(content) {
    $ = cheerio.load(content);
}

function getDinos() {
    const dinosHtml = $(".cargo-creature-table > tbody > tr[align='left']");
    const dinos = [];

    for (const dinoHtml of dinosHtml) {
        const dinoLink = $(dinoHtml).find("a")[0];

        const name = dinoLink.attribs["title"].trim()
        const link = dinoLink.attribs["href"].trim();
        const img = $(dinoLink).find("img")[0].attribs["src"].trim();
        const entityId = $(dinoHtml).find(".long")[0].children[0].data.trim();

        const dino = {
            name,
            link,
            img,
            entityId
        };

        dinos.push(dino);
    }

    return dinos;
}

module.exports = {
    setHtmlContent,
    getDinos
}