
var change_pw = function(){
    let u_pw = u.qu('#u_pw')
    let u_pw_check = u.qu('#u_pw_check')

    if(u_pw.value === u_pw_check.value)
    {
        var test = u.validation(u_pw.value, 'password') &&
        u.validation(u_pw_check.value, 'password') && (u_pw.value === u_pw_check.value);
    
        if(test){
            let form = u.qu('#form')
            for(i in user){
                form.appendChild(u.node('<input type="hidden" name="'+i+'" id="'+i+'" value="'+user[i]+'">'));
            }
            u.form(form,'./change_pw','post')
        } else {
            alert('다시 입력')
        }
    }else{
        alert('입력하신 두 비밀번호가 서로 다릅니다.');
    }
}