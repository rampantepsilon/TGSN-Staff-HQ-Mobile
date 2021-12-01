/*Chat Module Start*/
const app = firebase.app();
const db = firebase.firestore();
var id;

//Set id
db.collection('app').doc('data').onSnapshot((doc) => {
  id = doc.data().id;
})

function postChat(){
  //e.preventDefault();
  const date = new Date().toLocaleString();
  const chatTxt = document.getElementById('chat-txt');
  const message = chatTxt.value;
  chatTxt.value = '';
  var msgFB = message.replace(/\[url=\'/g, "<a target='_blank' href='").replace(/\'\]/g, "'>").replace(/\[\/url\]/g, '</a>').replace(/\[img\]/g, "<img src='").replace(/\[\/img\]/g, "' />").replace(/\n/g, '<br>');
  var msgDiscord = message.replace(/(' width).*?px\[/g,"[").replace(/\[.*?\]/g, "");

  //Test DB when stuff breaks
  /*db.collection('app').doc('test').update({
    "0": [date, msgFB]
  })*/

  db.collection('app').doc('main').update({
    [id]: [date, msgFB]
  })
  id = parseInt(id + 1);
  db.collection('app').doc('data').update({
    id: id
  })
  var request = new XMLHttpRequest();
  request.open("POST", discordlink)
  request.setRequestHeader('Content-type', 'application/json');
  var params = {
      content: msgDiscord
  }
  request.send(JSON.stringify(params));
}

//Listen for updates
function listener(){
  db.collection('app').doc('main').onSnapshot(doc => {
    const data = doc.data();

    document.getElementById('messages').innerHTML = "";

    for (var i = 1; i < id; i ++){
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
}
/*Chat Module End*/

function showHelp(){
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName('close')[0];

  modal.style.display = 'block';
  span.onclick = function(){
    modal.style.display = 'none';
  }
}

function home(){
  window.location.href = '../index.html';
}
