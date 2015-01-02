var Store = function() {

    this.makeTile = function(image) {
        return "<img src=" + image + ">";
    };

    this.makeSwitchTile = function(firstImage, secondImage, buttonText, descArgs) {
        return "<div class='tile-button'>" +
                 "<span>" + buttonText + "</span>" +
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

    this.makeTemperatureTile = function(image) {
        return "<div class='temp-slider'></div>" +
            "<div class='temperature-info'>" +
                "<img src=" + image + ">" +
            "</div>";
    };

    this.mainMenuElements = [
        {"elementId": 
            "temperature-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            this.makeTile("images/1.jpg")
        },
        {"elementId": 
            "lighting-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            this.makeTile("images/1.jpg")
        },
        {"elementId": 
            "blinds-menu",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            this.makeTile("images/1.jpg")
        },
        {"elementId": 
            "alarm-switch",
        "elementClass":
            "single-row main-menu-switch",
        "elementContent":
            this.makeSwitchTile("images/1.jpg", "images/2.jpg", "Push me!", {
                onTitle: "ON",
                onDesc: "None",
                offTitle: "OFF",
                offDesc: "None"
            }),
        "state":
            1
        },
        {"elementId": 
            "help",
        "elementClass":
            "single-row main-menu-pop-up",
        "elementContent":
            this.makeTile("images/1.jpg")
        }
    ];

    this.temperatureMenuElements = [
        {"elementId":
            "temp-room-1",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            this.makeTemperatureTile("images/1.jpg")
        },
        {"elementId":
            "temp-room-2",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            this.makeTemperatureTile("images/1.jpg")
        }
    ];

    this.blindsMenuElements = [
        {"elementId":
            "blinds-room-1",
        "elementClass":
            "single-row",
        "elementContent":
            this.makeSwitchTile("images/1.jpg", "images/2.jpg", "Push me!", {
                onTitle: "ON",
                onDesc: "None",
                offTitle: "OFF",
                offDesc: "None"
            }),
        "state":
            0
        },
        {"elementId":
            "blinds-room-2",
        "elementClass":
            "single-row",
        "elementContent":
            this.makeSwitchTile("images/1.jpg", "images/2.jpg", "Push me!", {
                onTitle: "ON",
                onDesc: "None",
                offTitle: "OFF",
                offDesc: "None"
            }),
        "state":
            0
        }
    ];

    this.lightingMenuElements = [];

}
