/**
* Reprezentuje widok menu głównego.
* @constructor
* @param {Object} store - Obiekt magazynu.
**/
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

/**
* Rejestruje widok menu głównego.
* @function
**/
MainMenuView.updateView = function(store) {
	if (element = $("#alarm-switch").children(".cycle-slideshow")) {
		var state = (store.mainMenuElements.filter(function(item) {
			return item.elementId === "alarm-switch";
		})[0].state);
		element.cycle();

		state ? element.cycle("resume") : element.cycle("pause");
	}

	$("body").find(".first-order-menu").each(function() {
        $(this).css("width", parseInt(0.8*$(window).width()));
    });

    $("body").find(".main-menu-options").each(function() {
        $(this).css("width", parseInt(0.2*$(window).width()));
    });
};

/**
* Ustawia stan elementu Alarm.
* @function
* @param {Object} store - Obiekt magazynu.
* @param {Object} state - Stan.
**/
MainMenuView.setAlarmState = function(store, state) {
	var state = (store.mainMenuElements.filter(function(item) {
		return item.elementId === "alarm-switch";
	})[0].state = state);

	if (element = $("#alarm-switch")) {
		var cycleSlideshow = element.children(".cycle-slideshow");
		state ? cycleSlideshow.cycle("resume") : cycleSlideshow.cycle("pause");
	}
};

/**
* Prekompiluje szablon widoku menu głównego.
* @property {object} template - Prekompilowany szablon.
**/
MainMenuView.template = Handlebars.compile($("#main-menu-tpl").html());
