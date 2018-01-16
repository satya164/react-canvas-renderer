/**
 * Rectangle class which draws individual rectangles
 *
 * @flow
 */

import * as React from 'react';
import Container from './Container';

type Style = {
  top: number,
  left: number,
  height: number,
  width: number,
  padding: number,
  backgroundColor: string,
  color: string,
  fontSize: number,
  fontFamily: string,
};

type Props = {
  style?: Style,
  children?: React.Node,
};

export default class Rectangle {
  children = [];

  // The parent property will be added by the parent
  parent: Container;

  constructor(props: Props) {
    this.props = props;
  }

  props: Props;

  // Append a child for the first render
  appendInitialChild(child: any) {
    this.children.push(child);
  }

  // Add a child to the end of existing list of children
  appendChild(child: any) {
    this.children.push(child);
    this.parent.invalidate();
  }

  // Remove a child from the existing list of children
  removeChild(child: any) {
    this.children = this.children.filter(c => c !== child);
    this.parent.invalidate();
  }

  // Insert a child before another child in the list of children
  insertBefore(child: any, childBefore: any) {
    this.children.splice(this.children.indexOf(childBefore), 0, child);
    this.parent.invalidate();
  }

  // Update the props with new props
  replaceProps(newProps: Props) {
    this.props = newProps;
    this.children = React.Children.toArray(newProps.children);
    this.parent.invalidate();
  }

  draw() {
    const context = this.parent.getRenderingContext2D();
    const {
      backgroundColor = '#000',
      left = 0,
      top = 0,
      width = 0,
      height = 0,
      padding = 0,
      color = '#fff',
      fontSize = 14,
      fontFamily = 'sans-serif',
    } =
      this.props.style || {};

    let text = '';

    // Collect all the text from the children
    for (const child of this.children) {
      if (typeof child === 'string' || typeof child === 'number') {
        text += child;
      } else if (child) {
        // We don't support nested children yet
        throw new Error(
          "Only strings and numbers allowed as children for '<rectangle />'"
        );
      }
    }

    // Draw the rectangle background
    context.fillStyle = backgroundColor;
    context.fillRect(left, top, width, height);

    // Draw the text
    context.fillStyle = color;
    context.font = `${fontSize}px ${fontFamily}`;
    context.fillText(text, left + padding, top + padding + fontSize);
  }
}
