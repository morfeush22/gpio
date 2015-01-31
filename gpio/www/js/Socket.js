/**
* Reprezentuje gniazdo. Używany do komunikacji z serwerem.
* @constructor
* @param {Object} store - Obiekt klasy Store.
**/
var Socket = function(store) {

    /**
    * Inicjalizuje gniazdo.
    * @function
    **/
	this.initialize = function() {
		var self = this;
		socket = io.connect("http://" + localStorage.getItem("ip") + ":5000/gpio");

		socket.on("initSync", function(msg) {
			var elements = [];

			$.each(msg, function(type, content) {
				$.each(content, function(item, value) {
					var roomName = item;
					var state = value[1].overallState;

					switch(type) {
						case "light":
							var element = LightingMenuView.makeTile(roomName, state);
							elements.push(element);
							break;
					}
				});
			});

			store.lightingMenuElements = elements;
			store.update();
			bindEvents();
		});

		socket.on("sync", function(msg) {
			$.each(msg, function(type, content) {
				$.each(content, function(item, value) {
					var roomName = item;
					var state = value[1].overallState;

					switch(type) {
						case "light":
							LightingMenuView.setState(store, roomName, state);
							break;
						case "temperature":
							TemperatureMenuView.setState(store, roomName, state);
							break;
					}			
				});
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
				window.location.hash = "#reconnected";
			}
			self.syncReq();
		});

		socket.on('error', function() {
			window.location.hash = "#error";
		});
	};

    /**
    * Obsługuje odpowiedzi broadcastowe serwera.
    * @function
    **/
    var bindEvents = function() {
    	socket.on('serverResponse', function(msg) {
    		var roomName = msg.roomId;
			var state = msg.state;

			switch(msg["type"]) {
				case "light":
					LightingMenuView.setState(store, roomName, state);
					break;
				case "temperature":
					TemperatureMenuView.setState(store, roomName, state);
					break;
			}		
		});
    };

    /**
    * Wymusza przeprowadzenie synchronizacji z serwerem.
    * @function
    **/
    this.syncReq = function() {
    	socket.emit("syncReq");
    };

    /**
    * Zwraca obiekt gniazda.
    * @function
    * @returns {Object} - Obiekt gniazda.
    **/
    this.getSocket = function() {
    	return socket;
    };

    var socket = null;
	this.initialize();
};
