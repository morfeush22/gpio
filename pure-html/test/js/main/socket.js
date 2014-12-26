$(document).ready(function(){

	namespace = '/gpio';
	var socket = io.connect('http://' + '192.168.1.140' + ':' + '5000' + namespace);

	var divAttributes = function(id) {
		return {
			"class": "single-row",
			"id": id.toString()
		}
	}

	var cycleSlideshowAttributes = {
		"class": "cycle-slideshow",
		"data-cycle-fx": "fadeout",
		"data-cycle-timeout": "0",
		"data-cycle-caption-plugin": "caption2",
		"data-cycle-overlay-fx-out": "slideUp",
		"data-cycle-overlay-fx-in": "slideDown"
	};

	var imgAttributes = function(src, title, desc) {
		return {
			"src": src.toString(),
			"data-cycle-title": title.toString(),
			"data-cycle-desc": desc.toString()
		};
	};

	socket.on('initSync', function(msg) {
		$.each(msg, function(i, v) {

			var roomName = v["room-name"];
			var state = v["state"];

			var $tileButton = $("<div>", {"class": "tile-button"})
				.append("<span>Push me!</span>");

			var $imgOff = $("<img>", imgAttributes("images/1.jpg", roomName,
				"To turn ON, tap the button"));
			var $imgOn = $("<img>", imgAttributes("images/2.jpg", roomName,
				"To turn OFF, tap the button"));	

			var $cycleSlideshow = $("<div>", cycleSlideshowAttributes)
				.append('<div class="cycle-overlay"></div>')
				.append($imgOff)
				.append($imgOn);

			var $backButton = $("<div>", {"class": "single-row back-main-menu-button"})
				.append("<span>Back</span>");

			var $div = $("<div>", divAttributes(roomName))
				.append($tileButton)
				.append($cycleSlideshow);
				//.append($backButton);

			$("#lighting-menu")
				.children(".back-main-menu-button")
				.before($div);
			/*
			$backButton.on('click', function() {
				$(this).parent().toggle("slide");
				$('#main-menu').toggle("slide");
			});
			*/
			$cycleSlideshow.cycle();
			$cycleSlideshow.cycle('goto', state);
			//console.log(nextCycleContainer.data("cycle.opts").currSlide);
		});
	});

});
