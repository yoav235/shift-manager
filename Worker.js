import Day from './Day.js';


class Worker {
  constructor(name) {
    this.name = name;
    this.weeklyHours = new Array(7);
    this.trust = 0;
    // this.preferences = new Array(7);
  }

    addWeeklyHours(day_num, start, end) {
        if (day_num < 0 || day_num > 6) {
            console.log("Invalid day number");
            return;
        }
        let day = new Day(null, new Date(start), new Date(end));
        this.weeklyHours[day_num] = day;
    }

    printWeeklyHours() {
        for (let i = 0; i < this.weeklyHours.length; i++) {
            // console.log(`Processing day ${i}: this.weeklyHours[i].start = ${this.weeklyHours[i].end}`);
            if(this.weeklyHours[i] == undefined){
                console.log(`Day ${i}: Not working`);
                continue;
            }
            console.log(`Day ${i}: ${this.weeklyHours[i].start.toLocaleTimeString()}, ${this.weeklyHours[i].end.toLocaleTimeString()}`);
        }
    }

    printWorkDay(dayNum){
        if(this.weeklyHours[dayNum] == undefined){
            console.log(`Day ${dayNum}: Not working`);
            return;
        }
        console.log(`Day ${dayNum}: ${this.weeklyHours[dayNum].start.toLocaleTimeString()}, ${this.weeklyHours[dayNum].end.toLocaleTimeString()}`);
    }

 
}

export default Worker;