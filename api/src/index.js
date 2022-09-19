const express = require('express');
const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./configuration');
const axios = require('axios');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const app = express();

const postSchema = new Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database: ${db}`);

        const silence = new Post({name: "Silence"});
        silence.save(function(err, savedSilence) {
            if(err) return console.error(err);
            console.log("savedSilence with volumes 2", savedSilence);
        });

        // Post.find(function(err, posts) {
        //     if(err) return console.error(err);
        //     console.log("posts", posts);
        // });        
    });
}

app.get("/test", (req, res) => {
    res.send('Our api server is working correctrly');
});

app.get("/user", (req, res) => {
    axios.get(authApiUrl + "/user").then(response => {
        res.json({
            testuser: true,
            userFromAuth: response.data
        });
    });
});

app.get('/api/data', (req, res) => {
    res.json({
        apidata: true
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);

   