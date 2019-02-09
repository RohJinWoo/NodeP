
var login = function(){
  let uno = u.qu('#u_no')
  let upw = u.qu('#u_pw')

  /* 유효성 검사 추가 */

  let form = u.qu('#form')
  u.form(form, './login', 'post')
}

// function form(form, path, method){
//   form.action = path
//   form.method = method
//   form.submit()
// }