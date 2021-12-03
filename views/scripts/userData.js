//Initialize Values
const users = db.collection('users').doc('logins');
const timestamp = db.collection('users').doc('timestamp');
var user = localStorage.getItem('username');

if (user){
  document.getElementById('user').innerHTML = 'Logged In As ' + user;
} else {
  document.getElementById('user').innerHTML = 'Not Logged In';
}

var tsTime = new Date().toLocaleString();

timestamp.update({
  [user]: tsTime
})
