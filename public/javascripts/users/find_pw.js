
var find_pw = function(){
    let u_name = u.qu('#u_name')
    let u_no = u.qu('#u_no')
    let u_email = u.qu('#u_email')

    // input 값 있는지 없는지 체크
    var test = u.validation(u_name.value, 'engkor') &&
    u.validation(u_no.value, 'number') &&
    u.validation(u_email.value, 'email');

    if(test){
        let form = u.qu('#form')
        u.form(form,'./users/find_pw','post')
    } else {
        alert('다 입력')
    }
}