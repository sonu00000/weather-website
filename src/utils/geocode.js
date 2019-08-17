const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic291bWFqaXQ5NCIsImEiOiJjano0ZWlwd28wY2I0M2NwYmE5dDBtZjQ5In0.cvgDwHloL6CydTBlC9CRPQ&limit=1';

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } )
}

module.exports = geocode;