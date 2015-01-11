/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    startupDialog: function() {
        //checking if ip exists
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
        //refactor callback: function(states)
        this.socket = new Socket(this.store, function(states) {

        });
        console.log(app.socket);
    },

    //app constructor
    initialize: function() {
        $(document).ready(function() {
            app.bindEvents();
        });          
    },

    bindEvents: function() {
        //document.addEventListener('deviceready', this.startupDialog, false);
        this.startupDialog();
        $(window).on("hashchange", $.proxy(this.route, this));
        console.log("after bind");
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
                    case "#error":
                        break;
                    default:
                        matchAndCycle(elements, app.store);
                        $('#help').on('click', function() {
                            console.log("Help pop-up!");
                        });
                }
            } else {
                switch(hash) {
                    case "#options":
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

        console.log(this.socket);
        console.log(hash);

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
                        $("body").html(new OptionsView(this.socket, app.onReady).render().element);
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
                        $("body").html(new OptionsView(this.socket, app.onReady).render().element);
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
