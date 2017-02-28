import { Component, OnInit } from '@angular/core';
import {Task} from '../task';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  
  task: Task = new Task();
  constructor(
   private route: ActivatedRoute,
   private taskService: TaskService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => this.task = this.taskService.get(parseInt(p['id'])))
  }

}
