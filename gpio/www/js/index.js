var app = {
    startupDialog: function() {
        if (localStorage.getItem("ip")) {
            app.onReady();
        } else {
        $("body").html(new StartupDialogView(function() {  
                app.onReady();
            }).render().element);
        }      
    },

    setup: function() {
        this.store = new Store();
        this.socket = new Socket(this.store);
        //be carefull with this "this"
        document.addEventListener("resume", this.socket.syncReq(), false);
    },

    initialize: function() {
        $(document).ready(function() {
            app.bindEvents();
        });          
    },

    bindEvents: function() {
        document.addEventListener("deviceready", this.startupDialog, false);
        //so to emulate this one:
        //this.startupDialog();
        $(window).on("hashchange", $.proxy(this.route, this));
    },

    onReady: function() {
        //to test presence of ip
        //console.log(localStorage.getItem("ip"));
        //and delete
        //localStorage.removeItem("ip"); //!!!
        window.location.hash = "#connect";
        app.receivedEvent('ready');
        window.setTimeout($.proxy(this.setup, this), 2000);
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    registerEvents: function(hash) {
        //dummy for showing purporses
        var matchAndCycle = function(elements, store) {
            elements.each(function() {
                var that = this;

                $(this).cycle("goto", store.allMenuElements.filter(function(item) {
                    return item.elementId === $(that).parent().attr("id");
                })[0].state);
            });
        };

        //dummy for showing purporses
        var elements = $("body").find(".cycle-slideshow").each(function() {
            $(this).cycle();
        });

        if (typeof app.socket !== "undefined") {
            if (!app.socket.getSocket().socket.reconnecting) {
                switch(hash) {
                    case "#temperature-menu":
                        matchAndCycle(elements, app.store);                        
                        break;
                    case "#lighting-menu":
                        LightingMenuView.updateView(app.store, app.socket);
                        break;
                    case "#blinds-menu":
                        matchAndCycle(elements, app.store);
                        break;
                    case "#options":
                    case "#help":
                    case "#error":
                        break;
                    default:
                        matchAndCycle(elements, app.store);
                }
            } else {
                switch(hash) {
                    case "#options":
                    case "#help":
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

    route: function() {
        var hash = window.location.hash;

        if (typeof app.socket !== "undefined") {
            if (!app.socket.getSocket().socket.reconnecting) {
                switch(hash) {
                    case "#temperature-menu":
                        $("body").html(new TemperatureMenuView(this.store.temperatureMenuElements).render().element);
                        break;
                    case "#lighting-menu":
                        $("body").html(new LightingMenuView(this.store.lightingMenuElements).render().element);
                        break;
                    case "#blinds-menu":
                        $("body").html(new BlindsMenuView(this.store.blindsMenuElements).render().element);
                        break;
                    case "#options":
                        $("body").html(new OptionsView().render().element);
                        break;
                    case "#help":
                        $("body").html(new HelpView().render().element);
                        break;
                    case "#error":
                        $("body").html(new ErrorView().render().element);
                        break;
                    default:
                        $("body").html(new MainMenuView(this.store.mainMenuElements).render().element);
                }
            } else {
                switch(hash) {
                    case "#options":
                        $("body").html(new OptionsView().render().element);
                        break;
                    case "#help":
                        $("body").html(new HelpView().render().element);
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
