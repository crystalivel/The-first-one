// const cities = [
//   { name: 'New York', lat: 40.7128, lng: -74.0060 },
//   { name: 'London', lat: 51.5074, lng: -0.1278 },
//   { name: 'Paris', lat: 48.8566, lng: 2.3522 },
//   { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
//   { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
//   { name: 'Rome', lat: 41.9028, lng: 12.4964 },
//   { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
//   { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
//   { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
//   { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
// ];

// async function randomCity() {
//     try{ 
//         const cityResponse = await fetch(`https://random-city-api.vercel.app/api/random-city`)
//         const name = await cityResponse.json();
//         const detail = `https://geocoding-api.open-meteo.com/v1/search?name=${name.city}&count=10&language=en&format=json`
//         const response = await fetch(detail)
//         const data = await response.json(); 
//             const { latitude, longitude } = data.results[0];
//         return latitude, longitude;
//         // console.log(GioData)

//     }
//     catch (error){
//         console.error(`there was an error ${error}`)
//     }
// }

async function WeatherApp() { 
    try{
    const cityResponse = await fetch(`https://random-city-api.vercel.app/api/random-city`)
    const name = await cityResponse.json();
    const detail = `https://geocoding-api.open-meteo.com/v1/search?name=${name.city}&count=10&language=en&format=json`
    const responsedetail = await fetch(detail)
    const datagio = await responsedetail.json(); 
    const { latitude, longitude } = datagio.results[0];
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    const response = await fetch(url);
    const data = await response.json();
    console.log(`${name.city} temperture : ${data.current_weather.temperature} ℃ `);
    }
    catch (error) {
        if (error = "Cannot read properties of undefined (reading '0')"){
            console.log(`Was not able to locate the city`)
        } else {
            console.error(`something went wrong ${error}`)
        }
    }
}
WeatherApp()