/**
 * The render function takes care of rendering an element to canvas
 * The function is similar to ReactDOM.render
 *
 * @flow
 */

import * as React from 'react';
import CanvasRenderer from './CanvasRenderer';
import Container from './Container';

// Store our previously created containers
// If render is called again for the same container, we'll reuse it
const containers = new WeakMap();

export function render(element: React.Node, canvas: HTMLCanvasElement, callback?: Function) {
  let container;

  if (containers.has(canvas)) {
    // If a container was already created for the canvas, reuse it
    container = containers.get(canvas);
  } else {
    // If there's no existing container for the canvas, create a new one
    container = CanvasRenderer.createContainer(new Container(canvas));

    // Store the canvas for later reuse
    containers.set(canvas, container);
  }

  // Schedule changes on the root
  CanvasRenderer.updateContainer(element, container, null, callback);

  // Add support for React Devtools
  CanvasRenderer.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0', // version for the renderer
    rendererPackageName: 'canvas-renderer', // package name
    findHostInstanceByFiber: CanvasRenderer.findHostInstance, // host instance (root)
  });
}
