
var sign_up = function(){
    let u_no = u.qu('#u_no')
    let u_name = u.qu('#u_name')
    let u_pw = u.qu('#u_pw')
    let u_email = u.qu('#u_email')

    let form = u.qu('#form')
    u.form(form,'./sign_up/auth','post')
}