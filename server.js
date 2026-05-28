//JAI SHREE RAM 
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("The server is running")
})

app.use("/api/weather", require("./route/weatherroute"))


app.listen(port, () => {
    console.log(`Server is running on ${port}`)

})

