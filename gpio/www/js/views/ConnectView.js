/**
* Reprezentuje widok menu Connect.
* @constructor
**/
var ConnectView = function() {

	/**
	* Inicjalizuje widok menu Connect.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
	};

	/**
	* Renderuje widok menu Connect.
	* @function
	**/
	this.render = function() {
		this.element.html(ConnectView.template());
		return this;
	};

	this.initialize();
};

/**
* Prekompiluje szablon widoku menu Connect.
* @global
**/
ConnectView.template = Handlebars.compile($("#connect-tpl").html());
