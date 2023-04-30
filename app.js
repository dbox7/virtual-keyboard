let data = {
  backquote: "`",
  dig1: "1",
  dig2: "2",
  dig3: "3",
  dig4: "4",
  dig5: "5",
  dig6: "6",
  dig7: "7",
  dig8: "8",
  dig9: "9",
  dig0: "0",
  minus: "-",
  equal: "=",
  backspace: "Backspace",
  tab: "Tab",
  keyQ: "q",
  keyW: "w",
  keyE: "e",
  keyR: "r",
  keyT: "t",
  keyY: "y",
  keyU: "u",
  keyI: "i",
  keyO: "o",
  keyP: "p",
  bracketL: "[",
  bracketR: "]",
  backslash: "\\",
  del: "Del",
  capsLock: "CapsLock",
  keyA: "a",
  keyS: "s",
  keyD: "d",
  keyF: "f",
  keyG: "g",
  keyH: "h",
  keyJ: "j",
  keyK: "k",
  keyL: "l",
  semicolon: ";",
  quote: "'",
  enter: "Enter",
  shift: "Shift",
  keyZ: "z",
  keyX: "x",
  keyC: "c",
  keyV: "v",
  keyB: "b",
  keyN: "n",
  keyM: "m",
  comma: ",",
  period: ".",
  slash: "/",
  arrowUp: "🠕",
  shiftR: "Shift",
  ctrl: "Ctrl",
  win: "Win",
  alt: "Alt",
  space: "Space",
  altR: "Alt",
  arrowLeft: "🠔",
  arrowButtom: "🠗",
  arrowRight: "🠖",
  ctrlR: "Ctrl"
}

function createEl(block, ...block_class) {
  const res = document.createElement(block);
  block_class.forEach(item => {
      res.classList.add(item);
  })
  return res;
}

const body = document.querySelector("body");

function init() {
  const main = createEl('main', 'main');
  const h1 = createEl('h1');
  h1.innerHTML = "RSS Виртуальная клавиатура";
  const textArea = createEl('textarea', 'main__textarea');
  const keyboard = createEl('div', 'main__keyboard');
  
  for (const item in data) {
    const block = createEl('div',  'main__keyboard-key', item);
    block.innerHTML = data[item];
    keyboard.appendChild(block);
    console.log(keyboard)
  }

  main.appendChild(h1);
  main.appendChild(textArea);
  main.appendChild(keyboard);
  body.appendChild(main);
}

init()