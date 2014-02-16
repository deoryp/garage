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

app.get('/toggle', function(req, res){
  var body =
    '<html><body>' +
    '<FORM action="/toggle" method="post">' +
    '<INPUT type="submit" value="Toggle">' +
    '</FORM>' +
    '<body></html>';

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
});

app.post('/toggle', function(req, res) {
  toggle();
  res.end();
});

app.listen(3000);
console.log('Listening on port 3000');



