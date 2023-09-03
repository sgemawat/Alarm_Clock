// Selecting DOM elements
const currentTime = document.querySelector("h1"); // Current time display
const content = document.querySelector(".content"); // Content container
const selectMenu = document.querySelectorAll("select"); // Select dropdowns
const setAlarmBtn = document.querySelector("button"); // Set Alarm button

// Initialize variables
let alarmTime, isAlarmSet;
const ringtone = new Audio("./ringtone.mp3"); // Audio element for the alarm ringtone

// Populate the hour dropdown with options from 12 to 1
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populate the minute dropdown with options from 59 to 0
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populate the AM/PM dropdown with "AM" and "PM" options
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Update the current time every second
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Check if the alarm time matches the current time
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play(); // Play the alarm ringtone
        ringtone.loop = true; // Set the ringtone to loop
    }
});

// Function to set or clear the alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause(); // Pause the alarm ringtone
        content.classList.remove("disable"); // Remove the "disable" class from content
        setAlarmBtn.innerText = "Set Alarm"; // Update button text
        return isAlarmSet = false; // Reset the alarm status
    }

    // Get the selected time from dropdowns
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    // Check if a valid time is selected
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!"); // Display an alert for invalid time
    }

    alarmTime = time; // Set the alarm time
    isAlarmSet = true; // Set the alarm status to true
    content.classList.add("disable"); // Add the "disable" class to content
    setAlarmBtn.innerText = "Clear Alarm"; // Update button text
}

// Add a click event listener to the Set Alarm button
setAlarmBtn.addEventListener("click", setAlarm);
