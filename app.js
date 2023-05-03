/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
const data = {
  backspace: 'Backspace',
  tab: 'Tab',
  delete: 'Del',
  capsLock: 'CapsLock',
  enter: 'Enter',
  shiftLeft: 'Shift',
  arrowUp: '🠕',
  shiftRight: 'Shift',
  controlLeft: 'Ctrl',
  metaLeft: 'Win',
  altLeft: 'Alt',
  space: 'Space',
  altRight: 'Alt',
  arrowLeft: '🠔',
  arrowDown: '🠗',
  arrowRight: '🠖',
  controlRight: 'Ctrl',
};

const EN = {
  backquote: ['`', '~'],
  digit1: ['1', '!'],
  digit2: ['2', '@'],
  digit3: ['3', '#'],
  digit4: ['4', '$'],
  digit5: ['5', '%'],
  digit6: ['6', '^'],
  digit7: ['7', '&'],
  digit8: ['8', '*'],
  digit9: ['9', '('],
  digit0: ['0', ')'],
  minus: ['-', '_'],
  equal: ['=', '+'],
  keyQ: ['q', 'Q'],
  keyW: ['w', 'W'],
  keyE: ['e', 'E'],
  keyR: ['r', 'R'],
  keyT: ['t', 'T'],
  keyY: ['y', 'Y'],
  keyU: ['u', 'U'],
  keyI: ['i', 'I'],
  keyO: ['o', 'O'],
  keyP: ['p', 'P'],
  bracketLeft: ['[', '{'],
  bracketRight: [']', '}'],
  backslash: ['\\', '|'],
  keyA: ['a', 'A'],
  keyS: ['s', 'S'],
  keyD: ['d', 'D'],
  keyF: ['f', 'F'],
  keyG: ['g', 'G'],
  keyH: ['h', 'H'],
  keyJ: ['j', 'J'],
  keyK: ['k', 'K'],
  keyL: ['l', 'L'],
  semicolon: [';', ':'],
  quote: ["'", '"'],
  keyZ: ['z', 'Z'],
  keyX: ['x', 'X'],
  keyC: ['c', 'C'],
  keyV: ['v', 'V'],
  keyB: ['b', 'B'],
  keyN: ['n', 'N'],
  keyM: ['m', 'M'],
  comma: [',', '<'],
  period: ['.', '>'],
  slash: ['/', '?'],
};

const RU = {
  backquote: ['ё', 'Ё'],
  digit1: ['1', '!'],
  digit2: ['2', '"'],
  digit3: ['3', '№'],
  digit4: ['4', ';'],
  digit5: ['5', '%'],
  digit6: ['6', ':'],
  digit7: ['7', '?'],
  digit8: ['8', '*'],
  digit9: ['9', '('],
  digit0: ['0', ')'],
  minus: ['-', '_'],
  equal: ['=', '+'],
  keyQ: ['й', 'Й'],
  keyW: ['ц', 'Ц'],
  keyE: ['у', 'У'],
  keyR: ['к', 'К'],
  keyT: ['е', 'Е'],
  keyY: ['н', 'Н'],
  keyU: ['г', 'Г'],
  keyI: ['ш', 'Ш'],
  keyO: ['щ', 'Щ'],
  keyP: ['з', 'З'],
  bracketLeft: ['х', 'Х'],
  bracketRight: ['ъ', 'Ъ'],
  backslash: ['\\', '/'],
  keyA: ['ф', 'Ф'],
  keyS: ['ы', 'Ы'],
  keyD: ['в', 'В'],
  keyF: ['а', 'А'],
  keyG: ['п', 'П'],
  keyH: ['р', 'Р'],
  keyJ: ['о', 'О'],
  keyK: ['л', 'Л'],
  keyL: ['д', 'Д'],
  semicolon: ['ж', 'Ж'],
  quote: ['э', 'Э'],
  keyZ: ['я', 'Я'],
  keyX: ['ч', 'Ч'],
  keyC: ['с', 'С'],
  keyV: ['м', 'М'],
  keyB: ['и', 'И'],
  keyN: ['т', 'Т'],
  keyM: ['ь', 'Ь'],
  comma: ['б', 'Б'],
  period: ['ю', 'Ю'],
  slash: ['.', ','],
};

function createEl(block, ...blockClass) {
  const res = document.createElement(block);
  blockClass.forEach((item) => {
    res.classList.add(item);
  });
  return res;
}

const body = document.querySelector('body');
let capsLock = false;
let shift = false;

function reactOnShift(n) {
  const en = localStorage.getItem('en');
  const lang = (en === 'true') ? EN : RU;
  for (const item in lang) {
    if (Object.hasOwn(lang, item)) {
      const block = document.querySelector(`.${item}`);
      block.innerHTML = lang[item][n];
    }
  }
}

function getButton(event) {
  if (event.code) {
    const code = (event.code)[0].toLowerCase() + (event.code).slice(1);
    return document.querySelector(`.${code}`);
  }
  return event.target;
}

function getCode(event) {
  return (event.code)[0].toLowerCase() + (event.code).slice(1);
}

function activeKey(event) {
  let button;
  if (event.keyCode === 9) {
    event.preventDefault();
  }
  if (event.code) {
    const code = getCode(event);
    button = document.querySelector(`.${code}`);
  } else {
    button = event.target;
  }
  if (event.type === ('keydown' || 'click')) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
}

function writeChar(char) {
  const textArea = document.querySelector('.main__textarea');
  textArea.value += char;
}

function deleteChar(del = false) {
  const textArea = document.querySelector('.main__textarea');
  const idx = del ? textArea.selectionStart : textArea.selectionStart - 1;
  const txt = textArea.value;
  let diff = txt.length - textArea.selectionStart;
  if (diff > 0 && txt.length !== 1 && diff !== 1) {
    diff = del ? diff - 1 : diff;
    textArea.value = textArea.value.slice(0, idx).concat(textArea.value.slice(-diff));
  } else {
    textArea.value = textArea.value.slice(0, idx);
  }
  textArea.selectionEnd = idx;
}

function buttonClick(event) {
  event.preventDefault();
  let checked = true;
  if (event.type.includes('key')) {
    const code = getCode(event);
    checked = (Object.hasOwn(EN, code) || Object.hasOwn(data, code));
  }

  if (checked) {
    activeKey(event);
    if (event.type.includes('down')
      && ((event.altKey && getButton(event).innerHTML === 'Ctrl')
      || (event.ctrlKey && getButton(event).innerHTML === 'Alt'))) {
      const en = localStorage.getItem('en');
      if (en === 'true') {
        localStorage.setItem('en', false);
      } else {
        localStorage.setItem('en', true);
      }
      reactOnShift(0);
    }
    if (!(event.type === 'mouseup' || event.type === 'keyup')) {
      const what = event.type.includes('key') ? event.key : event.target.innerHTML;
      switch (what) {
        case 'CapsLock':
          capsLock = !capsLock;
          if (capsLock || shift) {
            reactOnShift(1);
          } else {
            reactOnShift(0);
          }
          break;
        case 'Shift':
          shift = true;
          activeKey(event);
          if (capsLock) {
            reactOnShift(0);
          } else {
            reactOnShift(1);
          }
          break;
        case 'Enter':
          writeChar('\n');
          break;
        case 'Backspace':
          deleteChar();
          break;
        case 'Tab':
          writeChar('   ');
          break;
        case 'Space':
        case ' ':
          writeChar(' ');
          break;
        case 'ArrowUp':
          writeChar('↑');
          break;
        case 'ArrowDown':
          writeChar('↓');
          break;
        case 'ArrowLeft':
          writeChar('←');
          break;
        case 'ArrowRight':
          writeChar('→');
          break;
        case 'Del':
        case 'Delete':
          deleteChar(true);
          break;
        case 'Ctrl':
        case 'Control':
        case 'Win':
        case 'Meta':
        case 'Alt':
          break;
        default: {
          let char = getButton(event).innerHTML;
          char = char.length > 3 ? event.key : char;
          writeChar(char);
          break;
        }
      }
    } else if (event.key === 'Shift' || getButton(event).className.includes('shift')) {
      shift = false;
      if (capsLock) {
        reactOnShift(1);
      } else {
        reactOnShift(0);
      }
    }
  }
}

function init() {
  const main = createEl('main', 'main');
  const h1 = createEl('h1');
  h1.innerHTML = 'RSS Виртуальная клавиатура';
  const textArea = createEl('textarea', 'main__textarea');
  const keyboard = createEl('div', 'main__keyboard');
  const h3 = createEl('h3');
  h3.innerHTML = 'Ctrl + Alt: переключение языка';
  const os = createEl('h3');
  os.innerHTML = 'Клавиатура создана в ОС Windows';

  function drowKey(list) {
    for (const item in list) {
      if (Object.hasOwn(list, item)) {
        const block = createEl('div', 'main__keyboard-key', item);
        block.innerHTML = Array.isArray(list[item]) ? list[item][0] : list[item];
        block.addEventListener('mousedown', buttonClick);
        block.addEventListener('mouseup', buttonClick);
        keyboard.appendChild(block);
      }
    }
  }

  drowKey(data);
  if (!localStorage.getItem('en') || localStorage.getItem('en') === 'true') {
    localStorage.setItem('en', true);
    drowKey(EN);
  } else {
    drowKey(RU);
  }
  main.appendChild(h1);
  main.appendChild(textArea);
  main.appendChild(keyboard);
  main.appendChild(h3);
  main.appendChild(os);
  body.appendChild(main);

  document.addEventListener('keydown', buttonClick);
  document.addEventListener('keyup', buttonClick);
}

init();
