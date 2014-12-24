$(document).ready(function(){

	namespace = '/gpio';
	var socket = io.connect('http://' + '192.168.1.140' + ':' + '5000' + namespace);

	socket.on('initSync', function(msg) {
		$.each(msg, function(i, v) {
			var elem = "#"+v["room-name"];
			var state = v["state"];
			//console.log(elem+": "+state);

			var nextCycleContainer = $(elem).children('.cycle-slideshow');
			nextCycleContainer.cycle('goto', state);
			//console.log(nextCycleContainer.data("cycle.opts").currSlide);
		});
	});

});
