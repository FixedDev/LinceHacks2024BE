let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let generalRouter = require('./routes/RoutingModule');
const {databaseService} = require("./src/services/DatabaseService");

databaseService.init();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

generalRouter.routing.registerInto("", app);

module.exports = app;
