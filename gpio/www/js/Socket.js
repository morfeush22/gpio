var Socket = function(store, callback) {

	var self = this;
	var socket = null;

	this.initialize = function() {

		socket = io.connect("http://" + "192.168.1.140" + ":" + "5000" + "/gpio");

		socket.on("initSync", function(msg) {			
			var elements = [];

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

			});
			store.lightingMenuElements = elements;
			callLater(callback);

		});

		socket.on("sync", function(msg) {
			$.each(msg, function(item, value) {
				var roomName = item;
				var state = value[1].overallState;

				var state = (store.lightingMenuElements.filter(function(item) {
	    			return item.elementId === roomName;
	    		})[0].state = state);

	    		if (element = $('#'+roomName))
					element.children('.cycle-slideshow').cycle('goto', state);
			});
		});

		socket.on('disconnect', function() {
			$("#dialog").dialog({
	            title: "Ups"
	        });
		});

		socket.on('connect', function() {
			console.log("connect");
		});

		socket.on('error', function() {
			console.log('error');
		});
	}

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
                self.bindEvents();
                self.syncReq();
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

    this.syncReq = function() {
    	socket.emit("syncReq");
    };

	this.initialize();
}
