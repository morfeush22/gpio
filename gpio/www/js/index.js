/**
* Kontroler aplikacji.
* @global
**/
var app = {
    /**
    * Tworzy okno startowe z polem na adres IP serwera.
    * @function
    **/
    startupDialog: function() {
        if (localStorage.getItem("ip")) {
            app.onReady();
        } else {
        $("body").html(new StartupDialogView(function() {  
                app.onReady();
            }).render().element);
        }      
    },

    /**
    * Inicjalizuje magazyn i gniazdo. Wiąże eventy "resume" i "orientationchange".
    * @function
    **/
    setup: function() {
        this.store = new Store();
        this.socket = new Socket(this.store);
        //be carefull with this "this"
        $(window).on("resume", this.socket.syncReq());
        $(window).on("orientationchange", function() {
            window.setTimeout(function() {
                app.registerEvents(window.location.hash);
            }, 0);        
        });
    },

    /**
    * Inicjalizuje kontroler.
    * @function
    **/
    initialize: function() {
        $(document).ready(function() {
            app.bindEvents();
        });          
    },

    /**
    * Wiąże eventy "hashchange" - odpowiada za przełączanie menu, "deviceready" - odpowiada za poprawne zainicjalizowanie PhoneGap.
    * @function
    **/
    bindEvents: function() {
        document.addEventListener("deviceready", this.startupDialog, false);
        //so to emulate this one:
        //this.startupDialog();
        $(window).on("hashchange", $.proxy(this.route, this));
    },

    /**
    * Po połączeniu z serwerem, uruchamia kontroler.
    * @function
    **/
    onReady: function() {
        window.location.hash = "#connect";
        app.receivedEvent('ready');
        window.setTimeout($.proxy(this.setup, this), 1000);
    },

    /**
    * Funkcja debugera.
    * @function
    * @param {number} id - ID przechwyconego eventu.
    **/
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    /**
    * Rejestruje widok.
    * @function
    * @param {string} hash - Hash przypisany do konkretnego menu.
    **/
    registerEvents: function(hash) {
        if (typeof app.socket !== "undefined") {
            if (!app.socket.getSocket().socket.reconnecting) {
                switch(hash) {
                    case "#temperature-menu":
                        TemperatureMenuView.updateView(app.store, app.socket);
                        break;
                    case "#lighting-menu":
                        LightingMenuView.updateView(app.store, app.socket);
                        break;
                    case "#blinds-menu":
                        BlindsMenuView.updateView();
                        break;
                    case "#options":
                        break;
                    case "#help":
                        HelpView.updateView();
                        break;
                    case "#error":
                        break;
                    default:
                        MainMenuView.updateView();
                }
            } else {
                switch(hash) {
                    case "#options":
                        break;
                    case "#help":
                        HelpView.updateView();
                        break;
                    default:
                        break;
                }
            }
        } else {
            switch(hash) {
                default:
            }
        }
    },

    /**
    * Aktualizuje widok w zależności od hasha.
    * @function
    **/
    route: function() {
        var hash = window.location.hash;
        if (typeof app.socket !== "undefined") {
            if (!app.socket.getSocket().socket.reconnecting) {
                switch(hash) {
                    case "#temperature-menu":
                        $("body").html(new TemperatureMenuView(this.store).render().element);
                        break;
                    case "#lighting-menu":
                        $("body").html(new LightingMenuView(this.store).render().element);
                        break;
                    case "#blinds-menu":
                        $("body").html(new BlindsMenuView(this.store).render().element);
                        break;
                    case "#options":
                        $("body").html(new OptionsView().render().element);
                        break;
                    case "#help":
                        $("body").html(new HelpView(this.store).render().element);
                        break;
                    case "#error":
                        $("body").html(new ErrorView().render().element);
                        break;
                    default:
                        $("body").html(new MainMenuView(this.store).render().element);
                }
            } else {
                switch(hash) {
                    case "#options":
                        $("body").html(new OptionsView().render().element);
                        break;
                    case "#help":
                        $("body").html(new HelpView(this.store).render().element);
                        break;
                    default:
                        $("body").html(new ReconnectView().render().element);
                }
            }
        } else {
            switch(hash) {
                default:
                    $("body").html(new ConnectView().render().element);
            }
        }

        this.registerEvents(hash);
    }
};
