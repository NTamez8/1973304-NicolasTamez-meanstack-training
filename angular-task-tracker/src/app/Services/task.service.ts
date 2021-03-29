import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Classes/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    url='http://localhost:3000/Tasks';
  constructor(private http:HttpClient) { }

  getAllTasks():Observable<Task[]>
  {
    
    return this.http.get<Task[]>(this.url);

  }

  addTask(newTask:any)
  {
    this.http.post(this.url,newTask).subscribe(
      val => {
          console.log("PUT call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PUT call in error", response);
      },
      () => {
          console.log("The PUT observable is now completed.");
      });
  }
}
