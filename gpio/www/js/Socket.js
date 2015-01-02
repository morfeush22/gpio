var Socket = function(store, callback) {

	var self = this;
	var socket = null;

	this.initialize = function() {

		socket = io.connect('http://' + '192.168.1.140' + ':' + '5000' + '/gpio');
		
		socket.on('initSync', function(msg) {			

			var elements = [];
			var states = [];

			$.each(msg, function(item, value) {

				var roomName = item;
				var state = value[1].overallState;

				var element = {
					"elementId":
						roomName,
					"elementClass":
	            		"single-row",
	            	"elementContent":
	            		store.makeSwitchTile("images/1.jpg", "images/2.jpg", "Push me!", {
			                onTitle: "ON",
			                onDesc: "None",
			                offTitle: "OFF",
			                offDesc: "None"
	            		}),
	            	"state":
	            		state
				};

				elements.push(element);
				states.push({
					"roomName": item,
					"state": state
				});

			});

			store.lightingMenuElements = elements;
			callLater(callback, states);

		});
	}

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
                self.bindEvents();
            });
        }
    };

    this.bindEvents = function() {
    	socket.on('serverResponse', function(msg) {
    		var state = (store.lightingMenuElements.filter(function(item) {
    			return item.elementId === msg.roomId;
    		})[0].state = msg.state);

    		if (element = $('#'+msg.roomId))
				element.children('.cycle-slideshow').cycle('goto', state);
		});
    };

    this.registerEvents = function(item) {
    	$item = $(item);
		socket.emit("lightChange", {
			"roomId": $item .parent().attr("id"),
			"state": $item .next(".cycle-slideshow").data("cycle.opts").currSlide ? 0:1
		});
    };

	this.initialize();
}
