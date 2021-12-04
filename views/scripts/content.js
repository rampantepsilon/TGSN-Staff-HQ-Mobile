//Firebase Constants
const fb = firebase.app();
const db = firebase.firestore();
const login = db.collection('users').doc('logins');
const timestamp = db.collection('users').doc('timestamp');

var adminContent = [`
  <div align='center' onclick='window.location.href = "./messages/index.html";'>Message Board</div>
  <div align='center' onclick='window.location.href = "./viewer/index.html";'>Schedule Viewer</div>
  <div align='center' onclick='window.location.href = "./schedule/index.html";'>Schedule Editor</div>
  <div align='center' onclick='window.location.href = "./commands/index.html";'>TGSNBot Commands</div>
  <div align='center' onclick='logout()'>Logout</div>`]
var baseContent = [`
  <div align='center' onclick='window.location.href = "./messages/index.html";'>Message Board</div>
  <div align='center' onclick='window.location.href = "./viewer/index.html";'>Schedule Viewer</div>
  <div align='center' onclick='window.location.href = "./commands/index.html";'>TGSNBot Commands</div>
  <div align='center' onclick='logout()'>Logout</div>`]

function init(){
  var content = document.getElementById('mainContent');
  var loggedIn = localStorage.getItem('loggedIn');
  var position = localStorage.getItem('position')

  if (loggedIn == 'yes'){
    if (position == 'Network Admin' || position == 'TGSN Coordinator'){
    content.innerHTML = adminContent
    } else {
      content.innerHTML = baseContent
    }
  } else {
    content.innerHTML = [`
      <div align='center' onclick='window.location.href = "./login/index.html";'>Login</div>`]
  }
}

init()
