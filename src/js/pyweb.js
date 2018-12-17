let window = {}
window.server = "http://localhost:5555"

var io = require('socket.io-client');

// Either use this (https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Or use this (https://jsfiddle.net/briguy37/2MVFd/)
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

//console.log(window.server);

//console.log("Connecting on : " + window.server + '/websocket');
const socket = io.connect(window.server + '/websocket');

// let socket = io.connect(window.server + '/websocket');
const req_id = guid();
socket.on('connect', function() {
  socket.emit(req_id, "abc gello");
});

var i = 1; //  set your counter to 1

const req_id_another = generateUUID();
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