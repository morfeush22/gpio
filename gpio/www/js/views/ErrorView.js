var ErrorView = function() {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", "#reload-app", function(event) {
			event.preventDefault();
			localStorage.removeItem("ip");
			window.location = "index.html";
		});
	};

	this.render = function() {
		this.element.html(ErrorView.template());
		return this;
	};

	this.initialize();
};

ErrorView.template = Handlebars.compile($("#error-tpl").html());