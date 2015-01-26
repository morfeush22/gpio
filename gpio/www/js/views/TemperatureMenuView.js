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

TemperatureMenuView.updateView = function() {
    var temperatureInfo = $("body").find(".temperature-info");

    temperatureInfo.each(function() {
		var tempSlider = $(this).prev(".temp-slider");
		
		$(this).css("width", parseInt(0.6*$(window).width()));
		var height = $(this).height();
		tempSlider.css("height", height);
	});
};

TemperatureMenuView.template = Handlebars.compile($("#temperature-menu-tpl").html());
