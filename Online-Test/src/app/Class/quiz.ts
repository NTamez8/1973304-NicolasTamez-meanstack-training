import { QuizQuestion } from "./quiz-question";

export class Quiz {
    constructor(public ID:number,public ShortDesc:string, public Questions:QuizQuestion[],public Answers:string){}
}
