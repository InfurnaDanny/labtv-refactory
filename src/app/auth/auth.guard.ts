export const AUTHGUARD = ()=>{
  return localStorage.getItem('loggedIn') ? true : false
}
