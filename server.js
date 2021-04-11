const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars')
const path = require('path');
const app = express();
const routes = require('./controllers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const hbs = exphbs.create({});
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force:false}).then(() => {
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
});