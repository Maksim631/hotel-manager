import express = require('express');
import { login, registration } from './controllers/login.controller';
import { connect } from './database/db.service';
const cors = require('cors');
const bodyParser = require('body-parser');
// Create a new express application instance
const app: express.Application = express();

app.use(cors());
// app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/login', login);

app.post('/registration', registration);


app.listen(3000, async () => {
  await connect();
  console.log(`Face security app listening on port 3000!`);
});




