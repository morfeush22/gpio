/**
* Reprezentuje widok menu Reconnect.
* @constructor
**/
var ReconnectView = function() {

	/**
	* Inicjalizuje widok menu Reconnect.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", "#load-options", function(event) {
			event.preventDefault();
			window.location.hash = "#options";
		});
		this.element.on("click", "#load-help", function(event) {
			event.preventDefault();
			window.location.hash = "#help";
		});
	};

	/**
	* Renderuje widok menu Reconnect.
	* @function
	**/
	this.render = function() {
		this.element.html(ReconnectView.template());
		return this;
	};

	this.initialize();
};

/**
* Prekompiluje szablon widoku menu Reconnect.
* @property {object} template - Prekompilowany szablon.
**/
ReconnectView.template = Handlebars.compile($("#reconnect-tpl").html());
