const axios = require('axios');

async function fetchNairaRate() {
    const nairaKey = "03e9f2e485b63913392d2526d89e0017ccb88662";
    try {
        const response = await axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=${nairaKey}&from=USD&to=NGN&amount=1&format=json`);
        if (response.data && response.data.rates && response.data.rates.NGN && response.data.rates.NGN.rate) {
            return response.data.rates.NGN.rate;
        } else {
            throw new Error('Naira rate not found in response');
        }
    } catch (error) {
        throw new Error(`Error fetching Naira rate: ${error.message}`);
    }
}

async function fetchSolRate() {
    const solKey = "1DC3830D-23B6-47A7-A132-5E8CF9F4E8AE";
    try {
        const response = await axios.get('https://rest.coinapi.io/v1/exchangerate/SOL?filter_asset_id=USDT', {
            headers: { 'X-CoinAPI-Key': solKey }
        });
        if (response.data && response.data.rates && response.data.rates[0] && response.data.rates[0].rate) {
            return response.data.rates[0].rate;
        } else {
            throw new Error('SOL rate not found in response');
        }
    } catch (error) {
        throw new Error(`Error fetching SOL rate: ${error.message}`);
    }
}

async function solToNgn() {
    try {
        const [nairaRate, solRate] = await Promise.all([fetchNairaRate(), fetchSolRate()]);
        const solToNgnConv = solRate * nairaRate;
        return solToNgnConv.toFixed(2);
        // console.log(solToNgnConv.toFixed(2));
    } catch (error) {
        throw new Error(`Error converting SOL to NGN: ${error.message}`);
    }
}

module.exports = solToNgn;
