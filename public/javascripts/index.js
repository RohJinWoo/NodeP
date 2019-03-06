
var login = function(){
  let uno = u.qu('#u_no')
  let upw = u.qu('#u_pw')

  /* 유효성 검사 추가 */

  let form = u.qu('#form')
  u.form(form, './login', 'post')
}

// 회원가입
var sign_up = function(){
  u.link("./sign_up")
}

// 학번 찾기
var find_no = function(){
  u.link("./find_no")
}

// pw 찾기
var find_pw = function(){
  u.link("./find_pw")
}

// function form(form, path, method){
//   form.action = path
//   form.method = method
//   form.submit()
// }