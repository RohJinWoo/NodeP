// var send_email = function(){
    
// }

// send_email
var send_email = function(){
    axios.post('/email/emailpost', {email: u.qu('#u_email').value})
    .then((response) => {
        console.log('response', response);
    })
    .catch(function(response){
        console.log('error');
    });
}