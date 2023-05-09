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
  Authorization: "X-_1qAWTJ5khaz27QHKZAXG8zs1FbSXR-C9uOKQJ6NX-zrb5d-jrtuse9Zk_ciBdmrGQZ2DvPXlwS7A7L7j6mY-2wqlch_FKrZzarXzpFhtQ6P9f5GFpGrkkuqYN0OdAmkY6o3SBzxPE-Jb8XOxUICclpmZ_WhQY5_ePfwJrYO_13QfgXF6Z6krkOx58nib6P4s18ywpmQN5KnCBLPiW9vsAWAAZeEj8VfaUnj4G81WgZ0T3hy7vYPIqS3EMt0JirewZO7ek3s-d3Kfw65OLJTWZ4CPA2wn7eqEYBCfB1Lmr2y1ciEGTTFqBr2rYvrLT_leue6AIDc2_jFT6I3d_jCQ44GNpxvMN4yEtyLYi52_DGml9icAdDnUq1Ot0efmaiB-hCblfYIMzeh8wx7F5SCUnwzZ51xQqBBF2iAeAv9A1"
};