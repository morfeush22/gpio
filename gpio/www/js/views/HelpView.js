var HelpView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-button", function() {
			window.location.hash = "#";
		});
	};

	this.render = function() {
		this.element.html(HelpView.template(store));
		return this;
	};

	this.initialize();
};

HelpView.template = Handlebars.compile($("#help-tpl").html());
