var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", "638175950554602975");
urlencoded.append("client_secret", "1d39a06b20794511a8bd5652ecb3d869");
urlencoded.append("username", "kdunlap");
urlencoded.append("password", "ZmK2HvDf4e943fd2%");
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
      const Token = JSON.parse(result).access_token;
      console.log(Token);
    })
    .catch(error => console.log('error', error));
};

document.getElementById('button').addEventListener('click', function (Token) {
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
