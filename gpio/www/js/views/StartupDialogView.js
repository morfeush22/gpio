/**
* Reprezentuje widok menu startowego.
* @constructor
* @param {Object} callback - Funkcja wywoływana po podaniu poprawnego adresu IP serwera.
**/
var StartupDialogView = function(callback) {

	/**
	* Inicjalizuje widok menu startowego.
	* @function
	**/
	this.initialize = function() {
		var self = this;
		this.element = $("<div/>");
		this.element.on("submit", "form", function(event) {
			event.preventDefault();
			self.updateView();
			this.reset();
		});
	};

	/**
	* Renderuje widok menu startowego.
	* @function
	**/
	this.render = function() {
		this.element.html(StartupDialogView.template());
		return this;
	};

	this.initialize();

	/**
	* Rejestruje widok menu startowego.
	* @function
	**/
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
			localStorage.setItem("ip", ip.val());
			callLater(callback);
		}
	};

	/**
	* Wywołuje funkcję callback.
	* @function
	* @param {Object} callback - Funkcja wywoływana po podaniu poprawnego adresu IP serwera.
	* @param {Object} data - Dodatkowe parametry funkcji callback.
	**/
	var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    };
};

/**
* Prekompiluje szablon widoku menu startowego.
* @property {object} template - Prekompilowany szablon.
**/
StartupDialogView.template = Handlebars.compile($("#startup-dialog-tpl").html());
