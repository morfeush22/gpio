var LightingMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(LightingMenuView.template(store));
		return this;
	};

	this.initialize();
}

LightingMenuView.template = Handlebars.compile($("#lighting-menu-tpl").html());
