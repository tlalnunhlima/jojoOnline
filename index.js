//database connect hi dah hmasa ber ila
require('./models/dbConnection.js')

const express = require('express')

const mongoose = require('mongoose')

const ejs = require('ejs')

const app = express();


//view engine
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000))
// public express static
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//mongoose warning tibotu
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//controll user login
const authLoginController = require('./controllers/authLogin')
const routeController = require('./controllers/routeController')

//go to all route
app.use('/', routeController)

app.post('/auth/login', authLoginController)


//listen on specific post
 app.listen(app.get('port'), () => {
    console.log('App is listening on port:' + app.get('port'))
 });