import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Ilogin, IloginRes, Itokendecoded } from '../models/ILogin';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = Environment.apiURL
  constructor(private _http:HttpClient,private _router:Router){}
private userdata = new BehaviorSubject<Itokendecoded|null> (null)
private storagekey ='token'
private storetoken(token:string){
  localStorage.setItem(this.storagekey,token)
}

decodetoken(token:string){
return jwtDecode <Itokendecoded>(token);
}
gettokenfromlocalstorage(){
  return localStorage.getItem(this.storagekey)
}
getloggeduser(token:string){
const decoded = this.decodetoken(token);
this.userdata.next(decoded);
}
getuserstatus(){
return this.userdata.asObservable();
}
// main functions
checkifloggedin(){
  const token =this.gettokenfromlocalstorage()
  if(token){
  const decode = this.decodetoken(token);
  const exp = decode.exp *100
  if(Date.now()<exp){
    this.userdata.next(decode)
  }
  if(Date.now()>exp){
  this.logout();
  }
  else{
    this.userdata.next(null)
  }
  }
}
cleartoken(){
  localStorage.removeItem(this.storagekey)
}
logout(){
  this.cleartoken();
  this.userdata.next(null)
}
login(login:Ilogin){
return this._http.post<IloginRes>(this.apiURL+'login',login).pipe(tap(res=>{
 const user = this.decodetoken(res.data);
  if(user){
    this._router.navigate(['home'])

  this.getloggeduser(res.data);
  this.storetoken(res.data);
  }
  else{
    this._router.navigate(['welcome'])
  }

}))
}
checkifloggedinAndreturnToken(){
  const token=this.gettokenfromlocalstorage();
  if(token){
    const decode = this.decodetoken(token);
    const exp = decode.exp
    if(exp>Date.now()){
     return token
    }
  }
  return null
}
currentuser(){
  const token= this.gettokenfromlocalstorage();
  

}
}


