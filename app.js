const data = {
  backspace: "Backspace",
  tab: "Tab",
  delete: "Del",
  capsLock: "CapsLock",
  enter: "Enter",
  shiftLeft: "Shift",
  arrowUp: "🠕",
  shiftRight: "Shift",
  controlLeft: "Ctrl",
  metaLeft: "Win",
  altLeft: "Alt",
  space: "Space",
  altRight: "Alt",
  arrowLeft: "🠔",
  arrowDown: "🠗",
  arrowRight: "🠖",
  controlRight: "Ctrl"
}

const EN = {
  backquote: ["`", "~"],
  digit1: ["1", "!"],
  digit2: ["2", "@"],
  digit3: ["3", "#"],
  digit4: ["4", "$"],
  digit5: ["5", "%"],
  digit6: ["6", "^"],
  digit7: ["7", "&"],
  digit8: ["8", "*"],
  digit9: ["9", "("],
  digit0: ["0", ")"],
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
  bracketLeft: ["[", "{"],
  bracketRight: ["]", "}"],
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

const RU = {
  backquote: ["ё", "Ё"],
  digit1: ["1", "!"],
  digit2: ["2", "@"],
  digit3: ["3", "#"],
  digit4: ["4", "$"],
  digit5: ["5", "%"],
  digit6: ["6", "^"],
  digit7: ["7", "&"],
  digit8: ["8", "*"],
  digit9: ["9", "("],
  digit0: ["0", ")"],
  minus: ["-", "_"],
  equal: ["=", "+"],
  keyQ: ["й", "Й"],
  keyW: ["ц", "Ц"],
  keyE: ["у", "У"],
  keyR: ["к", "К"],
  keyT: ["е", "Е"],
  keyY: ["н", "Н"],
  keyU: ["г", "Г"],
  keyI: ["ш", "Ш"],
  keyO: ["щ", "Щ"],
  keyP: ["З", "з"],
  bracketLeft: ["х", "Х"],
  bracketRight: ["ъ", "Ъ"],
  backslash: ["\\", "/"],
  keyA: ["ф", "Ф"],
  keyS: ["ы", "Ы"],
  keyD: ["в", "В"],
  keyF: ["а", "А"],
  keyG: ["п", "П"],
  keyH: ["р", "Р"],
  keyJ: ["о", "О"],
  keyK: ["л", "Л"],
  keyL: ["д", "Д"],
  semicolon: ["ж", "Ж"],
  quote: ["э", "Э"],
  keyZ: ["я", "Я"],
  keyX: ["ч", "Ч"],
  keyC: ["с", "С"],
  keyV: ["м", "М"],
  keyB: ["и", "И"],
  keyN: ["т", "Т"],
  keyM: ["ь", "Ь"],
  comma: ["б", "Б"],
  period: ["ю", "Ю"],
  slash: [".", ","]
}

function createEl(block, ...block_class) {
  const res = document.createElement(block);
  block_class.forEach(item => {
      res.classList.add(item);
  })
  return res;
}

const body = document.querySelector("body");
let capsLock = false;
let en = true;

function reactOnShift(n) {
  //console.log(n)
  const blocks = document.querySelector('.main__keyboard').children;
  let lang = en ? EN : RU;
  for (const item in lang) {
    const block = document.querySelector(`.${item}`);
    block.innerHTML = lang[item][n];
  }
}

function getButton(event) {
  if (event.code) {
    const code = (event.code)[0].toLowerCase() + (event.code).slice(1);
    return document.querySelector(`.${code}`);
  } else {
    return event.target;
  }
}

function activeKey(event) {
  let button;
  //console.log(event)
  if (event.keyCode == 9) {
    event.preventDefault();
  }
  if (event.code) {
    const code = (event.code)[0].toLowerCase() + (event.code).slice(1);
    button = document.querySelector(`.${code}`);
  } else {
    button = event.target;
  }
  event.type == ("keydown" || "click") ? button.classList.add('active') : button.classList.remove('active');
}

function writeChar(char) {
  const textArea = document.querySelector(".main__textarea");
  textArea.value += char;
}

function deleteChar() {
  const textArea = document.querySelector(".main__textarea");
  textArea.value = textArea.value.slice(0, -1);
}

function buttonClick(event) {
  //console.log(event)
  event.preventDefault();
  activeKey(event);
  if ((event.altKey && getButton(event).innerHTML == "Ctrl") || (event.ctrlKey && getButton(event).innerHTML == "Alt")) {
    en = en ? false : true;
    reactOnShift(0);
  }
  // if (event.shiftKey) {
  //   writeChar(event);
  // }
  // let what;
  // if (event.type.includes("up") && event.key == "Shift") {
  //   what = "Unshift";
  // } else {
    const what = event.type.includes("key") ? event.key : event.target.innerHTML;
  // }
  switch (what) {
    case "CapsLock":
      capsLock = capsLock ? false : true;
      capsLock ? reactOnShift(1) : reactOnShift(0);
      break;
    case "Shift":
      activeKey(event);
      reactOnShift(1);
      event.target.addEventListener("mouseup", () => {
        reactOnShift(0);
      }, {once: true})
      event.target.addEventListener("keyup", () => {
        reactOnShift(0);
      }, {once: true})
      break;
    case "Unshift":
      reactOnShift(0);
      break;
    case "Enter":
      writeChar("\n");
      break;
    case "Backspace":
      deleteChar();
      break;
    case "Tab":
      writeChar("   ");
      break;
    case "Space":
    case " ":
      writeChar(" ");
      break;
    case "ArrowUp":
      writeChar("🠕");
      break;
    case "ArrowDown":
      writeChar("🠗");
      break;
    case "ArrowLeft":
      writeChar("🠔");
      break;
    case "ArrowRight":
      writeChar("🠖");
      break;
    case "Ctrl":
    case "Control":
    case "Win":
    case "Meta":
    case "Alt":
      break;
    default:
      writeChar(getButton(event).innerHTML);
      break;
  }
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
      block.addEventListener('mousedown', buttonClick);
      keyboard.appendChild(block);
    }
  }
  
  drowKey(data);
  drowKey(EN);
  
  main.appendChild(h1);
  main.appendChild(textArea);
  main.appendChild(keyboard);
  body.appendChild(main);

  document.addEventListener('keydown', buttonClick);
  document.addEventListener('keyup', activeKey);
}

init()