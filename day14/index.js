const fs = require('fs');
const cities = require(`cities.json`)
const path = require('path')

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(`Error reading file ${err.message}`);
            } else {
                // console.log(data)
                resolve(data);
                return data
            }
        });
    });
}


async function Writecityintofilefrominput() {
    try {
        const data = await readFileAsync('./input.txt');
        let citys = [];

        if (data.length > 0) {
            citys = JSON.parse(data.toString('utf-8'));
        }
        const rnd = Math.floor(Math.random()*citys.length)
        let currentCity = citys[rnd]
        const landl = `https://geocoding-api.open-meteo.com/v1/search?name=${currentCity.city}&count=10&language=en&format=json`
        const responselandl = await fetch(landl)
        const datagio = await responselandl.json();
        const { latitude, longitude } = datagio.results[0];
        const detail = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        const responsedetail = await fetch(detail)
        const datatemp = await responsedetail.json();
        //commented methode to jason
        // const requiredData = {cityName, tempurature:datatemp.current_weather.temperature}
        // const jsonString = JSON.stringify(requiredData,null,2 )
        // fs.writeFileSync(`${cityName}.json`, jsonString)
        const filepath = path.join(__dirname, 'citytemp',`${currentCity.city}.txt`)
        fs.writeFileSync(filepath,`${currentCity.city} tempurature is ${datatemp.current_weather.temperature} ℃`)
    }
    catch (error) {
        console.error(`City was not found`, error)
    }
}
Writecityintofilefrominput()