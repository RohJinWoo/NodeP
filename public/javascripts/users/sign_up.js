
var sign_up = function(){
    let u_no = u.qu('#u_no')
    let u_name = u.qu('#u_name')
    let u_pw = u.qu('#u_pw')
    let u_email = u.qu('#u_email')

    // input 값 있는지 없는지 체크
    var test = u.validation(u_no.value, 'number') &&
        u.validation(u_name.value, 'engkor') &&
        u.validation(u_pw.value, 'password') &&
        u.validation(u_email.value, 'email');

    // var test = u.validation(u_no.value, 'number');
    // var test = u.validation(u_no.value, 'number');

    if(test){
      let form = u.qu('#form')
      u.form(form,'./users/auth','post')
    } else {
      alert('다 입력')
    }
}