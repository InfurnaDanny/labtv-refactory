import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {User} from "../model/user";
import {Login} from "../model/login.model";
import {BehaviorSubject} from "rxjs";


const LOGIN_API = 'http://localhost:3000/login';
const LOGIN_AUTHORIZE_API = 'http://localhost:3000/600/users/';
const REGISTER_API = 'http://localhost:3000/register';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  
  isLoggegIn = new BehaviorSubject(false);
  userID = new BehaviorSubject<string | undefined>(undefined);
  userName = new BehaviorSubject<string | undefined>(undefined);
  userToken = new BehaviorSubject<string | undefined>(undefined);

  authorize(user: User){
    return this.http.post<Login>(LOGIN_API, user)
  }

  loginAuthorize(id:number){    
    return this.http.get(LOGIN_AUTHORIZE_API + id)
  }

  registerAuthorize(user:User){
    return this.http.post(REGISTER_API, user)
  }

}
