/**
* Reprezentuje magazyn. Przechowuje elementy menu i ich stany. Zawiera funkcje do tworzenia elementów.
* @constructor
**/
var Store = function() {

    /**
    * Tworzy element będący zwykłym obrazem.
    * @function
    * @param {string} image - Ścieżka do pliku z obrazkiem.
    **/
    var makeTile = function(image) {
        return "<img src=" + image + ">";
    };

    /**
    * Tworzy element będący układem zmieniających się obrazów.
    * @function
    * @param {string} firstImage - Ścieżka do pliku z obrazkiem.
    * @param {string} secondImage - Ścieżka do pliku z obrazkiem.
    * @param {string} buttonImage - Ścieżka do pliku z obrazkiem przycisku.
    * @param {Object} descArgs - Obiekt definujący podpisy obrazków.
    **/
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

    /**
    * Tworzy element będący układem zmieniających się obrazów.
    * @function
    * @param {string} firstImage - Ścieżka do pliku z obrazkiem.
    * @param {string} secondImage - Ścieżka do pliku z obrazkiem.
    * @param {string} buttonImage - Ścieżka do pliku z obrazkiem przycisku.
    * @param {Object} descArgs - Obiekt definujący podpisy obrazków.
    **/
    var makeAlarmSwitchTile = function(firstImage, secondImage, descArgs) {
        return "<div class='cycle-slideshow'\
                 data-cycle-fx=fadeout\
                 data-cycle-timeout=100\
                 data-cycle-caption-plugin=caption2\
                 data-cycle-overlay-fx-out='slideUp'\
                 data-cycle-overlay-fx-in='slideDown'\
                 >\
                 <div class='cycle-overlay'></div>" +
                 "<img src=" + firstImage + " data-cycle-title=" + descArgs.offTitle + " data-cycle-desc=" + descArgs.offDesc + ">" +
                 "<img src=" + secondImage  + " data-cycle-title=" + descArgs.onTitle + " data-cycle-desc=" + descArgs.onDesc + ">" +
             "</div>";
    };

    /**
    * Tworzy element będący częścią menu Temperature.
    * @function
    * @param {string} image - Ścieżka do pliku z obrazkiem.
    **/
    var makeTemperatureTile = function(image) {
        return "<div class='temp-slider'></div>" +
            "<div class='temperature-info'>" +
                "<img src=" + image + ">" +
            "</div>";
    };

    /**
    * Tworzy element będący częścią menu Help.
    * @function
    * @param {string} image - Łańcuch zawierający numer telefonu.
    * @param {string} image - Ścieżka do pliku z obrazkiem.
    **/
    var makeHelpTile = function(image, number) {
        return "<a href=" + number + ">" +
            "<img src=" + image + ">" +
            "</a>";
    };

    /**
    * Zawiera elementy menu głównego.
    * @inner
    **/
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
            makeAlarmSwitchTile("images/off.png", "images/on.png", {
                onTitle: "\"\"",
                onDesc: "\"\"",
                offTitle: "\"\"",
                offDesc: "\"\""
            }),
        "state":
            0
        },
        {"elementId": 
            "help",
        "elementClass":
            "single-row first-order-menu",
        "elementContent":
            makeTile("images/help.png")
        }
    ];

    /**
    * Zawiera elementy menu Temperature.
    * @inner
    **/
    this.temperatureMenuElements = [
        {"elementId":
            "temp-room-1",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/kitchen.png"),
        "state":
            0
        },
        {"elementId":
            "temp-room-2",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/bedroom.png"),
        "state":
            0
        },
		{"elementId":
            "temp-room-3",
        "elementClass":
            "single-row temp-tile",
        "elementContent":
            makeTemperatureTile("images/bathroom.png"),
        "state":
            0
        }
    ];

    /**
    * Zawiera elementy menu Blinds.
    * @inner
    **/
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

    /**
    * Zawiera elementy menu Help.
    * @inner
    **/
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

    /**
    * Zawiera elementy menu Light.
    * @inner
    **/
    this.lightingMenuElements = [
        LightingMenuView.makeTile("light-room-1", 0),
        LightingMenuView.makeTile("light-room-2", 0),
        LightingMenuView.makeTile("light-room-3", 0)
    ];
};
