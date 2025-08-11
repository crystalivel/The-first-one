async function WeatherApp() {
    try {
        const cityResponse = await fetch(`https://random-city-api.vercel.app/api/random-city`)
        const name = await cityResponse.json();
        const detail = `https://geocoding-api.open-meteo.com/v1/search?name=${name.city}&count=10&language=en&format=json`
        const responsedetail = await fetch(detail);
        const datagio = await responsedetail.json();
        if (!datagio.results || datagio.results.length == 0) {
            throw new Error(`No geocoding results for city: ${name.city}`);
        }
        const { latitude, longitude } = datagio.results[0];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        const response = await fetch(url);
        const data = await response.json();
        console.log(`${name.city} temperture : ${data.current_weather.temperature} ℃ `);
    }
    catch (error) {
        console.error(`something went wrong ${error}`)
    }
}
WeatherApp()