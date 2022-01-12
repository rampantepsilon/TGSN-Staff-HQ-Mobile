//Firebase Constants
const fb = firebase.app();
const db = firebase.firestore();
const login = db.collection('users').doc('logins');
const timestamp = db.collection('users').doc('timestamp');
var id;

//Set id
db.collection('app').doc('data').onSnapshot((doc) => {
  id = doc.data().id;
})

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
  <a href='https://obs.ninja/?scene&room=thegamingsaloonnetwork&password=tgsnstaff2020' target="_blank" style='color:black; text-decoration: none;'><div align='center'>VDO.Ninja Viewer</div></a>
  <div align='center'>-------</br>App Functions</br>-------</div>
  <div align='center' onclick='logout()'>Logout</div>
  <div align='center'>Changelog</div>`]
var baseContent = [`
  <div align='center' onclick='window.location.href = "./messages/index.html";'>Message Board</div>
  <div align='center' onclick='window.location.href = "./shows/view/tgs.html";'>TGS Resources</div>
  <div align='center' onclick='window.location.href = "./shows/view/tgsr.html";'>TGSR Resources</div>
  <div align='center' onclick='window.location.href = "./viewer/index.html";'>Schedule Viewer</div>
  <div align='center' onclick='window.location.href = "./commands/index.html";'>TGSNBot Commands</div>
  <div align='center' onclick='window.location.href = "./usrMgr/personal.html";'>User Management</div>
  <div align='center'>-------</br>External Resources</br>-------</div>
  <a href='https://dashboard.twitch.tv/u/thegamingsaloonnetwork/stream-manager' target='_blank' style='color:black; text-decoration: none;'><div align='center'>TGSN Twitch Dashboard</div></a>
  <a href='https://obs.ninja/?scene&room=thegamingsaloonnetwork&password=tgsnstaff2020' target="_blank" style='color:black; text-decoration: none;'><div align='center'>VDO.Ninja Viewer</div></a>
  <div align='center'>-------</br>App Functions</br>-------</div>
  <div align='center' onclick='logout()'>Logout</div>
  <div align='center'>Changelog</div>`]

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

    $("#mainContent").hide();
    dashInit();
  } else {
    content.innerHTML = [`
      <div align='center' onclick='window.location.href = "./login/index.html";'>Login</div>`]
  }
}

function dashInit(){
  var content = document.getElementById('dashContent');

  content.innerHTML = [`
    <table width='100%'>
      <tr>
        <td>
          <h4 align='center'><u>Recent Message</u></h4>
          <div id='messages'></div>
        </td>
      </tr>
      <tr>
        <td style='background-color:rgba(0,0,0,0.5)'>
        </td>
      </tr>
      <tr>
        <td>
          <h4 align='center'><u>Schedule</u></h4>
          <div id='upcomingEvents'></div>
        </td>
      </tr>
      <tr>
        <td style='background-color:rgba(0,0,0,0.5)'>
        </td>
      </tr>
      <tr>
        <td>
          <h4 align='center'><u>TGSNBot Commands</u></h4>
          <div id='commandList'></div>
        </td>
      </tr>
    </table>
    <br>
  `]
  db.collection('app').doc('main').onSnapshot(doc => {
    const data = doc.data();

    document.getElementById('messages').innerHTML = "";

    for (var i = (id - 1); i < id; i ++){
      if (data[i] == null){

      } else {
        const msg = [`
          <div id ='` + i + `' class='chat' style='border-style: double; padding: 5px; position: relative'>
            <div align='left' valign='top' style="width: 100%;">` +
              data[i][1] +
            `</div>
            <div width='150px' valign='top' align='right'><font color='#333' size='2em'>Posted At `
              + data[i][0] + `</font>
            </div>
          </div>`];
        document.getElementById("messages").innerHTML = msg + document.getElementById("messages").innerHTML;
      }
    }
  })

  db.collection('bot').doc('commands').onSnapshot(doc => {
    const data = doc.data();
    var commandList = document.getElementById('commandList');

    var parent = commandList;
    while(parent.hasChildNodes()){
       parent.removeChild(parent.firstChild);
    }

    var list = [];
    for (var j = 0; j < data.list.length; j++){
      list[j] = data.list[j];
    }

    list.sort();

    for (var i = 0; i < data.list.length; i++){
      commandList.innerHTML += '<b><u>!' + list[i] + '</u></b><br> -->' + data.commands[list[i]] + '<br><br>';
    }
  });
}
//Day of week array
const weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

async function getEvents(){
  db.collection('schedule').doc('v3').onSnapshot((doc) => {
    document.getElementById('upcomingEvents').innerHTML = ''
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let currDate;
    if (month < 10){
      month = "0" + month;
    }
    if (day < 10){
      currDate = year + '/' + month + '/0' + day;
    } else {
      currDate = year + '/' + month + '/' + day;
    }

    var dates = [];
    var j = 0;

    for (var i = 0; i < doc.data().length; i++){
      if (doc.data()[i]){
        let eventDate = doc.data()[i].date.substr(6,4) + '/' + doc.data()[i].date.substr(0,2) + '/' + doc.data()[i].date.substr(3,2)
        if (eventDate >= currDate){
          //Calc Day of Week
          const d2 = new Date(doc.data()[i].date);
          let dow = weekday[d2.getDay()]

          //Add to list for sorting
          dates[j] = eventDate + "<div align='center'><h5 align='right' style='background-color: rgba(0, 0, 0, 0.5); color: white; text-shadow: 2px 2px black; padding-right: 4px;'>" + dow + ' ' + doc.data()[i].date + '</h5>' + doc.data()[i].time + '<br>' + doc.data()[i].preShow + '<br>' + doc.data()[i].show + '<br>' + doc.data()[i].game + "<br></div>";
          j++;
        }
      }
    }
    dates.sort();
    for (var i = 0; i < dates.length; i++){
      document.getElementById('upcomingEvents').innerHTML += dates[i].substr(10);
    }
  })
}

function checkTime(){
    const d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    if (hour == 0){
      if (minute < 1){
        getEvents();
      }
    }
}

setInterval(checkTime, 60000);
getEvents();
init();
