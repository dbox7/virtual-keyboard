const data = {
  backspace: "Backspace",
  tab: "Tab",
  del: "Del",
  capsLock: "CapsLock",
  enter: "Enter",
  shiftLeft: "Shift",
  arrowUp: "🠕",
  shiftRight: "Shift",
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

const EN = {
  backquote: ["`", "~"],
  dig1: ["1", "!"],
  dig2: ["2", "@"],
  dig3: ["3", "#"],
  dig4: ["4", "$"],
  dig5: ["5", "%"],
  dig6: ["6", "^"],
  dig7: ["7", "&"],
  dig8: ["8", "*"],
  dig9: ["9", "("],
  dig0: ["0", ")"],
  minus: ["-", "_"],
  equal: ["=", "+"],
  keyQ: ["q", "Q"],
  keyW: ["w", "W"],
  keyE: ["e", "E"],
  keyR: ["r", "R"],
  keyT: ["t", "T"],
  keyY: ["y", "Y"],
  keyU: ["u", "U"],
  keyI: ["i", "I"],
  keyO: ["o", "O"],
  keyP: ["p", "P"],
  bracketL: ["[", "{"],
  bracketR: ["]", "}"],
  backslash: ["\\", "|"],
  keyA: ["a", "A"],
  keyS: ["s", "S"],
  keyD: ["d", "D"],
  keyF: ["f", "F"],
  keyG: ["g", "G"],
  keyH: ["h", "H"],
  keyJ: ["j", "J"],
  keyK: ["k", "K"],
  keyL: ["l", "L"],
  semicolon: [";", ":"],
  quote: ["'", "\""],
  keyZ: ["z", "Z"],
  keyX: ["x", "X"],
  keyC: ["c", "C"],
  keyV: ["v", "V"],
  keyB: ["b", "B"],
  keyN: ["n", "N"],
  keyM: ["m", "M"],
  comma: [",", "<"],
  period: [".", ">"],
  slash: ["/", "?"]
}

function createEl(block, ...block_class) {
  const res = document.createElement(block);
  block_class.forEach(item => {
      res.classList.add(item);
  })
  return res;
}

const body = document.querySelector("body");
let shift = false;

function reactOnShift(n) {
  const blocks = document.querySelector('.main__keyboard').children;
  for (const item in EN) {
    const block = document.querySelector(`.${item}`);
    block.innerHTML = EN[item][n];
  }
}

function activeKey(event) {
  if (event.code.includes('Shift') && event.type == "keydown") {
    shift = true;
  } else {
    shift = false;
  }
  if (shift) {
    reactOnShift(1);
  } else {
    reactOnShift(0);
  }
  const code = (event.code)[0].toLowerCase() + (event.code).slice(1);
  const button = document.querySelector(`.${code}`);
  event.type == "keydown" ? button.classList.add('active') : button.classList.remove('active');
}

function init() {
  const main = createEl('main', 'main');
  const h1 = createEl('h1');
  h1.innerHTML = "RSS Виртуальная клавиатура";
  const textArea = createEl('textarea', 'main__textarea');
  const keyboard = createEl('div', 'main__keyboard');
  
  function drowKey(data) {
    for (const item in data) {
      const block = createEl('div',  'main__keyboard-key', item);
      block.innerHTML = Array.isArray(data[item]) ? data[item][0] : data[item];
      keyboard.appendChild(block);
    }
  }
  
  drowKey(data);
  drowKey(EN);
  
  main.appendChild(h1);
  main.appendChild(textArea);
  main.appendChild(keyboard);
  body.appendChild(main);

  document.addEventListener('keydown', activeKey);
  document.addEventListener('keyup', activeKey);
}

init()