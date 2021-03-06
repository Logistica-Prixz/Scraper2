const settings = require('./settings.js')();
const SanPabloScrap = require('./src/scrapers/SanPabloScrap');
const AhorroScrap = require('./src/scrapers/AhorroScrap');
const FarmalistoScrap = require('./src/scrapers/FarmalistoScrap');
//////< Express server >//////
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
oauthserver = require('oauth2-server');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const { File, Query, User } = require('./src/controllers/data');

// Create an express server and a GraphQL endpoint
/*
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var schema = buildSchema(fs.readFileSync(__dirname + '/schema.graphql', 'utf8'));
var root = {
    getFile: ({ id }) => {
        var file = new File({ id })
        return file;
    },
    getFiles: ({ authorId, createdBetween, generatedBetween, downloadedBetween }) => [],
    getUser: ({ id }) => new User(id),
    getUsers: ({ authorId, createdBetween, generatedBetween, downloadedBetween }) => [],
};
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: new Query(settings),
    graphiql: true
}));
app.listen(3333, () => console.log('Express GraphQL Server Now Running On localhost:3333/graphql'));
*/
//////< Scraping daemon >//////
try {
    (async() => {
        var counter = 0;
        var end = () => {
            if (++counter >= 3) {
                console.error(error);
                process.exit(1);
                return;
            }
        }
        var sanPablo = await new SanPabloScrap(settings);
        var ahorro = await new AhorroScrap(settings);
        var flisto = await new FarmalistoScrap(settings);
        sanPablo.on("end", end);
        ahorro.on("end", end);
        flisto.on("end", end);
    })();
} catch (error) {
    console.error(error);
    process.exit(1);
    return;
}