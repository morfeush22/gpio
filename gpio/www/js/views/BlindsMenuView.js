/**
* Reprezentuje widok menu Blinds.
* @constructor
* @param {Object} store - Obiekt magazynu.
**/
var BlindsMenuView = function(store) {

	/**
	* Inicjalizuje widok menu Blinds.
	* @function
	**/
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	/**
	* Renderuje widok menu Blinds.
	* @function
	**/
	this.render = function() {
		this.element.html(BlindsMenuView.template(store.blindsMenuElements));
		return this;
	};

	this.initialize();
};


/**
* Rejestruje widok menu Blinds.
* @function
**/
BlindsMenuView.updateView = function() {
	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

    var tileButtons = $("body").find(".tile-button");

    tileButtons.each(function() {
		var cycleSlideshow = $(this).next(".cycle-slideshow");

		var windowWidth = $(window).width();
		
		window.setTimeout(function() {
			$(this).css("width", parseInt(0.6*windowWidth));
			var height = this.offsetHeight;
			cycleSlideshow.css({"height": height, "width": height});
		}.bind(this), 1);
	});
};

/**
* Prekompiluje szablon widoku menu Blinds.
* @property {object} template - Prekompilowany szablon.
**/
BlindsMenuView.template = Handlebars.compile($("#blinds-menu-tpl").html());
