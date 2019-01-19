var u = {
  form: function(from, path, method){
    form.action = path
    form.method = method
    form.submit()
  },
  qu: function (str){
    return document.querySelector(str)
  }
}