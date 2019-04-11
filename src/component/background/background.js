export default class {
  constructor(imgNumber = 40) {
    this.imgNumber = imgNumber;
  }

  init() {
    this._paintImage(Math.floor(Math.random() * this.imgNumber));
  }

  _paintImage(imgNumber) {
    const image = new Image();
    const li = document.createElement('li');
    const imgSrc = `/asset/images/${imgNumber + 1}.jpg`;
  
    image.onload = function () {
      li.style.backgroundImage = `url('${imgSrc}')`;
      li.classList.add('fadeIn');
      document.querySelector('#background').appendChild(li);
    }
    image.src = imgSrc;
  }

}