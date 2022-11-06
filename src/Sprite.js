///// Sprite

(function () {
  
  const Sprite = function (texture) {
    CANVAS.DisplayObject.call(this);
    this.texture = texture;
    this.preserveAspectRatio = false;
    this.ratio = 1; // (getter setter)
  };

  Sprite.prototype = Object.create(CANVAS.DisplayObject.prototype); // extends
  Sprite.prototype.type = "sprite";
  
  // Sprite.prototype.ratio
  Object.defineProperty(Sprite.prototype, "ratio", {
    get () {return this.texture.ratio}
    set (ratio) {this.ratio = ratio}
  });

  CANVAS.Sprite = Sprite;

})();