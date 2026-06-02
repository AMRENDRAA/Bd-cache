const client = require("./config/redis");

async function test() {

    await client.set("name", "Amrendra");

    const value = await client.get("name");

    console.log(value);
}

test();

