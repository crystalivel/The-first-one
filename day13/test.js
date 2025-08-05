async function getLatLng(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');

    const data = await response.json();

    console.log('Raw API response:', data); // <-- Log to debug

    if (!data.results || data.results.length === 0) {
      console.log('City not found');
      return;
    }

    const { latitude, longitude } = data.results[0];
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    return { latitude, longitude };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
}

getLatLng('Berlin');
