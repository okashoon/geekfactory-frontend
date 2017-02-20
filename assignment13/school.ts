export class Person {

    constructor(public name: string, public role?: string) {

    }

    getRole = function (): string {
        return this.role;
    };

    getInfo = function () {
        return "My name is " + this.name + ". I am a " + this.getRole() + ".";
    }
}

export class Student extends Person{
    constructor(name: string, role?: string){
       super(name, "Student");
    }
}

export class Staff extends Person{
    constructor(name: string, role: string){
        super(name,"Staff");
    }
}

export class Teacher extends Staff{
    constructor(name: string, public subject: string){
        super(name,"Teacher");
    }

    getInfo = function(){
        return "My name is " + this.name + ". I am a " + this.getRole() + ". " + "I teach " + this.subject + ".";
    }
}