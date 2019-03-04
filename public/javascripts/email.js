// var send_email = function(){
    
// }

// send_email
var send_email = function(e_req){
    axios.post('/email/emailpost', {email: u.qu('#u_email').value, req: e_req})
    .then((response) => {
        console.log('response', response);
    })
    .catch(function(response){
        console.log('error');
    });
}