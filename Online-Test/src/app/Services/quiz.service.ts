import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../Class/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  GetAllQuizzes():Observable<Quiz[]>
  {

    return this.http.get<Quiz[]>('assets/Quizzes.json');

  }

  GetQuizByID(id:number):Quiz
  {
    var yourQuiz!:Quiz;
    
    let d:Quiz[];
    this.GetAllQuizzes().subscribe(data => d = data);
    for(let x = 0; x < d.length; x++)
    {
      if(d[x].ID == id)
        return d[x];
    }
   
    return yourQuiz;
  }
}


