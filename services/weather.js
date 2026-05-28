const axios = require('axios');

const weatherapikey = process.env.WEATHER_API_KEY;

// Simple in-memory cache
const cache = {};

async function weatherdata(location, date, date2) {

    const cachekey = `${location}-${date}-${date2}`;

    // Check if data already exists in cache
    if (cache[cachekey]) {
        console.log("Cache hit");

        return cache[cachekey];
    }

    try {

        console.log("Fetching from API");

        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date2}?key=${weatherapikey}`
        );

        // Store response in cache
        cache[cachekey] = response.data;

        return response.data;

    } catch (err) {

        console.log(err.message);

        throw new Error("Failed to fetch weather data");
    }
}

module.exports = {
    weatherdata
};