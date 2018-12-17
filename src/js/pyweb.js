
const io = require('socket.io-client');
const uuidv4 = require('uuid/v4');

let window = {}
window.server = "http://localhost:5555"
const socket = io.connect(window.server + '/websocket');

exports.fire = function (cmd = "pyweb test", callback) {
    var i = 1; //  set your counter to 1
    const req_id = uuidv4();
    function myLoop() { //  create a loop function
        setTimeout(function () { //  call a 3s setTimeout when the loop is called
            i++; //  increment the counter
            if (socket.connected) {
                socket.emit(req_id, cmd);
            } else {
                myLoop();
            }
        }, 300)
    }
    myLoop(); //  start the loop

    socket.on('fireout', function (msg) {
        if (typeof (msg.state) !== 'undefined') {
            // console.log('state: ' + msg.state);
        }
        if (typeof (msg.req_id) !== 'undefined') {
            if (req_id == msg.req_id) {
                callback(msg.stdout, msg.stderr, msg.state);
            }
            // console.log('req_id: ' + msg.req_id);
        }
        if (typeof (msg.stdout) !== 'undefined') {
            // console.log('stdout: ' + msg.stdout);
        }
        if (typeof (msg.stderr) !== 'undefined') {
            // console.log('stderr: ' + msg.stderr);
        }
    });
}
