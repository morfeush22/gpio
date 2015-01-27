var BlindsMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(BlindsMenuView.template(store.blindsMenuElements));
		return this;
	};

	this.initialize();
};

BlindsMenuView.updateView = function() {
	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

    var tileButtons = $("body").find(".tile-button");

    tileButtons.each(function() {
		var cycleSlideshow = $(this).next(".cycle-slideshow");

		var windowWidth = $(window).width();
		
		$(this).css("width", parseInt(0.6*windowWidth));
		window.setTimeout($.proxy(function() {
			var height = this.offsetHeight;
			cycleSlideshow.css("height", height);
		}, this), 0);
	});
};

BlindsMenuView.template = Handlebars.compile($("#blinds-menu-tpl").html());
