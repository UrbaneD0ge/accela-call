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

function getToken() {
  fetch("https://auth.accela.com/oauth2/token", requestOptions)
    .then(response => response.text())
    // set token variable
    .then(result => {
      var Token = JSON.parse(result).access_token;
      return Token;
    })
    .catch(error => console.log('error', error));
}

document.getElementById('button').addEventListener('click', function () {
  getToken();
  // set headers
  const headers = {
    'Content-Type': 'application/json',
    Authorization: Token
  }
  // alert('Hello World!');
  fetch('https://apis.accela.com/v4/records', {
    method: 'GET',
    headers
  })
    .then(response => response.json())
    .then(data => document.getElementById('output').innerHTML = JSON.stringify(data))
    .then(data => console.log(data))
    .catch(error => console.error(error)
    );
});
