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

        new StartupDialogView(app.onDeviceReady);
        /*
        $("#startup-dialog").dialog({
            title: "jQuery Dialog Popup",
            buttons: {
                Close: function () {
                    $(this).dialog("close");
                    app.onDeviceReady();
                }
            }
        });
        */
    },
    setup: function() {
        this.store = new Store();
        this.socket = new Socket(this.store, function(states) {
            app.route();
        });
    },
    // Application Constructor
    initialize: function() {
        $(document).ready(function() {
            app.bindEvents();
        });          
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.startupDialog, false);
        this.startupDialog();

        $(window).on("hashchange", $.proxy(this.route, this));
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.setup();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    registerEvents: function(hash) {
        var self = this;

        var matchAndCycle = function(elements, store) {
            elements.each(function() {
                var that = this;

                $(this).cycle("goto", store.filter(function(item) {
                    return item.elementId === $(that).parent().attr("id");
                })[0].state);

            });
        };

        var elements = $("body").find(".cycle-slideshow").each(function() {
            $(this).cycle();
        });

        switch(hash) {
            case "#temperature-menu":
                matchAndCycle(elements, self.store.temperatureMenuElements);
                break;
            case "#lighting-menu":
                matchAndCycle(elements, self.store.lightingMenuElements);
                break;
            case "#blinds-menu":
                matchAndCycle(elements, self.store.blindsMenuElements);
                break;
            default:
                matchAndCycle(elements, self.store.mainMenuElements);
                $('#help').on('click', function() {
                    console.log("Help pop-up!");
                });
        }

        $("body").find(".tile-button").each(function() {
            $(this).on("click", function() {
                self.socket.registerEvents(this);
            });
        });
    },

    route: function() {
        var hash = window.location.hash;

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
            default:
                $("body").html(new MainMenuView(this.store.mainMenuElements).render().element);
        }

        this.registerEvents(hash);
    }

};
