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
      // Logging
      // console.log('# Message: ' + msg);
      connection.query({
        'query': 'INSERT INTO `chat` (`nickname`, `message`) VALUES (?, ?)',
        'values': [ msg['nickname'], msg['message'] ],
        'timeout': 10000
      }, function (error, results, fields) {
      });

      // BR
      io.emit('recieve message', msg);
    });
  });

  return io;
};
