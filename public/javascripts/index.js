
var login = function(){
  let uno = u.qu('#u_no')
  let upw = u.qu('#u_pw')

  /* 유효성 검사 추가 */

  let form = u.qu('#form')
  u.form(form, './login', 'post')
}

// 회원가입
var sign_up = function(){
  let u_no = u.qu('#u_no')
  let u_name = u.qu('#u_name')
  let u_pw = u.qu('#u_pw')
  let u_email = u.qu('#u_email')

  let form = u.qu('#form')
  u.form(form, './sign_up', 'post')
}

// 아이디 및 비밀번호 찾기
var find_user = function(){
  u.form(form, './find_user', 'post')
}

// function form(form, path, method){
//   form.action = path
//   form.method = method
//   form.submit()
// }