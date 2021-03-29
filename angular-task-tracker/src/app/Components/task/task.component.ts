import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { Task } from 'src/app/Classes/task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  TaskForm = new FormGroup({
    ID:new FormControl('',[Validators.required]),
    uname:new FormControl('',[Validators.required]),
    task:new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required])
  })
  constructor(private tService:TaskService) { }
  displayedColumns: string[] = ['id', 'name', 'task', 'date'];
  dataSource:Task[] = [];

  ngOnInit(): void {
    this.tService.getAllTasks().subscribe(data=>this.dataSource = data);
  }

  

  SubmitTask()
  {
    let newTask = this.buildTask();
    this.tService.addTask(newTask);
  }

  buildTask()
  {
    let id = this.TaskForm.controls['ID'].value;
    let name = this.TaskForm.controls['uname'].value;
    let task  = this.TaskForm.controls['task'].value;
    let date = this.TaskForm.controls['date'].value;

    return new Task(parseFloat(id),name,task,date);


  }
  

}
