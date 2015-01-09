var LightingMenuView = function(store) {

	this.initialize = function() {

		this.element = $("<div/>");
		this.element.on("click", ".back-main-menu-button", function() {
			window.location.href = "#";
		});

	};

	this.render = function() {

		this.element.html(LightingMenuView.template(store));
		return this;

	};

	this.initialize();

};

LightingMenuView.setState = function(store, roomName, state) {
	var state = (store.lightingMenuElements.filter(function(item) {
		return item.elementId === roomName;
	})[0].state = state);

	store.update();

	if (element = $("#"+roomName))
		element.children(".cycle-slideshow").cycle("goto", state);
};

LightingMenuView.getState = function(item) {
	var $item = $(item);
	return {
		"roomId": $item.parent().attr("id"),
		"state": $item.next(".cycle-slideshow").data("cycle.opts").currSlide ? 0:1
	};
};

LightingMenuView.updateView = function(store) {
	var elements = $("body").find(".cycle-slideshow").each(function() {
        $(this).cycle();
    });

	elements.each(function() {
	    var self = this;

	    $(this).cycle("goto", store.lightingMenuElements.filter(function(item) {
	        return item.elementId === $(self).parent().attr("id");
	    })[0].state);
	});
};

LightingMenuView.makeTile = function(roomName, state) {

	var makeCycleTileElement = function(firstImage, secondImage, buttonText, descArgs) {
	    return "<div class='tile-button'>" +
	             "<span>" + buttonText + "</span>" +
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
    		"single-row",
    	"elementContent":
    		makeCycleTileElement("images/1.jpg", "images/2.jpg", "Push me!", {
                onTitle: "ON",
                onDesc: "None",
                offTitle: "OFF",
                offDesc: "None"
    		}),
    	"state":
    		state
	};

};

LightingMenuView.template = Handlebars.compile($("#lighting-menu-tpl").html());
