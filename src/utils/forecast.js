const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b21cae7249e6c838b11eaf901e3873db/'+longitude+','+latitude+'?units=si';

    request({ url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = forecast;