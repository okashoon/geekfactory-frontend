import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {TaskService} from './task.service';
import { SideNavComponent } from './side-nav/side-nav.component';

const appRoutes: Routes = [
  {path:'new', component: NewTaskComponent},
  {path:'index', component: TasksComponent},
  {path:'edit/:id', component: EditTaskComponent},
  {path: '',
   redirectTo: '/index',
   pathMatch:'full'}

]


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    NewTaskComponent,
    EditTaskComponent,
    SideNavComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
