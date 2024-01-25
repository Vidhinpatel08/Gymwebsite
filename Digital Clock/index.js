let checker = document.getElementsByClassName('main')[0].classList.contains('main-dark')
let chour = document.getElementById('hour')
let cminites = document.getElementById('min')
let cseconds = document.getElementById('sec')
let cdates = document.querySelector('.date')
let cam_pm = document.querySelector('#am-pm')
// console.log(hour,minites,seconds,dates)
// console.log(dark)

let MonthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

setInterval(() => {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear()

    let hour = today.getHours();
    let minites = today.getMinutes();
    let seconds = today.getSeconds();

    let am_pm = hour > 12 ? 'PM' : 'AM'
    hour = hour > 12 ? hour - 12 : hour

    hour = hour < 10 ? '0' + hour : hour
    minites = minites < 10 ? '0' + minites : minites
    seconds = seconds < 10 ? '0' + seconds : seconds

    month = MonthList[month]
    let rank;
    if (date == 1) { rank = 'st ' }
    else if (date == 2) { rank = 'nd ' }
    else if (date == 3) { rank = 'rd ' }
    else { rank = 'th ' }
    let dateMonth = date + rank + month + ", " + year

    // console.log(dateMonth,hour,minites,seconds,am_pm)

    cdates.innerHTML = dateMonth
    chour.innerHTML = hour
    cminites.innerHTML = minites
    cseconds.innerHTML = seconds
    cam_pm.innerHTML = am_pm
    
}, 1000)

let darkTheme = document.getElementById('icone-button')
let bodybg = document.getElementById('bodybg')
let moon = document.getElementById('moon')
let sun = document.getElementById('sun')
let iconeButton = document.getElementById('icone-button')
let mainbxbg = document.getElementById('mainbxbg')
darkTheme.addEventListener('click', () => {
    bodybg.classList.toggle('bg-class')
    mainbxbg.classList.toggle('main-dark')
    moon.classList.toggle('d-none')
    sun.classList.toggle('d-none')
    iconeButton.classList.toggle('bg-dark')
    iconeButton.style.backgroundColor ='#C9E4CA'

})
bodybg.classList.add('slow-tran')
mainbxbg.classList.add('slow-tran')
moon.classList.add('slow-tran')
sun.classList.add('slow-tran')
iconeButton.classList.add('slow-tran')

