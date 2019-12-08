/* eslint linebreak-style: ["error", "windows"] */

// change form

const changeForm = (node) => {
  if (document.body.classList.contains('cursor-exc')) {
    if (node.classList.contains('circ')) {
      node.classList.remove('circ');
    } else {
      node.classList.add('circ');
    }
    document.body.classList.remove('cursor-exc');
  }
};

const checkBlock = (event) => {
  const { target: targ } = event;
  if (targ.classList[0] !== 'block') {
    return;
  }
  changeForm(targ);
};

const formIcon = () => {
  document.body.className = 'cursor-exc';
  const form = document.getElementsByClassName('blocks')[0];
  form.addEventListener('click', checkBlock);
};

const formButton = document.getElementsByClassName('icon-exchange')[0];
formButton.addEventListener('click', formIcon);

// bg-color

const changeForm1 = (node) => {
  const style = getComputedStyle(document.getElementsByClassName('round')[0]);

  if (document.body.classList.contains('cursor-pal')) {
    const strBgC = 'background-color: ';
    const getStyle = node.style;
    getStyle.cssText = strBgC + style.backgroundColor;
    document.body.classList.remove('cursor-pal');
  }
};

const checkBlock1 = (event) => {
  const { target: targ } = event;
  if (targ.classList[0] !== 'block') return;
  changeForm1(targ);
};

const bgColor = () => {
  document.body.className = 'cursor-pal';
  const form = document.getElementsByClassName('blocks')[0];
  form.addEventListener('click', checkBlock1);
};

const paletteButton = document.getElementsByClassName('icon-palette')[0];
paletteButton.addEventListener('click', bgColor);

// choose color

const changeColor = (target) => {
  const itemsColor = document.getElementsByClassName('round');
  if (document.body.classList.contains('cursor-pipette')) {
    const str = 'background-color: ';
    const computedStyle = getComputedStyle(target).backgroundColor;
    const curColor = document.getElementsByClassName('round')[0];
    const bgColCur = getComputedStyle(curColor).backgroundColor;
    const prevColor = document.getElementsByClassName('round')[1];
    prevColor.style.cssText = str + bgColCur;
    curColor.style.cssText = str + computedStyle;
    document.body.classList.remove('cursor-pipette');
    for (let i = 0; i < itemsColor.length; i += 1) {
      itemsColor[i].classList.remove('round_hover');
    }
  }
};

const chooseBlock2 = (event) => {
  const { target: targ } = event;
  if (targ.classList[0] === 'icon-eyedropper') return;
  changeColor(targ);
};

const chooseColor = () => {
  document.body.className = 'cursor-pipette';
  const itemsColor = document.getElementsByClassName('round');
  for (let i = 0; i < itemsColor.length; i += 1) {
    itemsColor[i].classList.add('round_hover');
  }
  const bod = document.getElementsByTagName('body')[0];
  bod.addEventListener('click', chooseBlock2);
};

const chooseColorButton = document.getElementsByClassName('icon-eyedropper')[0];
chooseColorButton.addEventListener('click', chooseColor);

class Style {
  constructor(backColor, form) {
    this.backColor = backColor;
    this.form = form;
  }
}

const save = () => {
  for (let i = 0; i < 9; i += 1) {
    const el = document.getElementsByClassName('block')[i];
    const bgColCur = getComputedStyle(el).backgroundColor;
    const radius = getComputedStyle(el).borderRadius;
    const style = new Style(bgColCur, radius);
    const sItem = JSON.stringify(style);
    localStorage.setItem(i, sItem);
  }
};

const button = document.getElementsByClassName('inLocalStorage')[0];
button.addEventListener('click', save);

const fromLocalStorage = () => {
  for (let i = 0; i < 9; i += 1) {
    const stylesString = localStorage.getItem(i);
    const stylesObj = JSON.parse(stylesString);
    const block1 = document.getElementsByClassName('block')[i];
    const boardRadius = '50%';
    if (stylesObj.form === boardRadius) {
      block1.classList.add('circ');
    }
    block1.style.backgroundColor = stylesObj.backColor;
  }
};

const button2 = document.getElementsByClassName('fromLocalStorage')[0];
button2.addEventListener('click', fromLocalStorage);

const blockMoveFirst = document.getElementsByClassName('block')[0];

function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left,
  };
}

const moveElem = (e) => {
  const { target: targ } = e;
  if (targ.classList[0] !== 'block') {
    return;
  }

  const element = targ;
  if (document.body.classList.contains('cursor-move')) {
    const coords = getCoords(element);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    const blockMove = element.cloneNode();
    blockMove.classList.add('block');
    element.classList.add('opac');
    blockMove.style.position = 'absolute';
    document.body.appendChild(blockMove);
    const px = 'px';
    blockMove.style.left = e.pageX - shiftX + px;
    blockMove.style.top = e.pageY - shiftY + px;
    blockMove.style.zIndex = 1000;

    document.onmousemove = function f(event) {
      blockMove.style.left = event.pageX - shiftX + px;
      blockMove.style.top = event.pageY - shiftY + px;
    };

    blockMove.onmouseup = function exchange(event) {
      blockMove.classList.add('hid');
      const elem = document.elementFromPoint(event.clientX, event.clientY);
      if (elem.classList[0] !== 'block') {
        element.classList.remove('opac');
        // eslint-disable-next-line no-alert
        alert('Wrong item selected');
        return;
      }
      blockMove.classList.remove('hid');
      let flag1 = 0;
      let flag2 = 0;
      const str = 'background-color: ';
      const bdElement = getComputedStyle(element).backgroundColor;
      const bdElem = getComputedStyle(elem).backgroundColor;
      element.style.cssText = str + bdElem;
      elem.style.cssText = str + bdElement;
      if (element.classList.contains('circ')) {
        flag1 = 1;
      }

      if (elem.classList.contains('circ')) {
        flag2 = 1;
      }

      if (flag1 === 1) {
        elem.classList.add('circ');
      } else elem.classList.remove('circ');

      if (flag2 === 1) {
        element.classList.add('circ');
      } else element.classList.remove('circ');
      element.classList.remove('opac');
      document.onmousemove = null;
      blockMove.onmouseup = null;
      document.body.removeChild(blockMove);
      document.body.classList.remove('cursor-move');
    };
  }
};

blockMoveFirst.ondragstart = function f() {
  return false;
};

const moveBtton = () => {
  document.body.className = 'cursor-move';
  const form = document.getElementsByClassName('blocks')[0];
  form.addEventListener('mousedown', moveElem);
};

const moveButton = document.getElementsByClassName('icon-move')[0];
moveButton.addEventListener('click', moveBtton);


window.onkeydown = function buttons(event) {
  if (event.ctrlKey && event.keyCode === 88) {
    bgColor();
  }
  if (event.ctrlKey && event.keyCode === 73) {
    formIcon();
  }
  if (event.ctrlKey && event.keyCode === 89) {
    chooseColor();
  }
  if (event.ctrlKey && event.keyCode === 81) {
    moveBtton();
  }
};
