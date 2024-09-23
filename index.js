import data from './data.json' with { type: 'json' }

var default_activity = "Weekly"
var buttons = document.getElementsByClassName('btn')

// console.log(buttons)

let load_data = (data, activity, buttons) => {
  let container = document.querySelector('.grid-container')
  
  let output = ""
  data.forEach((item) => {
    let timerange = activity == "Daily" ? "Yesterday" : activity == "Weekly" ? "Week" : "Month" 
    let current = item.timeframes[activity.toLowerCase()]["current"]
    let previous = item.timeframes[activity.toLowerCase()]["previous"]
    let img_color = item.title == "Work" ? "work" : item.title == "Play" ? "play" : item.title == "Study" ? "study" : item.title == "Exercise" ? "exercise" : item.title == "Social" ? "social" : "selfcare"

    output += `
      <div class="activity">
        <div class="activity-img clr--${img_color}">
          <img src=${item.title == "Work" ? "./images/icon-work.svg": item.title == "Play" ? "./images/icon-play.svg" : item.title == "Study" ? "./images/icon-study.svg" : item.title == "Exercise" ? "./images/icon-exercise.svg" : item.title == "Social" ? "./images/icon-social.svg": "./images/icon-self-care.svg"} alt=${item.title}>
        </div>
        <div class="activity-info">
          <div class="activity-title">
            <h2>${item.title}</h2>
            <img src="./images/icon-ellipsis.svg" alt="Three dots icon">
          </div>
          <div class="activity-content">
            <h3> ${current}hrs</h3>
            <p>Last ${timerange} - ${previous}hrs</p>
          </div>
        </div>
      </div>
    `
  })

  // console.log(output)
  container.innerHTML += output

  for(let i = 0; i < buttons.length; i++){
    if(buttons[i].getAttribute('data-btn') == activity){
      buttons[i].classList.add('active')
    }
    else {
      buttons[i].classList.remove('active')
    }
  }
}
let on_change_data = (data, activity, buttons) => {
  let activity_content = document.querySelectorAll('.activity-content')

  // console.log(activity_content)
  // console.log(activity_content[0].querySelector('h3'))

  data.forEach((item, index) => {
    let timerange = activity == "Daily" ? "Yesterday" : activity == "Weekly" ? "Week" : "Month" 
    let current = item.timeframes[activity.toLowerCase()]["current"]
    let previous = item.timeframes[activity.toLowerCase()]["previous"]

    // console.log(index)
    activity_content[index].querySelector('h3').innerText = ''+current+'Hrs'
    activity_content[index].querySelector('p').innerText = 'Last '+timerange+' - '+previous+'Hrs'
  })

  for(let i = 0; i < buttons.length; i++){
    if(buttons[i].getAttribute('data-btn') == activity){
      buttons[i].classList.add('active')
    }
    else {
      buttons[i].classList.remove('active')
    }
  }
}

// First loading
load_data(data, default_activity, buttons)

// Add event listener when changing data
for(let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', (e) => {
    default_activity = e.target.getAttribute('data-btn')
    on_change_data(data, default_activity, buttons)
  })
}