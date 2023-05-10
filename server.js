import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { get } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.Token;

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.client_id);
  urlencoded.append("client_secret", process.env.client_secret);
  urlencoded.append("username", process.env.username);
  urlencoded.append("password", process.env.password);
  urlencoded.append("agency_name", "ATLANTA_GA");
  urlencoded.append("environment", "SUPP");
  urlencoded.append("grant_type", "password");
  urlencoded.append("scope", "records");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  const Token = await fetch("https://auth.accela.com/oauth2/token", requestOptions)
    .then(response => response.text())
    // .then(result => { console.log(result); return result; })
    // set token variable
    .then(result => {
      var Token = JSON.parse(result).access_token;
      return Token;
    })

  res.render('index', { Token: Token });
  console.log('Serverside:' + Token);
});