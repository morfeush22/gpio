var ConnectView = function() {

	this.initialize = function() {
		this.element = $("<div/>");
	};

	this.render = function() {
		this.element.html(ConnectView.template());
		return this;
	};

	this.initialize();
};

ConnectView.template = Handlebars.compile($("#connect-tpl").html());
