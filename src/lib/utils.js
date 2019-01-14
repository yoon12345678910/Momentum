// https://code.i-harness.com/ko-kr/q/112bac
export const focusContenteditable = (el, isEnd = true) => {
  let range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(el);
    if (isEnd) range.collapse(false);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(el);
    if (isEnd) range.collapse(false);
    range.select();
  }
}

export const animateCSS = (el, animationName) => {
  return new Promise(function (resolve, reject) {
    const animationEnd = (function (tEl) {
      const animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd'
      };
      for (let t in animations) {
        if (tEl.style[t] !== undefined) {
          return animations[t];
        }
      }
    }(document.createElement('div')));
  
    el.classList.add(animationName);
    el.addEventListener(animationEnd, function () {
      this.classList.remove(animationName);
      resolve(el);
      reject(new Error('animateCSS is failed'));
    });
  });
};

