/**
* Reprezentuje widok menu Light.
* @constructor
* @param {Object} store - Obiekt magazynu.
**/
var LightingMenuView = function(store) {
	
	this.initialize = function() {
		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});
	};

	this.render = function() {
		this.element.html(LightingMenuView.template(store.lightingMenuElements));
		return this;
	};

	this.initialize();
};

/**
* Ustawia stan elementu menu Light.
* @function
* @param {Object} store - Obiekt magazynu.
* @param {Object} roomName - ID pokoju.
* @param {Object} state - Stan.
**/
LightingMenuView.setState = function(store, roomName, state) {
	var state = (store.lightingMenuElements.filter(function(item) {
		return item.elementId === roomName;
	})[0].state = state);

	if (element = $("#"+roomName))
		element.children(".cycle-slideshow").cycle("goto", state);
};

/**
* Rejestruje widok menu Light.
* @function
* @param {Object} store - Obiekt magazynu.
* @param {Object} socket - Obiekt gniazda.
**/
LightingMenuView.updateView = function(store, socket) {
	var registerLightEvents = function(item) {
		var $item = $(item);		
		socket.getSocket().emit("lightChange", {
			"room": $item.parent().attr("id"),
			"state": $item.next(".cycle-slideshow").data("cycle.opts").currSlide ? 0 : 1
		});
	};

	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

	elements.each(function() {
	    var self = this;

	    $(this).cycle("goto", store.lightingMenuElements.filter(function(item) {
	        return item.elementId === $(self).parent().attr("id");
	    })[0].state);
	});

	var tileButtons = $("body").find(".tile-button").each(function() {
	    $(this).on("click", function() {
	        registerLightEvents(this);
	    });
	});

    var windowWidth = $(window).width();

	tileButtons.each(function() {
		var cycleSlideshow = $(this).next(".cycle-slideshow");

		window.setTimeout(function() {
			$(this).css("width", parseInt(0.6*windowWidth));
			var height = this.offsetHeight;
			cycleSlideshow.css({"height": height, "width": height});
		}.bind(this), 10);
	});
};

/**
* Tworzy element będący częścią menu Light.
* @function
* @param {Object} roomName - ID pokoju.
* @param {Object} state - Stan.
**/
LightingMenuView.makeTile = function(roomName, state) {
	var makeCycleTileElement = function(firstImage, secondImage, buttonImage, descArgs) {
	    return "<div class='tile-button'>" +
	             "<img src=" + buttonImage + ">" +
	         "</div>" +
	         "<div class='cycle-slideshow'\
	             data-cycle-fx=fadeout\
	             data-cycle-timeout=0\
	             data-cycle-caption-plugin=caption2\
	             data-cycle-overlay-fx-out='slideUp'\
	             data-cycle-overlay-fx-in='slideDown'\
	             >\
	             <div class='cycle-overlay'></div>" +
	             "<img src=" + firstImage + " data-cycle-title=" + descArgs.offTitle + " data-cycle-desc=" + descArgs.offDesc + ">" +
	             "<img src=" + secondImage  + " data-cycle-title=" + descArgs.onTitle + " data-cycle-desc=" + descArgs.onDesc + ">" +
	         "</div>";
	};

	return element = {
		"elementId":
			roomName,
		"elementClass":
    		"single-row light-menu",
    	"elementContent":
    		makeCycleTileElement("images/light_off.png", "images/light_on.png", "images/" + roomName + ".png", {
                onTitle: "\"\"",
                onDesc: "\"\"",
                offTitle: "\"\"",
                offDesc: "\"\""
    		}),
    	"state":
    		state
	};
};

/**
* Prekompiluje szablon widoku menu Light.
* @property {object} template - Prekompilowany szablon.
**/
LightingMenuView.template = Handlebars.compile($("#lighting-menu-tpl").html());
