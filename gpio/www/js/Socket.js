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

		socket.on("sync", function(msg) {
			$.each(msg, function(type, content) {
				$.each(content, function(item, value) {
					var room = item;
					var state = value;

					switch(type) {
						case "light":
							LightingMenuView.setState(store, room, state);
							break;
						case "temperature":
							TemperatureMenuView.setState(store, room, state);
							break;
					}
				});
			});
		});

		socket.on('disconnect', function() {
			connected = false;
			if (window.location.hash === "#options" || window.location.hash === "#help") {
			} else {
				window.location.hash = "#reconnect";
			}
		});

		socket.on('connect', function() {
			connected = true;
			if (window.location.hash === "#options" || window.location.hash === "#help") {
			} else {
				window.location.hash = "#main-menu"
			}
		});

		socket.on('error', function() {
			window.location.hash = "#error";
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

    /**
    * Zwraca stan gniazda.
    * @function
    * @returns {Boolean} - Stan gniazda.
    **/
    this.getState = function() {
    	return connected;
    }

	var connected = false;
    var socket = null;
    var store = store;
    
	this.initialize();
};
