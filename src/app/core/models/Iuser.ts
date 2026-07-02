export interface Iuser{
  username:string
  password:string
}
export interface Iuserprefrences{
  category1:string
  category2:string
  category3:string
  category4:string
  daily:string
}
export interface categories {
  categories:Iuserprefrences[]
}
