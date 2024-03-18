
let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log(document.getElementById('address').value)
    weatherFun()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const lang = document.getElementById('lang')
const lat = document.getElementById('lat')

// async --> function return promise
let weatherFun = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const geo = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw')
        const geoJ = await geo.json()
        const a =geoJ.features[0].center[0]
        const b = geoJ.features[0].center[1]
        console.log(geoJ)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText = ''
            forecastF.innerText = ''
            lat.innerText = ''
            lang.innerText = ''
        }

        else {
            locationF.innerText = data.location
            forecastF.innerText = data.forecast
            // lat.innerText = geoJ.features[0].center[0]
            // lang.innerText = geoJ.features[0].center[1]
            errorF.innerText = ''
            setTimeout(5000);
            printLatAndLang(a,b)

        }
    }
    catch(e){
        console.log(e)
    }
}

function printLatAndLang(a,b) {
    lat.innerText = a
    lang.innerText = b
}
