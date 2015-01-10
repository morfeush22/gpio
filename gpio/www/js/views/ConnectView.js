var ConnectView = function() {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", "#to-options", function(event) {
			event.preventDefault();
			window.location.href = "#options";
		});
	};

	this.render = function() {
		this.element.html(ConnectView.template());
		return this;
	};

	this.initialize();
}

ConnectView.template = Handlebars.compile($("#connect-tpl").html());
