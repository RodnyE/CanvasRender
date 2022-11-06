///// Objeto Base

(function () {
  
  const DisplayObject = function () {

    this.x = 0;
    this.y = 0;
    this.visible = true;
    this.zIndex = 0;

    this.width = 10;
    this.height = 10;
    this._offset = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    };

    this.anchorX = 0;
    this.anchorY = 0;

    this.scaleX = 1;
    this.scaleY = 1;

    this.angle = 0;
    this.parent = null;
    this.childId = null;
  };
  DisplayObject.prototype = Object.create(null);
  DisplayObject.prototype.type = null;


  /// MÉTODOS
  // setear valores
  DisplayObject.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };
  
  DisplayObject.prototype.setSize = function (width, height = width) {
    this.width = width;
    this.height = height;
  };
  
  DisplayObject.prototype.setAnchor = function (x, y = x) {
    this.anchorX = x;
    this.anchorY = y;
  };
  
  DisplayObject.prototype.setScale = function (x, y) {
    this.scaleX = x;
    this.scaleY = y;
  };


  // obtener ancho y alto real en canvas
  DisplayObject.prototype.getLocalDimensions = function () {
    let width = this.width;
    let height = this.height;

    width *= this.scaleX;
    height *= this.scaleY;
    
    if (this.type == "sprite" && this.preserveAspectRatio)
      height = width / this.ratio;

    return {
      width: width,
      height: height
    }
  };

  // obtener posicion real relativa a su contenedor
  DisplayObject.prototype.getLocalPosition = function () {
    let dimensions = this.getLocalDimensions();
    let x = this.x;
    let y = this.y;

    x -= (dimensions.width * this.anchorX);
    y -= (dimensions.height * this.anchorY);

    return {
      x: x,
      y: y,
    }
  };

  // obtener posicion real relativa al canvas
  DisplayObject.prototype.getGlobalPosition = function (offset) {
    let x = 0;
    let y = 0;

    if (!offset) {
      let recursiveElement = this;
      // recorrer todos los contenedores padres
      while (recursiveElement) {
        let localParent = recursiveElement.getLocalPosition();
        x += localParent.x;
        y += localParent.y;
        recursiveElement = recursiveElement.parent;
      }
    } else {
      let local = this.getLocalPosition();
      x = local.x + offset.x;
      y = local.y + offset.y;
    }

    return {
      x: x,
      y: y
    };
  };

  // obtener rotacion real
  DisplayObject.prototype.getGlobalAngle = function () {
    let angle = 0;
    let recursiveElement = this;

    while (recursiveElement) {
      angle += recursiveElement.angle;
      recursiveElement = recursiveElement.parent;
    }

    return angle;
  };


  CANVAS.DisplayObject = DisplayObject; // exportar

  
})();