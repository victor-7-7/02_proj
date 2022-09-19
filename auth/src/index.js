const express = require('express');
const { connectDb } = require('./helpers/db');
const { host, port, db, apiUrl } = require('./configuration');
const axios = require('axios');

const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database: ${db}`);

    });
}

app.get('/test', (req, res) => {
    res.send('Our auth server is working correctrly');
});

app.get('/api/user', (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

app.get("/apidata", (req, res) => {
    axios.get(apiUrl + "/data").then(response => {
        res.json({
            testapidata: true,
            dataFromApi: response.data
        });
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

   