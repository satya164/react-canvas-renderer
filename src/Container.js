/**
 * Container class which keeps track of all the children
 * and also handles updating the canvas
 *
 * @flow
 */

export default class Container {
  children = [];
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  // Add a child to the end of existing list of children
  appendChild(child: any) {
    child.parent = this;

    this.children.push(child);
    this.invalidate();
  }

  // Remove a child from the list of children
  removeChild(child: any) {
    this.children = this.children.filter(c => c !== child);
    this.invalidate();
  }

  // Insert a child before another child in the list of children
  insertBefore(child: any, childBefore: any) {
    child.parent = this;

    this.children.splice(this.children.indexOf(childBefore), 0, child);
    this.invalidate();
  }

  // The rendering context of the canvas is used for drawing
  getRenderingContext2D() {
    return this.canvas.getContext('2d');
  }

  // This method will be called multiple times for each children
  // To avoid unnecessary redraws, we batch updates with requestAnimationFrame
  invalidate() {
    // Cancel any scheduled redraws
    cancelAnimationFrame(this.update);

    // Schedule a redraw
    this.update = requestAnimationFrame(() => {
      // Before drawing new content, we need to clear the whole canvas
      this.getRenderingContext2D().clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      // Go through all the children and draw them
      this.children.forEach(child => child.draw());
    });
  }

  update: any;
}
