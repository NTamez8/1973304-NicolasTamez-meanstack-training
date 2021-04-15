const express = require('express');
const cors = require('cors');
const mongooseConfig = require('./config/mongooseConfig');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes')


const app = express();

app.set('view engine','pug');
app.set('views','./views');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.Promise = global.Promise;
mongoose.connect(mongooseConfig.url,mongooseConfig.options);

app.use('/',courseRoutes);

//module.exports.homeDir = __dirname;

app.listen(8080,()=>console.log('listening to port 8080'))


