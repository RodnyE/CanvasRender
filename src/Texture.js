///// Texturas

(function () {
  
  const Texture = function (path) {
    let that = this;
    let img = document.createElement("img");
    img.src = path;
    img.onload = function () {
      that.ratio = img.width / img.height;
      that.ready = true;
      img = null;
    };

    this.path = path;
    this.img = img;
    this.ratio = 1;
    this.ready = false;
  }
  Texture.prototype = Object.create(null);
  Texture.prototype.type = "texture";

  // dibujar en canvas
  Texture.prototype.draw = function (ctx, x, y, w, h) {
    if (this.path) ctx.drawImage(this.img, x, y, w, h);
    else {
      ctx.fillStyle = "#000000";
      ctx.fillRect(x, y, w, h);
    }
  }

  CANVAS.Texture = Texture; // exportar

})();