import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// import models
import Game from './app/models/game';

// import routes
import { getGames, getGame, postGame, deleteGame } from './app/routes/game';

// start express server 
const app = express();
const port = process.env.PORT || 8080;

// Connect to db through mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeousMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeousMS: 30000 } }
};

mongoose.Promise = global.Promise;

// connect to mongoose
mongoose.connect('MONGO_CONNECTION', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Add body parser and morgan for middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// set location of static assets and tell express where they live
app.use(express.static(__dirname + '/client/dist'));

// enable CORS so we can make HTTP request from webpark-dev-starter
app.use((request, response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API routes, create a game, get all the games
app.route('/games').post(postGame).get(getGames);