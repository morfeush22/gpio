$(document).ready(function() {

	function switchButton() {
		$('.tile-button').each(function() {
			var nextCycleContainer = $(this).next('.cycle-slideshow');
			$(this).on('click', function() {
				nextCycleContainer.cycle('next');
			});
		});
	}

	function init() {
		$('#lighting-menu-button').on('click', function() {
			$('#main-menu').toggle("slide");
			$('#lighting-menu').toggle("slide");
		});

		$('#blinds-menu-button').on('click', function() {
			$('#main-menu').toggle("slide");
			$('#blinds-menu').toggle("slide");
		});

		$('.back-main-menu-button').each(function() {
			$(this).on('click', function() {
				$(this).parent().toggle("slide");
				$('#main-menu').toggle("slide");
			});
		});
	}
	init();
	switchButton();

});
