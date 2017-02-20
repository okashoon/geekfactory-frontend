class Task{
    constructor(
        public category: string,
        public title: string,
        public priority: number,
        public estimate: number,
        public spent?: number,
        public remaining?: number
    ){
        this.spent = spent || 0;
        this.remaining = this.remaining || this.estimate - this.spent;
    }

    track(hours: number): void{
        this.spent += hours;
        this.remaining = this.estimate - this.spent;
    }

    done(): boolean{
        return this.remaining === 0;
    }

    complete(): void{
        this.remaining = 0;
    }
}

