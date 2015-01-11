var Socket = function(store) {

	this.initialize = function() {
		var self = this;
		socket = io.connect("http://" + localStorage.getItem("ip") + ":5000/gpio");

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
			bindEvents();
		});

		socket.on("sync", function(msg) {
			$.each(msg, function(item, value) {
				var roomName = item;
				var state = value[1].overallState;

				LightingMenuView.setState(store, roomName, state);
			});
		});

		socket.on('disconnect', function() {
			if (window.location.hash === "#options" || window.location.hash === "#help") {
			} else {
				window.location.hash = "#reconnect";
			}
		});

		socket.on('connect', function() {
			if (window.location.hash === "#options" || window.location.hash === "#help") {
			} else {
				window.location.hash = "#";
			}
			self.syncReq();
		});

		socket.on('error', function() {
			window.location.hash = "#error";
		});
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

    this.getSocket = function() {
    	return socket;
    };

    var socket = null;
	this.initialize();
};
