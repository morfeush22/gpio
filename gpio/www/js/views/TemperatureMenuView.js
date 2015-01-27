var TemperatureMenuView = function(store) {

	this.registerEvents = function() {
		this.element.find(".temp-slider").each(function() {
			$(this).slider( {
				min: 15,
				max: 35,
				step: 1,
				change: function(event, ui) {
					var self = this;
					var state = (store.temperatureMenuElements.filter(function(item) {
						return item.elementId === $(self).parent().attr("id");
					})[0].internalState = ui.value);

					store.update();
				},
				orientation: "vertical"
			}).slider("pips").draggable();
		});
	};

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(TemperatureMenuView.template(store.temperatureMenuElements));
		this.registerEvents();
		return this;
	};

	this.initialize();
};

TemperatureMenuView.updateView = function(store) {
    var temperatureInfo = $("body").find(".temperature-info");

    temperatureInfo.each(function() {
    	var self = this;
		var tempSlider = $(this).prev(".temp-slider");
		tempSlider.slider("value", store.temperatureMenuElements.filter(function(item) {
			return item.elementId === $(self).parent().attr("id");
		})[0].internalState);

		var windowWidth = $(window).width();
		
		$(this).css("width", parseInt(0.6*windowWidth));
		window.setTimeout($.proxy(function() {
			var height = this.offsetHeight;
			tempSlider.css("height", height);
		}, this), 0);
	});
};

TemperatureMenuView.template = Handlebars.compile($("#temperature-menu-tpl").html());
