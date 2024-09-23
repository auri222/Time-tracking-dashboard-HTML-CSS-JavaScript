# Frontend Mentor - Time tracking dashboard


## Welcome! 👋

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview
### The challenge

Your challenge is to build out this dashboard and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

If you would like to practice working with JSON data, we provide a local `data.json` file for the activities. This means you'll be able to pull the data from there instead of using the content in the `.html` file.

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

Want some support on the challenge? [Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.

### Expected behaviour

- The text for the previous period's time should change based on the active timeframe. For Daily, it should read "Yesterday" e.g "Yesterday - 2hrs". For Weekly, it should read "Last Week" e.g. "Last Week - 32hrs". For monthly, it should read "Last Month" e.g. "Last Month - 19hrs".

### Screenshot

#### 1. Desktop design

![](./images/desktop%20design.png)

#### 2. Desktop active state

![](./images/desktop%20active%20state.png)

#### 3. Mobile design

![](./images/mobile%20design.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

### What I learned

- Using auto-fit in CSS Grid
- Overlap content with CSS Grid
- Loading Json file with import
- Using for each loop, query selector and function in JavaScript

```css
.grid-container {
  max-width: 1100px;
  margin: 1.2rem 1.2rem;
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); 
}

.activity-img {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.activity-info {
  grid-row: 2 / 4;
  grid-column: 1 / 3;
  z-index: 1; /* Overlap here! */
  background: var(--Dark_blue);
  border-radius: 1rem;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```
```js
  // This kind of import is only work on Chrome, Edge and Opera; not work on Firefox
  import data from './data.json' with { type: 'json' }

  var default_activity = "Weekly"
  var buttons = document.getElementsByClassName('btn')
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

  // Add output to container
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

  data.forEach((item, index) => {
    let timerange = activity == "Daily" ? "Yesterday" : activity == "Weekly" ? "Week" : "Month" 
    let current = item.timeframes[activity.toLowerCase()]["current"]
    let previous = item.timeframes[activity.toLowerCase()]["previous"]

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
```


### Continued development

Build this project using ReactJS.

### Useful resources

- [Overlapping Grid Items by Mastery Games](https://mastery.games/post/overlapping-grid-items/) - Basic grid CSS and how to overlap items with clear example (super useful!)
- [Using CSS subgrid to design advanced layouts by Ibadehin Mojeed](https://blog.logrocket.com/using-css-subgrid-design-advanced-layouts/#implementing-css-subgrid-real-projects) - This helps me understand basic grid, subgrid and how to make grid more flexibility.
- [Stackoverflow](https://stackoverflow.com/) (as always) for random questions and sudden problems that faced along the way, [Geeksforgeeks](https://www.geeksforgeeks.org/) for basic stuffs

## Author

- Frontend Mentor - [@auri222](https://www.frontendmentor.io/profile/auri222)
