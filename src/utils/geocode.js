const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1IjoidXJpYWgtYnJpbmdnLWNvbSIsImEiOiJja2szcXZmdm0xZG42MnVwY243cmFxbDgwIn0.8iWEHLWFyzmTXrmAugO3XQ'

    request({ url: url, json: true }, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const geoCode = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, geoCode)
        }
    })
}

module.exports = {
    geocode: geocode
}
