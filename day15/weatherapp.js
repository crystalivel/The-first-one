async function theWeatherApp(city) {
    const landl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
        const responselandl = await fetch(landl)
        const datagio = await responselandl.json();
        if (!datagio.results || datagio.results.length === 0){
            throw new Error(`city not found!`)
        }
        const { latitude, longitude } = datagio.results[0];
        const detail = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        const responsedetail = await fetch(detail)
        const datatemp = await responsedetail.json();
        return `
        ${city} temperature is:  ${datatemp.current_weather.temperature} ℃`
        }
module.exports = theWeatherApp