// Document Object Model (DOM) element references
const currentTime = document.querySelector("h1"), // Reference to the element displaying the current time
  content = document.querySelector(".content"), // Reference to the content section
  hourSelect = document.getElementById("hour"), // Reference to the hour select element
  minuteSelect = document.getElementById("minute"), // Reference to the minute select element
  ampmSelect = document.getElementById("ampm"), // Reference to the AM/PM select element
  setAlarmBtn = document.getElementById("setAlarm"), // Reference to the "Set Alarm" button
  clearAlarmsBtn = document.getElementById("clearAlarms"), // Reference to the "Clear All Alarms" button
  alarmsContainer = document.getElementById("alarms"); // Reference to the container for displaying alarms

// Initialize variables
let alarms = []; // Array to store alarm times
let alertShown = false; // Flag to track whether the alert has been shown

// Populate the hour dropdown with options from 12 to 1
for (let i = 12; i > 0; i--) {
  let option = `<option value="${i < 10 ? '0' + i : i}">${i < 10 ? '0' + i : i}</option>`;
  hourSelect.insertAdjacentHTML("beforeend", option);
}

// Populate the minute dropdown with options from 0 to 59
for (let i = 0; i <= 59; i++) {
  let option = `<option value="${i < 10 ? '0' + i : i}">${i < 10 ? '0' + i : i}</option>`;
  minuteSelect.insertAdjacentHTML("beforeend", option);
}

// Populate the AM/PM dropdown with "AM" and "PM" options
ampmSelect.innerHTML = '<option value="AM">AM</option><option value="PM">PM</option>';

// Function to update the current time displayed
function updateCurrentTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  // Check if any alarms match the current time and the alert hasn't been shown
  const currentAlarmTime = `${h}:${m} ${ampm}`;
  if (alarms.includes(currentAlarmTime) && !alertShown) {
    alert(`Alarm: ${currentAlarmTime}`);
    alertShown = true; // Set the flag to true to indicate that the alert has been shown
  } else if (!alarms.includes(currentAlarmTime)) {
    // Reset the alert flag if the current time no longer matches any alarms
    alertShown = false;
  }
}

// Function to create an alarm element
function createAlarmElement(time) {
  const alarmElement = document.createElement("div");
  alarmElement.classList.add("alarm");

  // Create a delete button for the alarm
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("alarm-delete-button");
  deleteButton.innerText = "Delete";

  // Event listener to delete the alarm when the button is clicked
  deleteButton.addEventListener("click", () => {
    const index = alarms.indexOf(time);
    if (index !== -1) {
      deleteAlarm(index);
    }
  });

  // Display the time and the delete button
  alarmElement.innerText = time;
  alarmElement.appendChild(deleteButton);

  // Append the alarm element to the alarms container
  alarmsContainer.appendChild(alarmElement);
}

// Function to add a new alarm
function addAlarm() {
  const selectedHour = hourSelect.value;
  const selectedMinute = minuteSelect.value;
  const selectedAmPm = ampmSelect.value;

  if (selectedHour === "Hour" || selectedMinute === "Minute") {
    alert("Please select a valid time for the alarm.");
    return;
  }

  // Format the new alarm time
  const newAlarm = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
  alarms.push(newAlarm);

  // Create and display the new alarm element
  createAlarmElement(newAlarm);
  updateLocalStorage();
  resetSelects();
}

// Function to reset the select boxes
function resetSelects() {
  hourSelect.selectedIndex = 0;
  minuteSelect.selectedIndex = 0;
  ampmSelect.selectedIndex = 0;
}

// Function to delete an alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  alarmsContainer.removeChild(alarmsContainer.children[index]);
  updateLocalStorage();
}

// Function to load alarms from local storage
function loadAlarmsFromLocalStorage() {
  const storedAlarms = localStorage.getItem("alarms");
  if (storedAlarms) {
    alarms = JSON.parse(storedAlarms);
    alarms.forEach((alarm) => createAlarmElement(alarm));
  }
}

// Function to update local storage with alarms
function updateLocalStorage() {
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Event listeners
setAlarmBtn.addEventListener("click", addAlarm);
clearAlarmsBtn.addEventListener("click", () => {
  alarms = [];
  alarmsContainer.innerHTML = "";
  updateLocalStorage();
});

// Load alarms from local storage and update current time
loadAlarmsFromLocalStorage();
updateCurrentTime();
// Update current time periodically
setInterval(updateCurrentTime, 1000);
