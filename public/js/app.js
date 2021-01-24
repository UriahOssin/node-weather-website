console.log('Client side JS file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    
    const address = search.value

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Failed to fetch forecast: ' + data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }).catch((error) => {
        messageOne.textContent = 'Error: ' + error
    })
})