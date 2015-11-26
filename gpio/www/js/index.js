/**
* Kontroler aplikacji.
* @namespace
**/
var app = {
    /**
    * Inicjalizuje kontroler.
    * @function
    **/
    initialize: function() {
        var self = this;
        var setup = function() {
            self.store = new Store();
            self.socket = new Socket(self.store);
            $(window).on("hashchange", self.render.bind(self));
            $(window).on("orientationchange", self.render.bind(self));
            $(window).on("resume", self.socket.syncReq.bind(self.socket));
            window.location.hash = "#main-menu";
        }

        if (!localStorage.getItem("ip")) {
            $("body").html(new StartupDialogView(setup).render().element);
        }
        else {
            setup();
        }
    },


    /**
    * Aktualizuje widok w zależności od hasha.
    * @function
    **/
    render: function() {
        var hash = window.location.hash;

        if (!this.socket.getState()) {
            switch(hash) {
                case "#help":
                    $("body").html(new HelpView(this.store).render().element);
                    HelpView.updateView();
                    break;
                case "#options":
                    $("body").html(new OptionsView().render().element);
                    break;
                case "#reconnect":
                default:
                    $("body").html(new ReconnectView().render().element);
                    break;
            }

        } else {        
            switch(hash) {
                case "#temperature-menu":
                    $("body").html(new TemperatureMenuView(this.store).render().element);
                    TemperatureMenuView.updateView(this.store, this.socket);
                    break;
                case "#lighting-menu":
                    $("body").html(new LightingMenuView(this.store).render().element);
                    LightingMenuView.updateView(this.store, this.socket);
                    break;
                case "#blinds-menu":
                    $("body").html(new BlindsMenuView(this.store).render().element);
                    BlindsMenuView.updateView();
                    break;
                case "#help":
                    $("body").html(new HelpView(this.store).render().element);
                    HelpView.updateView();
                    break;
                case "#options":
                    $("body").html(new OptionsView().render().element);
                    break;
                case "#reconnect":
                    $("body").html(new ReconnectView().render().element);
                    break;
                case "#error":
                    $("body").html(new ErrorView().render().element);
                    break;
                case "#main-menu":
                default:
                    $("body").html(new MainMenuView(this.store).render().element);
                    MainMenuView.updateView(this.store);
                    break;
            }
        }
    }
};
