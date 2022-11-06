///// Contenedor

(function () {

  const Container = function () {
    CANVAS.DisplayObject.call(this); // super()
    this.childs = [];
    this.sortableChildren = false;
  };
  Container.prototype = Object.create(CANVAS.DisplayObject.prototype); // extends
  Container.prototype.type = "container";


  // Reordenar hijos por index
  Container.prototype.sortChildren = function () {
    let childs = this.childs;
    childs.sort(function (a, b) {
      return a.zIndex - b.zIndex;
    });
    for (let i = 0; i < childs.length; i++) childs[i].childId = i;
  }

  // añadir hijo
  Container.prototype.addChild = function (element) {
    if (element.parent) element.parent.removeChild(element);
    element.childId = this.childs.length;
    element.parent = this;
    this.childs.push(element);
  }

  // eliminar hijo
  Container.prototype.removeChild = function (element) {
    let childId = element.childId;
    let child = this.childs[childId];
    child.parent = null;
    child.childId = null;
    this.childs.splice(childId, 1);
  }

  CANVAS.Container = Container; // exportar
})();