const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=d8c034a002c04c51e20d9251f520efb6&query=' + longitude + ',' + latitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location !', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like '+ body.current.feelslike + ' degree out. The humidity is '+ body.current.humidity + '%.')
        }
    })
}

module.exports = forecast