
class Keyboard {
  constructor() {
    this.input = null;
    this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
    };
    this.properties = {
      capslock: false,
      shift: false,
      alt: false,
      'alt gr': false,
      ctrl: false,
    };
    this.keyLayout = {
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'br',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del', 'br',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'Enter', 'br',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '&#8593;', 'br',
        'Ctrl', 'en/ru', 'Alt', 'Space', 'AltGr', 'Ctrl', '&#8592;', '&#8595;', '&#8594;', 'br',
      ],
      ru: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'br',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del', 'br',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter', 'br',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', '&#8593;', 'br',
        'Ctrl', 'en/ru', 'Alt', 'Space', 'AltGr', 'Ctrl', '&#8592;', '&#8595;', '&#8594;', 'br',
      ],
      codes: [
        192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
        9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 46,
        20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 13,
        16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 38,
        17, 91, 18, 32, 18, 17, 37, 40, 39,
      ],
      engShift: {
        192: '~',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        56: '*',
        57: '(',
        48: ')',
        189: '_',
        187: '+',
      },
      ruShift: {
        192: 'ё',
        49: '!',
        50: '"',
        51: '№',
        52: ';',
        53: '%',
        54: ':',
        55: '?',
        56: '*',
        57: '(',
        48: ')',
        189: '_',
        187: '+',
      },
      numbShift: {
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        48: '0',
        189: '-',
        187: '=',
      },
    };
  }

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.input = document.querySelector('#textarea');
    this.virtualKeyClickHandler();

    if (!localStorage.getItem('lang')) {
      this.elements.keysContainer.appendChild(this.createKeys('eng'));
      localStorage.setItem('lang', 'eng');
    } else {
      this.elements.keysContainer.appendChild(this.createKeys(localStorage.getItem('lang')));
    }

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Add real key press handler
    this.realKeyPressHandler();
  }

  createKeys(lang) {
    const fragment = document.createDocumentFragment();
    let codesCount = 0;

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.keyLayout[lang].forEach((key) => {
      if (key === 'br') {
        fragment.appendChild(document.createElement('br'));
      } else {
        const keyElement = document.createElement('button');

        // Add attributes/classes
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');
        keyElement.setAttribute('data', this.keyLayout.codes[codesCount]);
        codesCount += 1;

        switch (key) {
          case 'Backspace':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--backspace');
            keyElement.textContent = 'Backspace';

            break;

          case 'CapsLock':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'CapsLock';

            break;

          case 'Enter':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Enter';

            break;

          case 'Space':
            keyElement.classList.add('keyboard__key--extra-wide');
            keyElement.textContent = 'Space';

            break;

          case 'Tab':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Tab';

            break;

          case 'Shift':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Shift';

            break;

          case 'Ctrl':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Ctrl';

            break;

          case 'AltGr':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'AltGr';

            break;

          case 'Alt':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Alt';

            break;

          case 'Del':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Del';

            break;

          case 'en/ru':
            keyElement.textContent = 'en/ru';

            break;

          case "done":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
            keyElement.innerHTML = createIconHTML("check_circle");

            keyElement.addEventListener("click", () => {
              this.close();
            });

            break;

          default:
            keyElement.innerHTML = key.toLowerCase();

            break;
        }

        fragment.appendChild(keyElement);
      }
    });

    return fragment;
  }

  virtualKeyClickHandler() {
    this.elements.keysContainer.addEventListener('click', (event) => {

      if (event.target.classList.contains('keyboard__key')) {
        event.target.classList.add('keyboard__key--active');
        this.addValueToInput(event.target);

        setTimeout(() => {
          event.target.classList.remove('keyboard__key--active');
        }, 300);
      }
    });
  }

  addValueToInput(target) {
    const currentValue = target.textContent;
    switch (currentValue) {
      case 'Backspace':
        this.input.value = this.input.value.substring(0, this.input.value.length - 1);
        break;

      case 'CapsLock':
        this.triggerSpecialKey(target);
        this.elements.keys.forEach((keyItem) => {
          const key = keyItem;
          if (key.textContent.length === 1) {
            if (this.properties.capslock) {
              key.textContent = key.textContent.toUpperCase();
            } else {
              key.textContent = key.textContent.toLowerCase();
            }
          }
        });

        break;

      case 'Enter':
        this.input.value += '\n';

        break;

      case 'Space':
        this.input.value += ' ';

        break;

      case 'Tab':
        this.input.value += '   ';

        break;

      case 'Shift':
        this.triggerSpecialKey(target);

        break;

      case 'Ctrl':
        this.triggerSpecialKey(target);

        break;

      case 'AltGr':
        this.triggerSpecialKey(target);

        break;

      case 'Alt':
        this.triggerSpecialKey(target);

        break;

      case 'Del':
        if (this.input.selectionStart !== 0) {
          this.input.value = this.input.value.substring(0, this.input.selectionStart)
            + this.input.value.substr(this.input.selectionStart + 1, this.input.value.length);
        }
        break;

      case 'en/ru':
        if (localStorage.getItem('lang') === 'eng') {
          localStorage.setItem('lang', 'ru');
          document.querySelector('.keyboard__keys').innerHTML = '';
          document.querySelector('.keyboard__keys').appendChild(this.createKeys('ru'));
          this.elements.keys = document.querySelectorAll('.keyboard__key');
          this.properties.capslock = false;
        } else {
          localStorage.setItem('lang', 'eng');
          document.querySelector('.keyboard__keys').innerHTML = '';
          document.querySelector('.keyboard__keys').appendChild(this.createKeys('eng'));
          this.elements.keys = document.querySelectorAll('.keyboard__key');
          this.properties.capslock = false;
        }

        break;

      default:
        if (this.properties.shift) {
          this.triggerShiftKey(true);
        }
        this.input.value += currentValue;

        break;
    }
  }

  addValueToInputRealKey(target) {
    const currentValue = target.textContent;
    switch (currentValue) {
      case 'Backspace':
        this.input.value = this.input.value.substring(0, this.input.value.length - 1);
        break;

      case 'CapsLock':
        this.triggerSpecialKey(target);
        this.elements.keys.forEach((keyItem) => {
          const key = keyItem;
          if (key.textContent.length === 1) {
            if (this.properties.capslock) {
              key.textContent = key.textContent.toUpperCase();
            } else {
              key.textContent = key.textContent.toLowerCase();
            }
          }
        });

        break;

      case 'Enter':
        this.input.value += '\n';

        break;

      case 'Space':
        this.input.value += ' ';

        break;

      case 'Tab':
        this.input.value += '   ';

        break;

      case 'Shift':
        this.triggerSpecialKey(target);

        break;

      case 'Ctrl':
        this.triggerSpecialKey(target);

        break;

      case 'AltGr':
        this.triggerSpecialKey(target);

        break;

      case 'Alt':
        this.triggerSpecialKey(target);

        break;

      case 'Del':
        if (this.input.selectionStart !== 0) {
          this.input.value = this.input.value.substring(0, this.input.selectionStart)
            + this.input.value.substr(this.input.selectionStart + 1, this.input.value.length);
        }
        break;

      default:
        this.input.value += currentValue;

        break;
    }
  }

  triggerSpecialKey(targetKey) {
    const key = targetKey.textContent.toLowerCase();
    this.properties[key] = !this.properties[key];
    if (key === 'ctrl' && this.properties.ctrl) {
      this.elements.keys.forEach((element) => {
        if (element.textContent.toLowerCase() === key) {
          element.classList.remove('keyboard__key--highlight');
        }
      });
    }

    if (key === 'shift' && this.properties.shift) {
      this.elements.keys.forEach((elementK) => {
        const element = elementK;
        if (this.keyLayout.engShift[element.getAttribute('data')] && localStorage.getItem('lang') === 'eng') {
          element.textContent = this.keyLayout.engShift[element.getAttribute('data')];
        }
        if (this.keyLayout.engShift[element.getAttribute('data')] && localStorage.getItem('lang') === 'ru') {
          element.textContent = this.keyLayout.ruShift[element.getAttribute('data')];
        }
        if (element.textContent.length === 1) {
          element.textContent = element.textContent.toUpperCase();
        }
        if (element.textContent.toLowerCase() === key) {
          element.classList.remove('keyboard__key--highlight');
        }
      });
    }

    if (key === 'shift' && !this.properties.shift) {
      this.elements.keys.forEach((elementK) => {
        const element = elementK;
        if (element.textContent.length === 1) {
          element.textContent = element.textContent.toLowerCase();
        }
      });
      this.triggerShiftKey(false);
    }

    if (this.properties[key]) {
      targetKey.classList.add('keyboard__key--highlight');
    } else {
      targetKey.classList.remove('keyboard__key--highlight');
    }
  }

  triggerShiftKey(check) {
    if (check) {
      this.properties.shift = !this.properties.shift;
    }
    this.elements.keys.forEach((elementK) => {
      const element = elementK;
      if (this.keyLayout.engShift[element.getAttribute('data')]) {
        if (element.getAttribute('data') === '192') {
          element.textContent = (localStorage.getItem('lang') === 'eng') ? '`' : 'ё';
        } else {
          element.textContent = this.keyLayout.numbShift[element.getAttribute('data')];
        }
      }
      if (element.textContent.length === 1) {
        element.textContent = element.textContent.toLowerCase();
      }
      if (element.textContent.toLowerCase() === 'shift') {
        element.classList.remove('keyboard__key--highlight');
      }
    });
  }

  realKeyPressHandler() {
    window.addEventListener('keydown', (event) => {
      const keys = [];
      keys.push(event.key);
      event.preventDefault();

      if (event.shiftKey && event.altKey) {
        if (localStorage.getItem('lang') === 'eng') {
          localStorage.setItem('lang', 'ru');
          document.querySelector('.keyboard__keys').innerHTML = '';
          document.querySelector('.keyboard__keys').appendChild(this.createKeys('ru'));
          this.elements.keys = document.querySelectorAll('.keyboard__key');
          this.properties.capslock = false;
        } else {
          localStorage.setItem('lang', 'eng');
          document.querySelector('.keyboard__keys').innerHTML = '';
          document.querySelector('.keyboard__keys').appendChild(this.createKeys('eng'));
          this.elements.keys = document.querySelectorAll('.keyboard__key');
          this.properties.capslock = false;
        }
      } else {
        const element = (event.code === 'AltRight' || event.code === 'ControlRight' || event.code === 'ShiftRight')
          ? document.querySelectorAll(`.keyboard__key[data="${event.keyCode}"]`)[1]
          : document.querySelector(`.keyboard__key[data="${event.keyCode}"]`);
        element.classList.add('keyboard__key--active');
        this.addValueToInputRealKey(element);
        setTimeout(() => {
          element.classList.remove('keyboard__key--active');
        }, 300);
      }
    });
  }

  close() {
    this.properties.value = "";
    this.elements.main.classList.add("keyboard--hidden");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create input(textarea) and append to body
  const textarea = document.createElement('textarea');
  const btnDark = document.createElement('button');
  const iconHidden = document.createElement('i');

  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('class', 'use-keyboard-input');
  textarea.setAttribute('placeholder', 'Click here');
  textarea.addEventListener('focus', () => {
    document.querySelector('.keyboard').classList.remove('keyboard--hidden');
  });


  btnDark.setAttribute('class', 'btn');

  iconHidden.setAttribute('class', 'material-icons');
  iconHidden.textContent = 'check_circle';


  document.body.appendChild(textarea);
  document.body.appendChild(btnDark);
  btnDark.appendChild(iconHidden);

  btnDark.addEventListener('click', () => {
    let keyboard = document.querySelector('.keyboard');

    if (!keyboard.classList.contains('keyboard--hidden')) keyboard.classList.add('keyboard--hidden');
  });

  const keyboard = new Keyboard();
  keyboard.init();
});
