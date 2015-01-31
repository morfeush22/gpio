/**
* Reprezentuje widok menu Error.
* @constructor
**/
var ErrorView = function() {

	/**
	* Inicjalizuje widok menu Error.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", "#reload-app", function(event) {
			event.preventDefault();
			localStorage.removeItem("ip");
			window.location = "index.html";
		});
	};

	/**
	* Renderuje widok menu Error.
	* @function
	**/
	this.render = function() {
		this.element.html(ErrorView.template());
		return this;
	};

	this.initialize();
};

/**
* Prekompiluje szablon widoku menu Error.
* @global
**/
ErrorView.template = Handlebars.compile($("#error-tpl").html());
