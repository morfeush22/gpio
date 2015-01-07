var MainMenuView = function(store) {

	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".first-order-menu img", function() {
			window.location.href = "#" + $(this).parent(".first-order-menu").attr("id");
		})
	};

	this.render = function() {
		this.element.html(MainMenuView.template(store));
		return this;
	};

	this.initialize();

}

MainMenuView.template = Handlebars.compile($("#main-menu-tpl").html());