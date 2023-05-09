document.getElementById('button').addEventListener('click', function () {
  fetch('https://apis.accela.com/v4/records', {
    method: 'GET',
    headers
  }
  )
    .then(response => response.json())
    .then(data => console.log(data))
    .then(data => document.getElementById('output').innerHTML = data.result[0].id)
    .catch(error => console.error(error)
    );
});