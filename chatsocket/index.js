module.exports = function (http, connection) {
  // Initialize Socket.io
  var io = require('socket.io')(http).listen(3333);

  // Initialize MySQL Connection
  connection.connect();

  // On Connect
  io.on('connection', function(socket) {
    // console.log('### A user connected');

    // On recieve message
    // Example
    var ex = {
      'nickname': 'Hyeonsu',
      'message': 'ㅓ어아!! 난 현수얌'
    }
    socket.on('send message', function(msg) {
      var timestamp = Math.floor(new Date().getTime() / 1000);

      // Logging
      // console.log('# Message: ' + msg);
      connection.query({
        'sql': 'INSERT INTO `chat` (`nickname`, `message`, `created_time`) VALUES (?, ?, FROM_UNIXTIME(?))',
        'values': [ msg['nickname'], msg['message'], timestamp ],
        'timeout': 10000
      }, function (error, rows, fields) {
        if (error) console.log(error);
      });

      // Set nickname color
      var hash = 0;
      for (var i = 0; i < msg['nickname'].length; i++) {
        hash = msg['nickname'].charCodeAt(i) + ((hash << 5) - hash);
      }
      var r = (((hash)           & 0xAF) + 0x10).toString(16).toUpperCase();
      var g = (((hash * 19)      & 0xAF) + 0x10).toString(16).toUpperCase();
      var b = (((hash * 19 * 19) & 0xAF) + 0x10).toString(16).toUpperCase();
      var color = '#' + r + g + b;
      msg['color'] = color;

      // Add timestamp
      msg['timestamp'] = timestamp;

      // BR
      io.emit('recieve message', msg);
    });
  });

  return io;
};
