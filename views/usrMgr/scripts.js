function upd8Pass(){
  var oldPass = calcMD5(document.getElementById('oldPass').value);
  var newPass = calcMD5(document.getElementById('newPass').value);
  var confirmPass = calcMD5(document.getElementById('confirmPass').value);
  var user = localStorage.getItem('username').toLowerCase();

  const login = db.collection('users').doc('logins')

  login.onSnapshot(doc => {
    const users = doc.data();

    if (newPass.length > 5){
      if (confirmPass == newPass){
        if (users[user] == oldPass){
          document.getElementById('passError').innerHTML = "Password Changed";
          setTimeout(function(){
            login.update({
              [user]: newPass
            });
            window.location.reload();
          }, 1000)
        } else {
          //If old doesn't match current
          document.getElementById('passError').innerHTML = "Old Password doesn't match. Please try again.";
          window.location.reload();
        }
      } else {
        //If new and confirm don't match
        document.getElementById('passError').innerHTML = "New Passwords don't match. Please try again.";
      }
    } else {
      document.getElementById('passError').innerHTML = "New Password must be 6 characters or more.";
    }

    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
  })
}
function upd8Avatar(){
  var newAvatar = document.getElementById('newAvatar').value;
  var user = localStorage.getItem('username').toLowerCase();

  const login = db.collection('users').doc('logins')

  login.onSnapshot(doc => {
    const users = doc.data();

    if (newAvatar){
      for (var i = 0; i < users.numUsers; i++){
        if (user == users.formatNames[i].toLowerCase()){
          var index = "logo." + i;
          document.getElementById('passError').innerHTML = "Avatar Updated";
          setTimeout(function(){
            login.update({
              [index]: newAvatar
            });
            sessionStorage.setItem('logo', newAvatar);
            setTimeout(function(){
              window.location.reload();
            }, 500);
          }, 1000)
        }
      }
    }
  })
}
