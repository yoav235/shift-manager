import  Worker  from "./Worker.js";

class WorkWeek{
    constructor(){
        this.workDays = new Array(7).fill(undefined);
    }



    addWorker(worker, dayNum){
        console.log(`Adding ${worker.name} to day ${dayNum}`);
        if(this.workDays[dayNum] == undefined){
            console.log(`Day ${dayNum} is undefined`);
            this.workDays[dayNum] = new WorkDay(dayNum);
        }
        this.workDays[dayNum].addWorker(worker);
        
    }

    removeWorker(workerName) {
        this.workDays.forEach(day => {
            if (day !== undefined) {
                day.removeWorker(workerName);
            }
        });
        this.updateScheduleTable();
    }

    
    printWorkWeek() {
        this.workDays.forEach((day, index) => {
            if (day === undefined) {
                console.log(`Day ${index}: Not working`);
            } else {
                console.log(`Day ${index}:`);
                day.printWorkday();
            }
        });
    }

    updateScheduleTable() {
        const table = document.getElementById('schedule').getElementsByTagName('tbody')[0];
        table.innerHTML = '';  // Clear the table first
    
        const shifts = ['morning', 'middle', 'evening', 'night'];
    
        // Create rows for each shift
        shifts.forEach((shift, rowIndex) => {
            const row = table.insertRow();
            const shiftCell = row.insertCell(0); // First column for shift names
            shiftCell.textContent = shift.charAt(0).toUpperCase() + shift.slice(1); // Capitalize shift name
            shiftCell.classList.add('shift'); // Add the 'shift' class for styling
    
            for (let i = 0; i < 7; i++) {
                const cell = row.insertCell(i + 1); // Adjust index to start from the second column
                if (this.workDays[i] === undefined) {
                    cell.textContent = '';
                } else {
                    let shiftWorkers = this.workDays[i][shift];
                    cell.textContent = shiftWorkers.join(', ');
                }
            }
        });
    
        // Add the row for important updates
        const updatesRow = table.insertRow();
        const updatesShiftCell = updatesRow.insertCell(0); // First column for updates label
        updatesShiftCell.textContent = 'Updates';
        updatesShiftCell.classList.add('update'); // Add the 'update' class for styling
    
        for (let i = 0; i < 7; i++) {
            const cell = updatesRow.insertCell(i + 1); // Adjust index to start from the second column
            if (this.workDays[i] !== undefined && this.workDays[i].updates !== undefined) {
                cell.textContent = this.workDays[i].updates.join(', ');
            } else {
                cell.textContent = '';
            }
        }
    }
    
              
}








class WorkDay {
    constructor(dayNum) {
        this.dayNum = dayNum;
        this.morning = []; /* Array of workers working in the morning between 7:00 to 15:00 */
        this.middle = []; /* Array of workers working in the middle between 11:00 to 19:00 */
        this.evening = []; /* Array of workers working in the evening between 15:00 to 23:00 */
        this.night = []; /* Array of workers working in the night between 23:00 to 07:00 */
        this.dayOff = []; /* Array of workers who have the day off */
        this.updates = []; /* Array of updates for the day */
    }

    addWorker(worker) {
        const startHour = worker.weeklyHours[this.dayNum].start.getHours();
        if (startHour >= 4 && startHour <= 9) {
            this.morning.push(worker.name);
        } else if (startHour >= 10 && startHour <= 13) {
            this.middle.push(worker.name);
        } else if (startHour >= 14 && startHour <= 21) {
            this.evening.push(worker.name);
        } else if (startHour >= 22 || startHour <= 3) {
            this.night.push(worker.name);
        } else {
            this.dayOff.push(worker.name);
        }
    }

    removeWorker(workerName) {
        this.morning = this.morning.filter(name => name !== workerName);
        this.middle = this.middle.filter(name => name !== workerName);
        this.evening = this.evening.filter(name => name !== workerName);
        this.night = this.night.filter(name => name !== workerName);
        this.dayOff = this.dayOff.filter(name => name !== workerName);
    }

    printWorkday() {
        for (let i = 0; i < this.morning.length; i++) {
            console.log(`Morning: ${this.morning[i].printWorkday(this.dayNum)}`);
        }
        for (let i = 0; i < this.middle.length; i++) {
            console.log(`Middle: ${this.middle[i].printWorkday(this.dayNum)}`);
        }
        for (let i = 0; i < this.evening.length; i++) {
            console.log(`Evening: ${this.evening[i].printWorkday(this.dayNum)}`);
        }
        for (let i = 0; i < this.night.length; i++) {
            console.log(`Night: ${this.night[i].printWorkday(this.dayNum)}`);
        }
    }
}




    



export  { WorkWeek, WorkDay };