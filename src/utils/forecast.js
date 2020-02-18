const request = require('request')

// const url = 'https://api.darksky.net/forecast/33e2f0c558f3ba6fd5858052397c30c7/37.8267,-122.4233'

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/33e2f0c558f3ba6fd5858052397c30c7/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, {body: data}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(data.error) {
            callback('Unable to find location', undefined)
        } else { 
            const currentTemp = data.currently.temperature
            const currentPrecipProbability = data.currently.precipProbability
            const dataSummary = data.daily.data[0].summary + ' It is currently ' + currentTemp + ' degrees out. There is a ' + currentPrecipProbability + '% chance of rain.'
            callback(undefined, dataSummary)
        }
    })
}

module.exports = forecast
