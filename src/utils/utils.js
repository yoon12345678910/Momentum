// 자릿수
// usage
//= > 3..padLeft() => '03'
//= > 3..padLeft(100,'-') => '--3'
Number.prototype.padLeft = function (base, chr) {
  var len = (String(base || 10).length - String(this).length) + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
};


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

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

// if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) {
      // console.log('??')
      return null;
    }
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1) {
      // console.log('while', el)
    }
    return null;
  };
// }

// hasClass
Element.prototype.hasClass = function (cls) {
  return (' ' + this.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

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


Element.prototype.isVisible = function () {
  return !!this && !!(this.offsetWidth || this.offsetHeight || this.getClientRects().length);
}

Element.prototype.siblings = function () {
	var siblings = [];
	var sibling = this.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType === 1 || sibling !== this) siblings.push(sibling);
	}
	return siblings;
}

// https://code.i-harness.com/ko-kr/q/2558f (2018-03-11)
// Element.prototype.hideOnClickOutside = function (fn, isRegistration = false) {
//   const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
//   const outsideClickListener = e => {
//     if (!this.contains(e.target)) {
//       if (isVisible(this) && typeof fn === 'function') {
//         fn();
//         removeClickListener();
//       }
//     }
//   }
//   const removeClickListener = () => {
//     document.removeEventListener('click', outsideClickListener);
//   }
//   if (isRegistration) {
//     document.addEventListener('click', outsideClickListener);
//   } else {
//     removeClickListener();
//   }
// }

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Object.prototype.isEmpty = function() {
//   for(var key in this) {
//       if(this.hasOwnProperty(key))
//           return false;
//   }
//   return true;
// }


window.getToday = function (date) {
  // const date = new Date();
  return [date.getFullYear(),
  (date.getMonth() + 1).padLeft(),
  date.getDate().padLeft(),
  ].join('-');
}

window.getCurrentTime = function () {
  const date = new Date();
  return [date.getFullYear(),
  (date.getMonth() + 1).padLeft(),
  date.getDate().padLeft(),
  ].join('-') + '/' + [date.getHours().padLeft(),
  date.getMinutes().padLeft(),
  date.getSeconds().padLeft(),
  ].join(':');
}

