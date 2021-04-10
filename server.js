const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars')

const app = express();
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

app.listen(PORT, () => { console.log(`Listening on ${PORT}`)});