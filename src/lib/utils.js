Element.prototype.animateCss = function (animationName, callback) {
  const animationEnd = (function (el) {
    const animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      WebkitAnimation: 'webkitAnimationEnd'
    };

    for (let t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }

  }(document.createElement('div')));

  this.classList.add(animationName);
  this.addEventListener(animationEnd, function () {
    this.classList.remove(animationName);
    if (typeof callback === 'function') callback(this);
  });

  return this;
}


// https://code.i-harness.com/ko-kr/q/112bac
Element.prototype.setEndOfContenteditable = function () {
  let range, selection;
  if (document.createRange) { //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(this);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection();//get the selection object (allows you to change selection)
    selection.removeAllRanges();//remove any selections already made
    selection.addRange(range);//make the range you have just created the visible selection
  } else if (document.selection) { //IE 8 and lower
    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
    range.moveToElementText(this);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    range.select();//Select the range (make it the visible selection
  }
};

// active contenteditable
Element.prototype.activeContenteditable = function (type) {
  this.classList.add('editing');
  this.animateCss('pulse');
  this.setAttribute('contenteditable', true);
  this.setEndOfContenteditable();
  return this;
}

// inactive contenteditable
Element.prototype.inactiveContenteditable = function () {
  this.classList.remove('editing');
  this.animateCss('pulse');
  this.setAttribute('contenteditable', false);
  return this;
}
