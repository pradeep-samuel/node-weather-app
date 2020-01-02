const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d387303ed6898703a524aea4b2e75ff6/'+latitude+','+longtitude

    request({ url: url, json : true}, (error, {body}) => {
                if(error){
                    callback('Unable to connect to Weather service')
                }else if(body.error){
                    callback('Unable to find location')
                }
                else{
                    callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees' )
                }
    })
}

module.exports = forecast

