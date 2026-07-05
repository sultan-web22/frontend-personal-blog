export interface Itokendecoded{
id:string ;
username:string;
 iat: number;
 exp: number;
}
export interface Ilogin{
  username: string;
  password:string ;
}
export interface IloginRes{
  message:string;
  data:string;
}
