let window = {}
window.server = "http://localhost:5555"

const io = require('socket.io-client');
const uuidv4 = require('uuid/v4');

//console.log(window.server);

//console.log("Connecting on : " + window.server + '/websocket');
const socket = io.connect(window.server + '/websocket');

// let socket = io.connect(window.server + '/websocket');
const req_id = uuidv4();
socket.on('connect', function() {
  socket.emit(req_id, "abc gello");
});

var i = 1; //  set your counter to 1

const req_id_another = uuidv4();
function myLoop() { //  create a loop function
  setTimeout(function() { //  call a 3s setTimeout when the loop is called    
    i++; //  increment the counter
    if (socket.connected) {
      socket.emit(req_id_another, "abc another");
    } else {
      myLoop();
    }
  }, 300)
}

myLoop(); //  start the loop

socket.on('fireout', function(msg) {
  if (typeof(msg.state) !== 'undefined') {
    console.log('state: ' + msg.state);
  }
  if (typeof(msg.req_id) !== 'undefined') {
    console.log('req_id: ' + msg.req_id);
  }
  if (typeof(msg.stdout) !== 'undefined') {
    console.log('stdout: ' + msg.stdout);
  }
  if (typeof(msg.stderr) !== 'undefined') {
    console.log('stderr: ' + msg.stderr);
  }
});