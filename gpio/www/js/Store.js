var Store = function() {

    var makeTile = function(image) {
        return "<img src=" + image + ">";
    };

    var makeSwitchTile = function(firstImage, secondImage, buttonImage, descArgs) {
        return "<div class='tile-button'>" +
                 "<img src=" + buttonImage + ">" +
             "</div>" +
             "<div class='cycle-slideshow'\
                 data-cycle-fx=fadeout\
                 data-cycle-timeout=0\
                 data-cycle-caption-plugin=caption2\
                 data-cycle-overlay-fx-out='slideUp'\
                 data-cycle-overlay-fx-in='slideDown'\
                 >\
                 <div class='cycle-overlay'></div>" +
                 "<img src=" + firstImage + " data-cycle-title=" + descArgs.offTitle + " data-cycle-desc=" + descArgs.offDesc + ">" +
                 "<img src=" + secondImage  + " data-cycle-title=" + descArgs.onTitle + " data-cycle-desc=" + descArgs.onDesc + ">" +
             "</div>";
    };

    var makeTemperatureTile = function(image) {
        return "<div class='temp-slider'></div>" +
            "<div class='temperature-info'>" +
                "<img src=" + image + ">" +
            "</div>";
    };

    var makeHelpTile = function(image, number) {
        return "<a href=" + number + ">" +
            "<img src=" + image + ">" +
            "</a>";
    };

    this.update = function() {
        this.allMenuElements = [].concat.apply([], [
            this.mainMenuElements,
            this.temperatureMenuElements,
            this.blindsMenuElements,
            this.lightingMenuElements,
            this.helpMenuElements
        ]);
    };

    this.mainMenuElements = [
        {"elementId": 
            "temperature-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            makeTile("images/temp.png")
        },
        {"elementId": 
            "lighting-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            makeTile("images/light.png")
        },
        {"elementId": 
            "blinds-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            makeTile("images/blind.png")
        },
        {"elementId": 
            "alarm-switch",
        "elementClass":
            "single-row alarm-switch",
        "elementContent":
            makeSwitchTile("images/off.png", "images/on.png", "images/alarm.png", {
                onTitle: "\"\"",
                onDesc: "\"\"",
                offTitle: "\"\"",
                offDesc: "\"\""
            }),
        "state":
            1
        },
        {"elementId": 
            "help",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            makeTile("images/help.png")
        }
    ];

    this.temperatureMenuElements = [
        {"elementId":
            "temp-room-1",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/kitchen.png"),
        "internalState":
            0
        },
        {"elementId":
            "temp-room-2",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/bedroom.png"),
        "internalState":
            0
        },
		{"elementId":
            "temp-room-3",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/bathroom.png"),
        "internalState":
            0
        }
    ];

    this.blindsMenuElements = [
        {"elementId":
            "blinds-room-1",
        "elementClass":
            "single-row blind-menu",
        "elementContent":
            makeSwitchTile("images/blind_down.png", "images/blind_up.png", "images/kitchen.png", {
                onTitle: "\"\"",
                onDesc: "\"\"",
                offTitle: "\"\"",
                offDesc: "\"\""
            }),
        "state":
            0
        },
        {"elementId":
            "blinds-room-2",
        "elementClass":
            "single-row blind-menu",
        "elementContent":
            makeSwitchTile("images/blind_down.png", "images/blind_up.png", "images/bedroom.png", {
                onTitle: "\"\"",
                onDesc: "\"\"",
                offTitle: "\"\"",
                offDesc: "\"\""
            }),
        "state":
            0
        }
    ];

    this.helpMenuElements = [
        {"elementId":
            "help-112",
        "elementClass":
            "single-row help-menu",
        "elementContent":
            makeHelpTile("images/112.png", "tel:112")
        },
        {"elementId":
            "help-999",
        "elementClass":
            "single-row help-menu",
        "elementContent":
            makeHelpTile("images/999.png", "tel:999")
        },
        {"elementId":
            "help-998",
        "elementClass":
            "single-row help-menu",
        "elementContent":
            makeHelpTile("images/998.png", "tel:998")
        },
        {"elementId":
            "help-997",
        "elementClass":
            "single-row help-menu",
        "elementContent":
            makeHelpTile("images/997.png", "tel:997")
        }
    ];

    this.lightingMenuElements = [];

    this.allMenuElements = [].concat.apply([], [
        this.mainMenuElements,
        this.temperatureMenuElements,
        this.blindsMenuElements,
        this.lightingMenuElements,
        this.helpMenuElements
    ]);

};
