/**
* Reprezentuje widok menu Help.
* @constructor
* @param {Object} store - Obiekt magazynu.
**/
var HelpView = function(store) {

	/**
	* Inicjalizuje widok menu Help.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-button", function() {
			window.location.hash = "#";
		});
	};

	/**
	* Renderuje widok menu Help.
	* @function
	**/
	this.render = function() {
		this.element.html(HelpView.template(store.helpMenuElements));
		return this;
	};

	this.initialize();
};

/**
* Rejestruje widok menu Help.
* @function
**/
HelpView.updateView = function() {
	var windowWidth = $(window).width();

    $("body").find(".help-menu").each(function() {
        $(this).css("width", parseInt(0.8*windowWidth));
    });
};

/**
* Prekompiluje szablon widoku menu Help.
* @property {object} template - Prekompilowany szablon.
**/
HelpView.template = Handlebars.compile($("#help-tpl").html());
