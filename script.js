document.getElementById('button').addEventListener('click', function () {
  // alert('Hello World!');
  fetch('https://apis.accela.com/v4/records', {
    method: 'GET',
    headers
  }
  )
    .then(response => response.json())
    .then(data => document.getElementById('output').innerHTML = JSON.stringify(data))
    .then(data => console.log(data))
    .catch(error => console.error(error)
    );
});

// set headers
const headers = {
  'Content-Type': 'application/json',
  Authorization: secrets.Token
};