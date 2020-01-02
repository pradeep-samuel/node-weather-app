console.log('client side js ....')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMsg = document.querySelector('#locationMsg')
const forecastMsg = document.querySelector('#forecastMsg')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const address = search.value

    locationMsg.textContent = "Loading Forecast..."
    forecastMsg.textContent = ""

    fetch('/weather?address='+address).then((response) => {
    response.json().then((forecastData) => {
        if(forecastData.error){
            locationMsg.textContent = forecastData.error
        }else {
            locationMsg.textContent = forecastData.location
            forecastMsg.textContent = forecastData.forecast

        }
    })
})
})
