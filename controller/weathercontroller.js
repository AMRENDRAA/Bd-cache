const { weatherdata } = require('../services/weather');


const getWeatherData = async (req, res) => {





    try {






        console.log("This is the dta ");

        const location = "London ,Uk"
        const date1 = "2026-01-01"
        const date2 = "2026-01-10"
        const newdata = await weatherdata(location, date1, date2);
        const filteredData = {
            address: newdata.resolvedAddress,
            timezone: newdata.timezone,
            days: newdata.days.map(day => ({
                date: day.datetime,
                temperature: day.temp,
                condition: day.conditions,
                humidity: day.humidity
            }))
        };

        console.log(filteredData);
        res.status(200).json({
            status: "Success",
            data: filteredData


        })

    } catch (err) {
        console.log(err);
    }




}

module.exports = { getWeatherData };
