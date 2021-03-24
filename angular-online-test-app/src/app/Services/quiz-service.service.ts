import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../Classes/Quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http:HttpClient) { }


  getQuizzes():Observable<string>
  {
    return this.http.get<string>('https://localhost:44300/api/quiz');
  }
}
