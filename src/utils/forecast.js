const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/33e2f0c558f3ba6fd5858052397c30c7/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, {body: data}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(data.error) {
            callback('Unable to find location', undefined)
        } else { 
            const dailyTemp = data.daily.temperature
            const dailyPrecipProbability = data.daily.precipProbability
            const dailyTempHigh = data.daily.temperatureMax
            const dailyTempLow = data.daily.temperatureMin
            const dataSummary = data.daily.data[0].summary + ' It is currently ' + dailyTemp + ' degrees out. The high for today is ' +  
                dailyTempHigh + ' and the low is ' + dailyTempLow + '. There is a ' + dailyPrecipProbability + '% chance of rain.'
            callback(undefined, dataSummary)
        }
    })
}

module.exports = forecast
