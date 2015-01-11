var HelpView = function() {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-button", function() {
			window.history.back();
		});
	};

	this.render = function() {
		this.element.html(HelpView.template());
		return this;
	};

	this.initialize();
};

HelpView.template = Handlebars.compile($("#help-tpl").html());
