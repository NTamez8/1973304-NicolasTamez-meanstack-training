import { Injectable } from '@angular/core';
import { Contact } from '../Classes/Conctact';
import { User } from '../Classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  CurrentUser!: User;
  constructor() { }


  ValidateUser(uname:string, password:string)
  {
    var returnValue = false;
    let parsedUsers:User[] = JSON.parse(sessionStorage.getItem('Key'));
    parsedUsers.forEach(x =>{
      if(x.UName == uname && x.Password == password)
      returnValue =  true;
    })

    return returnValue;
  }

  SetUser(uname:string, password:string)
  {
    
    let parsedUsers:User[] = JSON.parse(sessionStorage.getItem('Key'));
    parsedUsers.forEach(x =>{
      if(x.UName == uname && x.Password == password)
      this.CurrentUser = x;
    })
    
  }

  UpdateUser(uname:string, password:string, contacts:Contact[])
  {
    let parsedUsers:User[] = JSON.parse(sessionStorage.getItem('Key'));
    parsedUsers.forEach(x =>{
      if(x.UName == uname && x.Password == password)
      {
        x.Contacts = contacts;
      }
    })

    let UnParsed = JSON.stringify(parsedUsers);
    sessionStorage.setItem('Key',UnParsed);
  }


}
