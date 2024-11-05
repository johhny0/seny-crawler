const apiService = require("./services/apiService");
const htmlService = require("./services/htmlService");
const fileService = require("./services/fileService");

const directory = "./websites";

const dinos = fileService.readDinos();

function collectInformation() {
    const files = fileService.getHtmlFilesFromFolder(directory);

    for (const file of files) {
        console.info("FILE =>", file)

        const content = fileService.readHtml(file);

        htmlService.setHtmlContent(content);
        
        const checkDinos = htmlService.getDinos();

        for (const checkDino of checkDinos) {
            if(!dinoExists(checkDino)){
                console.info("new dino to add: ", checkDino.name);
                dinos.push(checkDino);
            }
        }
    }
}

function dinoExists(checkDino){
    for (const dino of dinos) {
        if(dino.name == checkDino.name){
            return true;
        }
    }
    return false;
}

function saveInformation() {
    fileService.writeDinos(dinos);
}

async function main() {
    collectInformation();

    saveInformation();

    await apiService.send(dinos);
}

main()
    .then(() => console.log("All Done"))
    .catch(err => console.log(err.message));