const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')
const img = document.querySelector('.weatherImg')
const clock = document.querySelector('#clock')
const date = document.querySelector('#date')
const copy = document.querySelector('#copyrightDate')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msg1.textContent = "Loading..."
    msg2.textContent = ""




    fetch("/weather?search=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                img.src = ""
            }
            else {
                msg1.textContent = "weather: " + data.forecast
                msg2.textContent = "description: " + data.description + " in " + data.address
                msg3.textContent = "temperature: " + data.temp + "C and it\'s feels like " + data.feels + "C"
                msg4.textContent = "humidity: " + data.humidity
                msg5.textContent = "max temperature: " + data.max_temp + "C"
                msg6.textContent = "latitude " + data.latitude
                msg7.textContent = "longitude " + data.long
                img.src = "http://openweathermap.org/img/wn/" + data.icon + "@2x.png"


            }
        })

    })
})

setInterval(() => {

    let d = new Date();
    let t = d.toLocaleTimeString();
    clock.textContent = t;
    date.textContent = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
    copy.textContent = d.getFullYear()


}, 1000)
