import { Injectable } from '@angular/core';
import {Task} from './task';

@Injectable()
export class TaskService {

  tasks: Task[];
  id: number = 0;

  constructor() {
    this.tasks = []
    
   }

addTask(task: Task): void{
  this.tasks.push(task);
  task.id = this.id++;
}

deleteTask(task): void{
  const index = this.tasks.indexOf(task);
  this.tasks.splice(index,1);
}

get(id: number): Task{
  for(var i = 0; i < this.tasks.length; i++){
    if (this.tasks[i].id === id){
      return this.tasks[i];
    }
  }
}

}
