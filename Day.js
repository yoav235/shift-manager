class Day{
    constructor(date,start,end){
        this.date = date;
        this.start = start;
        this.end = end;
    }

    printDate(){
        console.log(this.date.toDateString());
    }

    getStart(){
        return this.start;
    }

    getEnd(){
        return this.end;
    }
}

export default Day;