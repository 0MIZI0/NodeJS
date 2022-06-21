const axios = require('axios');


url = "https://novelpia.com/"
axios.get(url)
    .then(data => {
        console.log(data);
    });
