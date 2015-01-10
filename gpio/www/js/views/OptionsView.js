var OptionsView = function(socket, callback) {

	this.initialize = function() {
		var self = this;
		this.element = $("<div/>");
		this.element.on("click", ".back-button", function() {
			window.history.back();
		});
		this.element.on("submit", "form", function(event) {
			event.preventDefault();
			self.updateView();
		});
	};

	this.render = function() {
		this.element.html(OptionsView.template());
		this.element.find("#ip").val(localStorage.getItem("ip"));
		return this;
	};

	this.initialize();

	this.updateView = function() {
		var tips = this.element.find(".validate-tips");
		var ip = this.element.find("#ip");

		var checkRegexp = function(object, regexp, text) {
			if (!(regexp.test(object.val()))) {
				object.addClass("ui-state-error");
				updateTips(text);
				return false;
			} else {
				return true;
			}
		};

		var updateTips = function(tip) {
			tips.text(tip).addClass("ui-state-highlight");
			setTimeout(function() {
				tips.removeClass("ui-state-highlight", 1500);
			}, 500);
		};

		var valid = true;
		ip.removeClass("ui-state-error");
		valid = valid && checkRegexp(ip, /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-9]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/, "Wrong IP address");
		if (valid) {
			//dc, new ip and reconnect
			//socket.disconnect();
			console.log(socket.socket);
			localStorage.removeItem("ip");
			localStorage.setItem("ip", ip.val());
			//localStorage.getItem("ip");
			callLater(callback);
		}
	};

	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    };
}

OptionsView.template = Handlebars.compile($("#options-menu-tpl").html());