var Socket = function(store, callback) {

	this.initialize = function() {
		var self = this;
		socket = io.connect("http://" + localStorage.getItem("ip") + ":" + "5000" + "/gpio");

		socket.on("initSync", function(msg) {
			var elements = [];

			$.each(msg, function(item, value) {
				var roomName = item;
				var state = value[1].overallState;

				var element = LightingMenuView.makeTile(roomName, state);
				elements.push(element);

			});

			store.lightingMenuElements = elements;
			store.update();
			callLater(callback);
		});

		socket.on("sync", function(msg) {
			$.each(msg, function(item, value) {
				var roomName = item;
				var state = value[1].overallState;

				LightingMenuView.setState(store, roomName, state);
			});
		});

		socket.on('disconnect', function() {
			//redirect
			window.location.hash = "#reconnect";
			$("#reconnect").html("Server stopped responding, trying to restore connection!");
		});

		socket.on('connect', function() {
			console.log("connect");
			window.location.hash = "#";
			self.syncReq();
		});

		socket.on('error', function() {
			console.log('error');
			//give user ip of server
			$("#connect").html("Server not responding!");
		});
	}

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
                bindEvents();
            });
        }
    };

    var bindEvents = function() {
    	socket.on('serverResponse', function(msg) {
    		var roomName = msg.roomId;
			var state = msg.state;

    		LightingMenuView.setState(store, roomName, state);
		});
    };

    this.registerEvents = function(item) {
		socket.emit("lightChange", LightingMenuView.getState(item));
    };

    this.syncReq = function() {
    	socket.emit("syncReq");
    };

    var socket = null;
	this.initialize();
}
