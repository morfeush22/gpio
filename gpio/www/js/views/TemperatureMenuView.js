var TemperatureMenuView = function(store) {

	this.registerEvents = function() {
		this.element.find(".temp-slider").each(function() {
			$(this).slider( {
				min: 15,
				max: 35,
				step: 1,
				orientation: "vertical"
			}).slider("pips");
		});
	};

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(TemperatureMenuView.template(store));
		this.registerEvents();
		return this;
	};

	this.initialize();
};

TemperatureMenuView.template = Handlebars.compile($("#temperature-menu-tpl").html());
