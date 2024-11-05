
const axios = require('axios').create({
    baseURL: 'http://localhost:3003',
});

async function send(dinos) {
    console.log(`SENDING DINOS`, dinos.length);
    for (const currentDino of dinos) {
        console.log(currentDino);
        const { data: savedDino } = await axios.post("/dinos", currentDino);
        console.log(`Dino Saved: ${savedDino.name}`);
    }
}

module.exports = {
    send
}