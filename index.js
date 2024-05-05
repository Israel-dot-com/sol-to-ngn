function solToNgn() {
    const axios = require('axios');
    // Pretend you can't see these please
    const nairaKey = "03e9f2e485b63913392d2526d89e0017ccb88662";
    const solKey = "1DC3830D-23B6-47A7-A132-5E8CF9F4E8AE";

    // Fetch Naira rate
    const nairaPromise = fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=${nairaKey}&from=USD&to=NGN&amount=1&format=json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.rates.NGN.rate;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });

    // Fetch SOL rate
    const solPromise = axios.get('https://rest.coinapi.io/v1/exchangerate/SOL?filter_asset_id=USDT', {
        headers: { 'X-CoinAPI-Key': solKey }
    })
        .then(response => {
            return response.data.rates[0].rate;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });

    // Wait for both promises to resolve
    Promise.all([nairaPromise, solPromise])
        .then(([nairaRate, solRate]) => {
            const solToNgnconv = solRate * nairaRate;
            return solToNgnconv;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

solToNgn();

module.exports = solToNgn;