var StartupDialogView = function(callback) {

	var tips = $(".validateTips");
	var ip = $("#ip");

	var dialog = $("#startup-dialog").dialog({
		autoOpen: true,
		modal: true,
		width: 'auto',
		buttons: {
			"Save": saveIp
		},
		close: function() {
			console.log("no close!");
		}
	});

	var form = dialog.find("form").on("submit", function(event) {
		event.preventDefault();
		saveIp();
	});

	function saveIp() {
		var valid = true;
		ip.removeClass("ui-state-error");
		valid = valid && checkRegexp(ip, /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-9]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/, "Wrong IP address");
		if (valid) {
			//save ip and go on
			callLater(callback);
		}
		return valid;
	};

	function checkRegexp(object, regexp, text) {
		if (!(regexp.test(object.val()))) {
			object.addClass("ui-state-error");
			updateTips(text);
			return false;
		} else {
			return true;
		}
	};

	function updateTips(tip) {
		tips.text(tip).addClass("ui-state-highlight");
		setTimeout(function() {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	};

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    };
}