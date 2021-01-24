const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=6215269ed04de91e83c34948413c4610&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, { body } = {} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {

            callback(
                undefined, 
                body.current.weather_descriptions[0] + '. Temperature is ' + body.current.temperature + ', feels like ' + 
                body.current.feelslike + '. Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = {
    weatherForcast: forcast
}