const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/33e2f0c558f3ba6fd5858052397c30c7/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else { 
            const dailyTemp = body.currently.temperature
            const dailyPrecipProbability = Math.round(body.daily.data[0].precipProbability * 100)
            const dailyTempHigh = body.daily.data[0].temperatureHigh
            const dailyTempLow = body.daily.data[0].temperatureLow
            const dataSummary = body.daily.data[0].summary + ' It is currently ' + dailyTemp + ' degrees out. The high for today is ' +  
                dailyTempHigh + ' and the low is ' + dailyTempLow + '. There is a ' + dailyPrecipProbability + '% chance of rain.'
            callback(undefined, dataSummary)
        }
    })
}

module.exports = forecast
