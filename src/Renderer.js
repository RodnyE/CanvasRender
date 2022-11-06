///// Renderizador en el canvas

(function () {

  const Renderer = function (canvas, width, height) {
    this.width = width || canvas.width;
    this.height = height || canvas.height;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  };
  Renderer.prototype = Object.create(null);
  Renderer.prototype.type = "renderer";

  /// MÉTODOS
  // renderizar contenedor
  Renderer.prototype.render = function (element) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    element._offset = element.getGlobalPosition();
    this._render(element);
  }

  // funcion recursiva para el pintado de cada elemento
  Renderer.prototype._render = function (element) {
    if (element.visible) { // si es visible
      let offset = element._offset;
      let position = element.getGlobalPosition(offset);
      let dimension = element.getLocalDimensions();
      let x = position.x;
      let y = position.y;
      let ratio = element.ratio;
      
      let width = dimension.width;
      let height = dimension.height;

      // renderizar
      let texture = element.texture;
      if (texture) {
        if (x < this.width && x + width > 0 &&
            y < this.height && y + height > 0) 
        {
          texture.draw(this.ctx, x, y, width, height);
        }
      }
      
      // si es un contenedor, continuar recursion en los hijos
      let childs = element.childs;
      if (childs) {
        if (element.sortableChildren) element.sortChildren(); // reordenar por zIndex
        for (let i = 0; i < childs.length; i++) {
          let child = childs[i];
          child._offset = {
            x: x,
            y: y,
          };
          this._render(child);
        }
      }
    }
  };


  CANVAS.Renderer = Renderer; // exportar

})();