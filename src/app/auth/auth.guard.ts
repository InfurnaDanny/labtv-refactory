export const AUTHGUARD = ()=>{
  return localStorage.getItem('token') ? true : false
}
