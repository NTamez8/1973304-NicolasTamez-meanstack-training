import { Injectable } from '@angular/core';
import { User } from '../Classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  CurrentUser!: User;
  constructor() { }
}
