var gpio = require('rpi-gpio');
var io = require('socket.io')(80);

var STATES = {
	'light': {
		'light-room-1': 0,
		'light-room-2': 0,
		'light-room-3': 0
	},
	'temperature': {
		'temp-room-1': 15,
		'temp-room-2': 20,
		'temp-room-3': 5
	}
};

var PINS = {
	'light-room-1': 11,
	'light-room-2': 13,
	'light-room-3': 15
};

for (var key in PINS) {
	if (PINS.hasOwnProperty(key)) {
		var pin = PINS[key];
		gpio.setup(pin, gpio.DIR_OUT, function() {
			gpio.write(this.pin, 0, function(err) {
				if (err) throw err;
			});
		}.bind({pin: pin}));
	}
}

var ws = io.of('/gpio')
	.on('connection', function(socket) {
		var sync = function() {
			socket.emit('sync', {
				STATES
			});			
		}
		
		sync();
		
		socket.on('syncReq', function(data) {
			sync();
		});
		
		socket.on('lightChange', function(data) {
			var room = data['room'];
			var state = data['state'];
			var pin = PINS[room];
			
			gpio.write(pin, state, function(err) {
				if (err) throw err;
			});
			
			STATES['light'][room] = state;
			
			socket.broadcast.emit('sync', {
				STATES
			});
		});
		
		socket.on('temperatureChange', function(data) {
			var room = data['room'];
			var state = data['state'];
			
			STATES['temperature'][room] = state;
			
			socket.broadcast.emit('sync', {
				STATES
			});
		});
	});
	
process.on('SIGINT', function() {
	gpio.destroy();
	process.exit();
});
