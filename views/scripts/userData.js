//Initialize Values
const users = db.collection('users').doc('logins');

users.onSnapshot(doc => {
  const data = doc.data();
  for (var i = 0; i < parseInt(data.numUsers); i++){
    if (data.formatNames[i].toLowerCase() == localStorage.getItem('username')){
      document.getElementById('user').innerHTML = 'Logged In As ' + data.formatNames[i];
    } else {
      document.getElementById('user').innerHTML = 'Not Logged In'
    }
  }
})
