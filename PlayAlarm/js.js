// // the HTML Audio Element interface can be used to play Audio in the Brower. create an alarm clock which displays the time and plays Sound at a User Specified time.

let DarkModeWindow = true

let WindowTitle1
let WindowTitle2
let panelsetTime;
let panelTimerInterval;


let DarkMood = document.getElementById('DarkMood')
let setting = document.getElementById('setting')

let navbar = document.getElementById('navbar')
let settingBOx = document.getElementById('settingBOx')
let MenuBox = document.getElementById('MenuBox')


// Modal 
let ModalHeader = document.getElementsByClassName('modal-header')[0]
let ModalBody = document.getElementsByClassName('modal-body')[0]
let ModalFooter = document.getElementsByClassName('modal-footer')[0]
let btnClose = document.getElementsByClassName('btn-close')[0]
let ModalHeader1 = document.getElementsByClassName('modal-header')[1]
let ModalBody1 = document.getElementsByClassName('modal-body')[1]
let ModalFooter1 = document.getElementsByClassName('modal-footer')[1]
let btnClose1 = document.getElementsByClassName('btn-close')[1]
let btnSetAlarm = document.getElementById('btn-set-alarm')
let StartAlarmbtn = document.getElementById('StartAlarmbtn')

let circleBoxClock = document.getElementsByClassName('circleBoxClock')[0]

//panel
let panel = document.getElementById('panel')
let panelTitle = document.getElementById('lbl-alarm-title')
let panelTime = document.getElementById('lbl-alarm-time')
let panelTimer = document.getElementById('lbl-alarm-timer')
let btnStopAlarm = document.getElementById('btn-stop-alarm')

// Audio 
let myAudio = document.getElementById('myAudio')
let edtAudio = document.getElementById('edt-audio')
let playpause = document.getElementById('btn-audio-play')
let audioPlay = document.getElementById('audio-play-icon')
let audioPause = document.getElementById('audio-pause-icon')

let TestAlarm = document.getElementById('TestAlarm')
let StopAlarm_ok = document.getElementById('stop-Alarm-ok')
let PlayAlarmModelClose = document.getElementById('PlayAlarmModelClose')

window.addEventListener('load', () => {
  DarkModeWindow = localStorage.getItem('DarkMode')
  if(DarkModeWindow =='false'){
    DarkMood.click()
  }
})



DarkMood.addEventListener('click', () => {
  document.body.classList.toggle('DarkMood-nav')
  navbar.classList.toggle('dark-navbar')
  ModalHeader.classList.toggle('modal-header-style')
  ModalBody.classList.toggle('modal-body-style')
  ModalFooter.classList.toggle('modal-footer-style')
  btnClose.classList.toggle('btn-close-style')
  ModalHeader1.classList.toggle('modal-header-style')
  ModalBody1.classList.toggle('modal-body-style')
  ModalFooter1.classList.toggle('modal-footer-style')
  btnClose1.classList.toggle('btn-close-style')
  panel.classList.toggle('panel-Dark')
  if (document.body.classList.contains('DarkMood-nav')) {
    localStorage.setItem('DarkMode', true)
  }
  else {
    localStorage.setItem('DarkMode', false)
  }
})

setting.addEventListener('click', () => {
  settingBOx.classList.toggle('d-none')
  MenuBox.classList.toggle('d-none')

})

playpause.addEventListener('click', () => {
  audioPlay.classList.toggle('d-none')
  audioPause.classList.toggle('d-none')
})

audioPlay.addEventListener('click', () => {
  playAlarmModal()
  playAudio()
})
audioPause.addEventListener('click', pauseAudio)

edtAudio.addEventListener('change', () => {
  let Musicsrc = document.getElementById('musicSrc')
  Musicsrc.src = `../Alarm_Music/${edtAudio.value}.m4a`
  myAudio.load(); // Reload the audio element to load the new source file
  pauseAudio()
})

function playAudio() {
  playAlarmModal()
  myAudio.play();
}

function pauseAudio() {
  myAudio.pause();
  myAudio.currentTime = 0;
  audioPlay.classList.remove('d-none')
  audioPause.classList.add('d-none')
}

const playAlarmModal = () => {
  let AlarmTitle = document.getElementById('Chlid-AlarmTitleDisplay')
  let AlarmTime = document.getElementById('Chlid-AlarmTimeDisplay')
  let HourSelect = document.getElementById('edt-hour').value
  let MinuteSelect = document.getElementById('edt-minute').value 
  let TitleSelect = document.getElementById('edt-title').value
  AlarmTitle.innerHTML = TitleSelect
  AlarmTime.innerHTML = `${HourSelect.split(' ')[0]} : ${MinuteSelect} ${HourSelect.split(' ')[1]}`
  WindowTitle1 = setInterval(() => {
    document.title = `${HourSelect.split(' ')[0]} : ${MinuteSelect} ${HourSelect.split(' ')[1]}    ${TitleSelect}`
  }, 1500)
  WindowTitle2 = setInterval(() => {
    document.title = 'Alarm Clock'
  }, 3100)
  setInterval(()=>{
    circleBoxClock.style.visibility = 'hidden'
  },1000)
  setInterval(()=>{
    circleBoxClock.style.visibility = 'visible'
  },2000)
}

TestAlarm.addEventListener('click', () => {
  playAudio()
})

StopAlarm_ok.addEventListener('click', () => {
  pauseAudio()
  clearInterval(WindowTitle1)
  clearInterval(WindowTitle2)
  document.title = 'Alarm Clock'
  btnStopAlarm.click()
})

PlayAlarmModelClose.addEventListener('click', () => {
  pauseAudio()
  clearInterval(WindowTitle1)
  clearInterval(WindowTitle2)
  document.title = 'Alarm Clock'
  btnStopAlarm.click()
})

StartAlarmbtn.addEventListener('click', () => {
  panel.classList.remove('d-none')
  btnSetAlarm.classList.add('d-none')
  let HourSelect = document.getElementById('edt-hour').value
  let MinuteSelect = document.getElementById('edt-minute').value
  let TitleSelect = document.getElementById('edt-title').value

  panelTitle.innerHTML = TitleSelect
  panelTime.innerHTML = `${HourSelect.split(' ')[0]} : ${MinuteSelect} ${HourSelect.split(' ')[1]}`

  let timeRemaining = timeRemeber()

  panelTimerInterval = setInterval(() => {
    let timeRemaining = timeRemeber()
    panelTimer.innerHTML = formatTimeRemaining(timeRemaining);
    if (formatTimeRemaining(timeRemaining) == '00:00:00') {
      clearInterval(panelTimerInterval)
    }
  }, 1000)

  panelsetTime = setTimeout(() => {
    TestAlarm.click()
    panel.classList.add('d-none')
    btnSetAlarm.classList.remove('d-none')
  }, timeRemaining)

  // Create an alarm object with all relevant properties
  const alarm = {
    name: panelTitle.innerText,
    time: panelTime.innerText,
  };

  // Store the alarm object in local storage
  localStorage.setItem("myAlarm", JSON.stringify(alarm));

})

btnStopAlarm.addEventListener('click', () => {
  panel.classList.add('d-none')
  btnSetAlarm.classList.remove('d-none')
  panelTime.innerHTML = '-- -- --'
  panelTimer.innerHTML = '-- -- --'
  panelTitle.innerHTML = '-- -- --'
  clearTimeout(panelsetTime)
  clearInterval(panelTimerInterval);
  localStorage.removeItem("myAlarm");
})

const timeRemeber = () => {
  let HourSelect = document.getElementById('edt-hour').value;
  let MinuteSelect = document.getElementById('edt-minute').value;
  let SelectTime = convertTo24HourFormat(`${HourSelect.split(' ')[0].trim()} : ${MinuteSelect.trim()} ${HourSelect.split(' ')[1].trim()}`)

  // HourSelect in my variable like : 1 PM, 5 AM ....
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  let selectedTime = new Date();
  selectedTime.setHours(parseInt(SelectTime.split(':')[0]), parseInt(SelectTime.split(':')[1]), 0, 0);

  let alarmDate;
  if (selectedTime < now) {
    alarmDate = tomorrow;
  } else {
    alarmDate = today;
  }
  alarmDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

  const timeRemaining = alarmDate.getTime() - now.getTime();
  return timeRemaining
}

function convertTo24HourFormat(timeString) {
  // Extract hour, minute, and period from the input string
  const [hourString, minuteString, period] = timeString.split(/[\s:]+/);

  // Convert hour string to a number
  let hour = parseInt(hourString);

  // Adjust hour if period is PM
  if (period.toLowerCase() === 'pm' && hour !== 12) {
    hour += 12;
  }

  // Adjust hour if period is AM and hour is 12
  if (period.toLowerCase() === 'am' && hour === 12) {
    hour = 0;
  }

  // Pad hour and minute with leading zeros
  const hourFormatted = hour.toString().padStart(2, '0');
  const minuteFormatted = minuteString.padStart(2, '0');

  // Return formatted time string in 24-hour format
  return `${hourFormatted}:${minuteFormatted}`;
}

// Helper function to format the remaining time as minutes and seconds
function formatTimeRemaining(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  return `${(hours < 10 ? '0' : '')}${hours}:${(minutes < 10 ? '0' : '')}${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}


const letstimeRemeber = (time) => {
  let SelectTime = convertTo24HourFormat(time.split(' ')[0].trim() + ' : ' + time.split(' ')[2].trim() + ' ' + time.split(' ')[3].trim())

  // HourSelect in my variable like : 1 PM, 5 AM ....
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  let selectedTime = new Date();
  selectedTime.setHours(parseInt(SelectTime.split(':')[0]), parseInt(SelectTime.split(':')[1]), 0, 0);

  let alarmDate;
  if (selectedTime < now) {
    alarmDate = tomorrow;
  } else {
    alarmDate = today;
  }
  alarmDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

  const timeRemaining = alarmDate.getTime() - now.getTime();
  return timeRemaining
}
// Retrieve the alarm object from local storage
const storedAlarm = localStorage.getItem("myAlarm");

// Check if the alarm object exists in local storage
if (storedAlarm) {
  const alarm = JSON.parse(storedAlarm);

  panel.classList.remove('d-none')
  btnSetAlarm.classList.add('d-none')


  panelTitle.innerHTML = alarm.name
  panelTime.innerHTML = alarm.time

  let timeRemaining = letstimeRemeber(alarm.time)

  panelTimerInterval = setInterval(() => {
    let timeRemaining = letstimeRemeber(alarm.time)
    panelTimer.innerHTML = formatTimeRemaining(timeRemaining);
    if (formatTimeRemaining(timeRemaining) == '00:00:00') {
      clearInterval(panelTimerInterval)
    }
  }, 1000)

  panelsetTime = setTimeout(() => {
    TestAlarm.click()
    panel.classList.add('d-none')
    btnSetAlarm.classList.remove('d-none')
  }, timeRemaining)

}
