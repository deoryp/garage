
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-A60048PS", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('' + data);
  });
});


var express = require('express');
var app = express();

var toggle = function() {
  serialPort.write("toggle\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
}

app.post('/toggle', function(req, res) {
  console.log('toggling');
  toggle();
  res.redirect('/progress.html'); 
  res.end();
});

app.use(express.static('www'));

app.get('/', function(req, res) {
  res.redirect('/index.html'); 
  res.end();
});

app.listen(3000);
console.log('Listening on port 3000');

