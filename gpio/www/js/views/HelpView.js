var HelpView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-button", function() {
			window.location.hash = "#";
		});
	};

	this.render = function() {
		this.element.html(HelpView.template(store));
		return this;
	};

	this.initialize();
};

HelpView.updateView = function(store) {
	var windowWidth = $(window).width();

    $("body").find(".help-menu").each(function() {
        $(this).css("width", parseInt(0.8*windowWidth));
    });
};

HelpView.template = Handlebars.compile($("#help-tpl").html());
