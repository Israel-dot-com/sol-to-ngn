const solToNgn = require('./index.js');

solToNgn()
  .then(rate => {
    console.log("SOL to NGN conversion rate:", rate);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });