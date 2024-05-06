**Solana to Naira**

Install with ``` npm install sol-to-ngn```

Import or Require with ```const soltongn = require('sol-to-ngn');```

Call the function ```solToNgn()``` and it returns a string

EG: ```
const solToNgn = require('./sol-to-ngn');

solToNgn()
  .then(rate => {
    console.log("SOL to NGN conversion rate:", rate);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });```