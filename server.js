import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required to pull in environment variables
dotenv.config();

// Express routes requests to the server to the appropriate pages
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

// 'EJS' template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// route for ID
app.get('/test/:id', (req, res) => {
  console.log(req.params.id);

  // call accela api with id
  // TODO: add ID call

  res.render('showID', { id: req.params.id });
});

// Data page for all records: Call accela Auth API with env vars, then call accela records API with resulting token, passing response to page
app.get('/test', async (req, res) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  urlencoded.append("client_id", process.env.CLIENT_ID);
  urlencoded.append("client_secret", process.env.CLIENT_SECRET);
  urlencoded.append("username", process.env.ACCELA_USER);
  urlencoded.append("password", process.env.PASSWORD);
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

  // Token is returned from accela auth API
  const Token = await fetch("https://auth.accela.com/oauth2/token", requestOptions)
    .then(response => response.text())
    // .then(result => { console.log(result.status); })
    // set token variable
    .then(result => {
      var Token = JSON.parse(result).access_token;
      return Token;
    })

  // console.log('Token: ' + Token);

  // Set headers for accela records API call
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

  // Call accela records API with token
  fetch("https://apis.accela.com/v4/records/", newOptions)
    .then(response => response.json())
    // dump the response to the console
    .then(result => { console.log(result); return result; })
    // if call is not success, render error page
    .then(result => {
      if (result.status !== 200) {
        res.render('err');
        return;
      } else { res.render(`test`, { result: result }); }
    })
    // .then(result => res.render('test', { result: result }))
    .catch(error => console.error(error));
});

// In case you really want to see the error page
app.get('/err', (req, res) => {
  res.render('err');
});

// landing page
app.get('/', (req, res) => {
  res.render('index');
});