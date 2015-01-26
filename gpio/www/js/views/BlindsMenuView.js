var BlindsMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(BlindsMenuView.template(store));
		return this;
	};

	this.initialize();
};

BlindsMenuView.updateView = function(store) {
	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

    var tileButtons = $("body").find(".tile-button");

    tileButtons.each(function() {
		var cycleSlideshow = $(this).next(".cycle-slideshow");
		
		$(this).css("width", parseInt(0.6*$(window).width()));
		var height = $(this).height();
		cycleSlideshow.css("height", height);
	});
};

BlindsMenuView.template = Handlebars.compile($("#blinds-menu-tpl").html());
