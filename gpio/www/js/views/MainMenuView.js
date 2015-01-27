var MainMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".first-order-menu img", function() {
			window.location.href = "#" + $(this).parent(".first-order-menu").attr("id");
		});
		this.element.on("click", "#load-options", function(event) {
			event.preventDefault();
			window.location.hash = "#options";
		});
	};

	this.render = function() {
		this.element.html(MainMenuView.template(store.mainMenuElements));
		return this;
	};

	this.initialize();
};

MainMenuView.updateView = function() {
	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

    var tileButtons = $("body").find(".tile-button");

    tileButtons.each(function() {
		var cycleSlideshow = $(this).next(".cycle-slideshow");

		var windowWidth = $(window).width();
		
		$(this).css("width", parseInt(0.2*windowWidth));
		window.setTimeout($.proxy(function() {
			var height = this.offsetHeight;
			cycleSlideshow.css({"height": height, "width": height});
		}, this), 0);
	});

	$("body").find(".first-order-menu").each(function() {
        $(this).css("width", parseInt(0.8*$(window).width()));
    });

    $("body").find(".main-menu-options").each(function() {
        $(this).css("width", parseInt(0.2*$(window).width()));
    });
};

MainMenuView.template = Handlebars.compile($("#main-menu-tpl").html());
