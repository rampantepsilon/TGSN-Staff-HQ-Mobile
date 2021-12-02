//Initialize Values
const users = db.collection('users').doc('logins');
var user = localStorage.getItem('username');

if (user){
  document.getElementById('user').innerHTML = 'Logged In As ' + user;
} else {
  document.getElementById('user').innerHTML = 'Not Logged In';
}
