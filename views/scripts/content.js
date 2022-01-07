//Firebase Constants
const fb = firebase.app();
const db = firebase.firestore();
const login = db.collection('users').doc('logins');
const timestamp = db.collection('users').doc('timestamp');

var adminContent = [`
  <div align='center' onclick='window.location.href = "./messages/admin.html";'>Message Board</div>
  <div align='center' onclick='window.location.href = "./shows/admin/tgs.html";'>TGS Resources</div>
  <div align='center' onclick='window.location.href = "./shows/admin/tgsr.html";'>TGSR Resources</div>
  <div align='center' onclick='window.location.href = "./viewer/index.html";'>Schedule Viewer</div>
  <div align='center' onclick='window.location.href = "./schedule/index.html";'>Schedule Editor</div>
  <div align='center' onclick='window.location.href = "./commands/admin.html";'>TGSNBot Commands</div>
  <div align='center' onclick='window.location.href = "./usrMgr/personal.html";'>User Management</div>
  <div align='center'>-------</br>External Resources</br>-------</div>
  <a href='https://dashboard.twitch.tv/u/thegamingsaloonnetwork/stream-manager' target='_blank' style='color:black; text-decoration: none;'><div align='center'>TGSN Twitch Dashboard</div></a>
  <a href='https://obs.ninja/?room=thegamingsaloonnetwork&hash=e588' target="_blank" style='color:black; text-decoration: none;'><div align='center'>VDO.Ninja Viewer</div></a>
  <div align='center'>-------</br>App Functions</br>-------</div>
  <div align='center' onclick='logout()'>Logout</div>`]
var baseContent = [`
  <div align='center' onclick='window.location.href = "./messages/index.html";'>Message Board</div>
  <div align='center' onclick='window.location.href = "./shows/view/tgs.html";'>TGS Resources</div>
  <div align='center' onclick='window.location.href = "./shows/view/tgsr.html";'>TGSR Resources</div>
  <div align='center' onclick='window.location.href = "./viewer/index.html";'>Schedule Viewer</div>
  <div align='center' onclick='window.location.href = "./commands/index.html";'>TGSNBot Commands</div>
  <div align='center' onclick='window.location.href = "./usrMgr/personal.html";'>User Management</div>
  <div align='center'>-------</br>External Resources</br>-------</div>
  <a href='https://dashboard.twitch.tv/u/thegamingsaloonnetwork/stream-manager' target='_blank' style='color:black; text-decoration: none;'><div align='center'>TGSN Twitch Dashboard</div></a>
  <a href='https://obs.ninja/?room=thegamingsaloonnetwork&hash=e588' target="_blank" style='color:black; text-decoration: none;'><div align='center'>VDO.Ninja Viewer</div></a>
  <div align='center'>-------</br>App Functions</br>-------</div>
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
