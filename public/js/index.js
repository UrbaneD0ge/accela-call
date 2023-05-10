document.getElementById('button').addEventListener('click',
  // Records call
  function (Token) {
    // set headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", Token);

    // set options
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://apis.accela.com/v4/records/", requestOptions)
      .then(response => response.text())
      .then(data => document.getElementById('output').innerHTML = data)
      .then(data => console.log(data))
      .catch(error => console.error(error)
      );
  });
