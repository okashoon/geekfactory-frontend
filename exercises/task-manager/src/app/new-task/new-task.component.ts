import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import{TaskService} from '../task.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task: Task = new Task();

  constructor(private router: Router, private taskService: TaskService) { }

  ngOnInit() {
  }
  submit(){
    this.taskService.addTask(this.task);
    this.task = new Task();
    this.router.navigate(['index']);
  }

}
