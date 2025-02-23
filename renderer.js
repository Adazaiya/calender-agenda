const calendarGrid = document.getElementById('calendarGrid');
const monthYear = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const datePicker = document.getElementById('datePicker');
const notes = document.getElementById('notes');
const saveButton = document.getElementById('save');
const agendaDisplay = document.getElementById('agendaDisplay');

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Generate Monthly Calendar
function generateCalendar() {
    calendarGrid.innerHTML = "";
    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty spaces for first week
    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement('div');
        calendarGrid.appendChild(emptyDiv);
    }

    // Add days
    for (let day = 1; day <= totalDays; day++) {
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        let today = new Date();
        if (today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day) {
            dayDiv.classList.add('current-day');
        }

        calendarGrid.appendChild(dayDiv);
    }
}

// Change Month
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Load saved notes
function loadAgendas() {
    agendaDisplay.innerHTML = '';
    let agendas = JSON.parse(localStorage.getItem('agendas')) || {};

    for (let date in agendas) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${date}:</strong> ${agendas[date]}`;
        agendaDisplay.appendChild(listItem);
    }
}

// Save agenda
saveButton.addEventListener('click', () => {
    let selectedDate = datePicker.value;
    let noteText = notes.value.trim();

    if (selectedDate && noteText) {
        let agendas = JSON.parse(localStorage.getItem('agendas')) || {};
        agendas[selectedDate] = noteText;
        localStorage.setItem('agendas', JSON.stringify(agendas));
        notes.value = '';
        loadAgendas();
    } else {
        alert('Please select a date and enter a note.');
    }
});

// Initialize
generateCalendar();
loadAgendas();
