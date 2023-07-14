import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/test', async (req, res) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.client_id);
  urlencoded.append("client_secret", process.env.client_secret);
  urlencoded.append("username", process.env.username);
  urlencoded.append("password", process.env.password);
  urlencoded.append("agency_name", "ATLANTA_GA");
  urlencoded.append("environment", "SUPP");
  urlencoded.append("grant_type", "password");
  urlencoded.append("scope", "records");

  let requestOptions = {
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

  // console.log(Token);

  let newHeaders = new Headers();
  newHeaders.append("Authorization", Token);
  newHeaders.append("Content-Type", "application/json");
  // myHeaders.append("User-Agent", "Chrome/88.0.4324.150");
  // myHeaders.append("Host", "apis.accela.com");
  newHeaders.append("Connection", "keep-alive");
  newHeaders.append("Accept", "*/*");
  newHeaders.append("Accept-Encoding", "gzip, deflate, br");

  // set options
  let newOptions = {
    method: 'GET',
    headers: newHeaders,
    redirect: 'follow'
  };

  fetch("https://apis.accela.com/v4/records/", newOptions)
    .then(response => response.json())
    // .then(result => { result.replace(/'/g, '"'); return result; })
    .then(result => { console.log(result.status); return result; })
    // if status code is not 200, show error message
    .then(result => {
      if (result.status !== 200) {
        res.render('err');
        return;
      }
    })
    // .then(result => res.render('index', { result: result }))
    .catch(error => console.error(error));
});

app.get('/err', (req, res) => {
  res.render('err');
});

app.get('/', (req, res) => {
  res.render('index');
});
