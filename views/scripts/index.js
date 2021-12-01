//Login
function fLogin(){
  var uName = document.getElementById('uName').value.toLowerCase();
  var pWord = calcMD5(document.getElementById('pWord').value);
  const app = firebase.app();
  const db = firebase.firestore();
  const login = db.collection('users').doc('logins')
  const timestamp = db.collection('users').doc('timestamp')

  login.get().then((doc) => {
    const users = doc.data();
    var userNames = users['formatNames'];

    if (users[uName]){
      if (users[uName] == pWord){
        document.getElementById('loginError').innerHTML = 'Login Successful';
        setTimeout(function(){document.getElementById('loginError').innerHTML = ''; document.getElementById('uName').value = ''; document.getElementById('pWord').value = '';}, 1000)
        $("#send-message").show();
        localStorage.setItem('loggedIn', 'yes')

        //Update User Fields
        for (var j = 0; j < users.numUsers; j++){
          if (uName == userNames[j].toLowerCase()){
            localStorage.setItem('position', users['position'][j])
            var tsUName = userNames[j];
            var tsTime = new Date().toLocaleString();
            timestamp.update({
              [tsUName]: tsTime
            })
            localStorage.setItem('username', uName);
            localStorage.setItem('password', pWord);
            window.location.href = "../index.html";
          }
        }
        for (var i = 1; i < id; i ++){
          $('#replyField' + i).show();
        }
      } else {
        document.getElementById('loginError').innerHTML = 'Incorrect Password'
      }
    } else {
      console.log('User Fails')
      document.getElementById('loginError').innerHTML = 'User Does Not Exist. If this is an error, please contact RampantEpsilon on Discord.'
    }
  })
}
function logout(){
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('position');
  localStorage.removeItem('loggedIn');
  home();
}
