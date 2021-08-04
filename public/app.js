const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
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
                msg1.innerHTML = "weather: " + data.forecast +
                "<br/> description: " + data.description + " in " + data.address +
                "<br/> temperature: " + data.temp + "C and it\'s feels like " + data.feels + "C" +
                "<br/> humidity: " + data.humidity +
                "<br/> max temperature: " + data.max_temp + "C" +
                "<br/> latitude " + data.latitude +
                "<br/> longitude " + data.long
                img.src = "https://openweathermap.org/img/wn/" + data.icon + "@2x.png"


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
