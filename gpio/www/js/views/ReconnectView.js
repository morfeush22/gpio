var ReconnectView = function() {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", "#load-options", function(event) {
			event.preventDefault();
			window.location.hash = "#options";
		});
	};

	this.render = function() {
		this.element.html(ReconnectView.template());
		return this;
	};

	this.initialize();
}

ReconnectView.template = Handlebars.compile($("#reconnect-tpl").html());
