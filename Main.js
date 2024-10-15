import Worker from './Worker.js';
import {WorkWeek} from './WorkWeek.js';
import { addTestData } from './testData.js';








const workWeek = new WorkWeek();


document.getElementById('workerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const workerName = document.getElementById('workerName').value;
    const worker = new Worker(workerName);

    // Handle time inputs for each day and add them to the worker's schedule
    for (let i = 0; i < 7; i++) {
        const shiftType = document.getElementById(getDayShiftId(i)).value;
        getTime(shiftType, i);
        const startInput = document.getElementById(`${getDayName(i)}Start`).value; 
        const endInput = document.getElementById(`${getDayName(i)}End`).value;
        // console.log(startInput, endInput, "O");

        if (startInput && endInput) {
            const startDate = new Date();
            const endDate = new Date();
            startDate.setHours(...startInput.split(':'));
            endDate.setHours(...endInput.split(':'));
            worker.addWeeklyHours(i, startDate, endDate);
            workWeek.addWorker(worker, i);
        }
    }

    addWorkerToTable(worker);
    workWeek.updateScheduleTable();
});


function addWorkerToTable(worker) {
    const table = document.getElementById('scheduleTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    const nameCell = row.insertCell();
    nameCell.textContent = worker.name;

    for (let i = 0; i < 7; i++) {
        const dayCell = row.insertCell(i + 1);
        if (worker.weeklyHours[i]) {
            dayCell.textContent = `${formatTime(worker.weeklyHours[i].start)} - ${formatTime(worker.weeklyHours[i].end)}`;
        } else {
            dayCell.textContent = 'day off';
        }
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    const buttonCell = row.insertCell();
    buttonCell.appendChild(deleteButton);

    // Attach an event listener to the delete button
    deleteButton.addEventListener('click', function() {
        // Access the parent node of the row and remove the child
        row.parentNode.removeChild(row);
        // Remove the worker from the WorkWeek schedule
        workWeek.removeWorker(worker.name);
    });
}




function getTime(shiftType, i) {
    switch (shiftType) {
        case 'morning':
            document.getElementById(`${getDayName(i)}Start`).value = '07:00';
            document.getElementById(`${getDayName(i)}End`).value = '15:00';    
            break;
        case 'evening':
            document.getElementById(`${getDayName(i)}Start`).value = '15:00';
            document.getElementById(`${getDayName(i)}End`).value = '23:00';
            break;
        case 'night':
            document.getElementById(`${getDayName(i)}Start`).value = '23:00';
            document.getElementById(`${getDayName(i)}End`).value = '07:00';  
            break;
        case 'middle':
            document.getElementById(`${getDayName(i)}Start`).value = '11:00';
            document.getElementById(`${getDayName(i)}End`).value = '19:00';  
            break;
        case 'blank':
            document.getElementById(`${getDayName(i)}Start`).value;
            document.getElementById(`${getDayName(i)}End`).value;   
            break;
        default:
            document.getElementById(`${getDayName(i)}Start`).value = '';
            document.getElementById(`${getDayName(i)}End`).value = '';   
            break;
    }
}


// Function to format time with two digits
function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getDayShiftId(dayIndex){
    const shiftTypeIds = ["sunShiftType", "monShiftType", "tueShiftType", "wedShiftType", "thuShiftType", "friShiftType", "satShiftType"];
    return shiftTypeIds[dayIndex];
}

function getDayName(dayIndex) {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[dayIndex];
}

window.addEventListener('load', function() {
    addTestData();
    // workWeek.updateScheduleTable(); // Ensure the schedule table is updated after loading test data
});



export  {workWeek, addWorkerToTable};