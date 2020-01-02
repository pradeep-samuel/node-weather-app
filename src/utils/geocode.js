const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhZGVlcHNhbXVlbCIsImEiOiJjazRxbHkybG8zcnVrM2pvYmZtOXZjcDM1In0.PgWx7nqW46F0AIgyGQu74w&limit=1'

    request( {url: url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to location services')
        }else if(!body.features){
            callback('Unable to look up the location')
        }
        else if(body.features && body.features.length === 0){
            callback('Unable to look up the location')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:  body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode