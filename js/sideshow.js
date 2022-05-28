class SideShow {
  constructor() {
    this.imgs = document.querySelectorAll(".sideshow-container a");
    this.points = document.querySelectorAll(".selector .point");
    this.index = 0;
    this.timer = null;
  }
  show() {
    for (let i = 0; i < this.imgs.length; i++) {
      this.imgs[i].style.display = "none";
      this.points[i].style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      this.points[i].style.height = "10px";
    }
    this.imgs[this.index].style.display = "block";
    this.points[this.index].style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    this.points[this.index].style.height = "15px";
  }
  autoPlay(interval = 5000) {
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % this.imgs.length;
      this.show();
    }, interval);
  }
  addEvent() {
    document.querySelector(".left-button").onclick = () => {
      this.index = (this.index + this.imgs.length - 1) % this.imgs.length;
      this.show();
    };
    document.querySelector(".right-button").onclick = () => {
      this.index = (this.index + 1) % this.imgs.length;
      this.show();
    };
    this.points.forEach((p, i) => {
      p.onclick = () => {
        this.index = i;
        this.show();
      };
    });

  }
}

let sideShow = new SideShow();
sideShow.show();
sideShow.autoPlay();
sideShow.addEvent();
