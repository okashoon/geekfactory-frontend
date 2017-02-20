export class Task {
    constructor(
        public category: String,
        public title: String,
        public priority: number,
        public estimate: number,
        public spent?: number,
        public remaining?: number
    ) {
        this.spent = this.spent || 0;
        this.remaining = this.remaining || this.estimate;
    }

    track(hours: number): void {
        if (hours > 0) {
            this.spent += hours;
            this.remaining = this.estimate - this.spent;
        }
    }

    done(): boolean {
        if (this.remaining == 0) return true;
        return false;
    }
    complete():void{
        this.remaining = 0;
    }
}