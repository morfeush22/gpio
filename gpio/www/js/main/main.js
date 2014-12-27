$(document).ready(function() {

	function switchButton() {
		$('.tile-button').each(function() {
			var nextCycleContainer = $(this).next('.cycle-slideshow');
			$(this).on('click', function() {
				nextCycleContainer.cycle('next');
				//nextCycleContainer.cycle('goto', 1);
			});
		});
	}

	function init() {
		$('#temperature-menu-button').on('click', function() {
			$('#main-menu').toggle("slide");
			$('#temperature-menu').toggle("slide");
		});

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

		$('.temp-slider').each(function() {
			$(this).slider( {
				min: 15,
				max: 35,
				step: 1,
				orientation: "vertical"
			}).slider("pips");
		});

		$('#help').on('click', function() {
			$('#help-message').dialog( {
				modal: true,
				buttons: {
					OK: function() {
						$(this).dialog("close");
					}
				}
			});
		});

	}
	init();
	switchButton();

});
