//IMPORT AXIOS TO MAKE HTTP REQUEST TO EXTERNAL APIS 



const axios = require('axios');

//READ THE WEATHER API KEY FROM THE .ENV FILE

const weatherapikey = process.env.WEATHER_API_KEY;


// Import Redis client that we configured and connected  (connection to Redis server)
const client = require("../config/redis");
// Simple in-memory cache
const cache = {};

//Function that fetches weather data
// location =city name\
//date = start date
//date2= end date 

async function weatherdata(location, date, date2) {

    // 1. Create a unique cache key for this request
    //Example "London,UK-2026-01-2026-01-10"
    // This key uniquely identifies a weather request


    const cachekey = `${location}-${date}-${date2}`;




    try {

        // Ask Redis:
        // "Do you already have data stored for this key?"
        const cachedData = await client.get(cachekey);
        // If Redis returns data, then cache hit occurred
        if (cachedData) {
            console.log("Cache hit");
            // Redis returns STRING → convert back to object
            return JSON.parse(cachedData);

        }

        // if cache miss ->new data 


        console.log("Fetching from API");
        // call external api

        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date2}?key=${weatherapikey}`
        );

        // Store result in redis (important must stringify object)

        await client.set(

            // Redis key

            cachekey,
            // Convert JavaScript object into string
            // because Redis stores strings
            JSON.stringify(response.data),
            {

                // EX = Expire
                // Redis automatically deletes this key after 300 seconds
                // 300 seconds = 5 minutes

                EX: 300// CACHE  EXPIRES IN 300 SECOND 
            }
        )

        // Return fresh data obtained from the weather API

        return response.data;

    } catch (err) {
        // Log actual error message for debugging

        console.log(err.message);
        // Throw custom error to caller/controller

        throw new Error("Failed to fetch weather data");
    }
}

module.exports = {
    weatherdata
};