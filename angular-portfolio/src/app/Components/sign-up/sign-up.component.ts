import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  SignUp = new FormGroup(
    {
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Username: new FormControl(),
      Password: new FormControl(),
    }
  )

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  RegisterUser()
  {
    let UserHolder:User[];

    UserHolder = JSON.parse(sessionStorage.getItem('Key'));

    if(UserHolder == null)
    {
      UserHolder = [];
    }


    let newUser = this.CreateUser();
    UserHolder.push(newUser);
    let newUserString = JSON.stringify(UserHolder);
    sessionStorage.setItem('Key',newUserString);

    this.router.navigate(['']);
  }

  private CreateUser()
  {
    let FName = this.SignUp.controls["FirstName"].value;
    let LName = this.SignUp.controls["LastName"].value;
    let UName = this.SignUp.controls["Username"].value;
    let Password = this.SignUp.controls["Password"].value;
    return new User(FName,LName,UName,Password,[]);

  }

  

}
