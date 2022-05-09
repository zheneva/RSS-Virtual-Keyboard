const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "enter",
            "tab", "a", "s", "d", "f", "g", "h", "j", "k", "l",
            , "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "keyboard_arrow_up", "Shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "keyboard_arrow_left", "keyboard_arrow_down", "keyboard_arrow_right"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons ">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "l", "enter", "keyboard_arrow_right", "Shift"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Backspace";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.id = "CapsLock";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Enter";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "keyboard_arrow_up":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "ArrowUp";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "keyboard_arrow_down":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "ArrowDown";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "keyboard_arrow_left":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "ArrowLeft";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "keyboard_arrow_right":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "ArrowRight";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "Win":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Meta";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = 'Win';

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "Ctrl":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Control";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = 'Ctrl';

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "Alt":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Alt"//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = 'Alt';


                    keyElement.addEventListener("click", () => {
                    });

                    break;

                case "Shift":
                    // keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Shift"//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = 'Shift';


                    keyElement.addEventListener("click", () => {
                        // this.properties.value += "\n";
                        // this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.id = ' ';//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.id = "Tab";//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "  ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.id = key.toLowerCase();//! COORECT THE ID INDEFECATOR
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.id = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 ) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

const createInput = () => {

    const body = document.querySelector('body').appendChild(renderInput());
    //console.log(body);
};

const renderInput = () => {
    const inputIten = document.createElement('textarea');
    inputIten.classList.add('use-keyboard-input');
    inputIten.style = "position: absolute; top: 200px; left:50%; width:800px ; transform: translate(-50%, -50%); border: 2px solid #000";
    return inputIten;
};

window.addEventListener("DOMContentLoaded", function () {
    createInput();
    Keyboard.init();

    window.addEventListener('keydown', event => {
        //!console.log(event);
        Keyboard.elements.keys.forEach( key => {

            if (key.id == event.key){
                key.classList.add('modify');
            }
        })
    })

    window.addEventListener('keyup', event => {

        Keyboard.elements.keys.forEach( key => {

            if (key.id == event.key){
                key.classList.remove('modify');
            }
        })

    })

});


//ToDoo: зажигать кнопки при клики на клвае (сранивать с id) + анимация нажатия кнопки(transform)
//ToDoo: разобраться с инпутом
//ToDoo: комбинации клавиш
//ToDoo: анимация нажатия кнопки

