var BlindsMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(BlindsMenuView.template(store));
		return this;
	};

	this.initialize();
}

BlindsMenuView.template = Handlebars.compile($("#blinds-menu-tpl").html());
