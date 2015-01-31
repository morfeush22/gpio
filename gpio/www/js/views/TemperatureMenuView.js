/**
* Reprezentuje widok menu Temperature.
* @constructor
* @param {Object} store - Obiekt magazynu.
**/
var TemperatureMenuView = function(store) {

	/**
	* Inicjalizuje widok menu Temperature.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	/**
	* Renderuje widok menu Temperature.
	* @function
	**/
	this.render = function() {
		this.element.html(TemperatureMenuView.template(store.temperatureMenuElements));
		return this;
	};

	this.initialize();
};

/**
* Ustawia stan elementu menu Temperature.
* @function
* @param {Object} store - Obiekt magazynu.
* @param {Object} roomName - ID pokoju.
* @param {Object} state - Stan.
**/
TemperatureMenuView.setState = function(store, roomName, state) {
	var state = (store.temperatureMenuElements.filter(function(item) {
		return item.elementId === roomName;
	})[0].internalState = state);

	store.update();

	if (element = $("#"+roomName))
		element.children(".temp-slider").slider("value", state);
};

/**
* Rejestruje widok menu Temperature.
* @function
* @param {Object} store - Obiekt magazynu.
* @param {Object} socket - Obiekt gniazda.
**/
TemperatureMenuView.updateView = function(store, socket) {
	var registerTemperatureEvent = function(item, value) {
		var $item = $(item);
		socket.getSocket().emit("temperatureChange", {
			"roomId": $item.parent().attr("id"),
			"state": value
		});
	};

	$("body").find(".temp-slider").each(function() {
		$(this).slider( {
			min: 15,
			max: 35,
			step: 1,
			orientation: "vertical"
		}).slider("pips").draggable();
	});	

    var temperatureInfo = $("body").find(".temperature-info");

    temperatureInfo.each(function() {
    	var self = this;

		var tempSlider = $(this).prev(".temp-slider");
		tempSlider.slider("value", store.temperatureMenuElements.filter(function(item) {
			return item.elementId === $(self).parent().attr("id");
		})[0].internalState);

		tempSlider.on("slidestop", function(event, ui) {
			registerTemperatureEvent(this, ui.value);
		});

		var windowWidth = $(window).width();
		
		$(this).css("width", parseInt(0.6*windowWidth));
		window.setTimeout($.proxy(function() {
			var height = this.offsetHeight;
			tempSlider.css("height", height);
		}, this), 0);
	});
};

/**
* Prekompiluje szablon widoku menu Temperature.
* @global
**/
TemperatureMenuView.template = Handlebars.compile($("#temperature-menu-tpl").html());
