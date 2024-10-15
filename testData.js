// testData.js

import Worker from './Worker.js';
import { workWeek, addWorkerToTable } from './Main.js';

function addTestData() {
    const testData = [
        { name: 'Yoav', schedule: ['morning', 'evening', 'morning', 'night', 'middle', 'morning', 'evening'] },
        { name: 'Sean', schedule: ['middle', 'night', 'morning', 'morning', 'evening', 'night', 'middle'] },
        { name: 'Dani', schedule: ['evening', 'morning', 'night', 'middle', 'morning', 'evening', 'night'] },
        { name: 'Gabie', schedule: ['night', 'middle', 'middle', 'evening', 'morning', 'middle', 'middle'] },
        { name: 'Ruth', schedule: ['morning', 'evening', 'evening', 'morning', 'middle', 'night', 'evening'] },
        { name: 'Arik', schedule: ['middle', 'morning', 'night', 'evening', 'morning', 'morning', 'morning'] },
        { name: 'Fred', schedule: ['evening', 'night', 'morning', 'morning', 'middle', 'evening', 'night'] },
        { name: 'Batel', schedule: ['night', 'middle', 'middle', 'evening', 'morning', 'night', 'middle'] },
        { name: 'Khaled', schedule: ['morning', 'evening', 'morning', 'night', 'middle', 'morning', 'evening'] },
        { name: 'Liat', schedule: ['middle', 'night', 'morning', 'middle', 'evening', 'night', 'morning'] },
        { name: 'Neta', schedule: ['evening', 'morning', 'night', 'morning', 'evening', 'morning', 'night'] },
        { name: 'Yossi', schedule: ['night', 'middle', 'morning', 'evening', 'morning', 'middle', 'morning'] }
    ];

    testData.forEach(workerData => {
        const worker = new Worker(workerData.name);
        workerData.schedule.forEach((shift, dayIndex) => {
            const startEndTimes = getShiftTimes(shift);
            worker.addWeeklyHours(dayIndex, new Date(`1970-01-01T${startEndTimes.start}:00`), new Date(`1970-01-01T${startEndTimes.end}:00`));
            workWeek.addWorker(worker, dayIndex);
        });

        addWorkerToTable(worker); // Add the worker to the table
    });

    workWeek.updateScheduleTable(); // Update the schedule table after adding test data
}
function getShiftTimes(shift) {
    switch (shift) {
        case 'morning':
            return { start: '07:00', end: '15:00' };
        case 'middle':
            return { start: '11:00', end: '19:00' };
        case 'evening':
            return { start: '15:00', end: '23:00' };
        case 'night':
            return { start: '23:00', end: '07:00' };
        default:
            return { start: '00:00', end: '00:00' };
    }
}

// Export the addTestData function so it can be used in other files
export { addTestData };
