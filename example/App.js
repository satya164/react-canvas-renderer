/* @flow */

import * as React from 'react';
import debounce from 'lodash/debounce';
import { Spring } from 'wobble';
import { render } from '../src';

type Props = {};

type State = {
  left: number,
};

class App extends React.Component<Props, State> {
  state = {
    left: 0,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this._handleMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this._handleMouseMove);
  }

  _handleMouseMove = debounce(e => {
    this._spring && this._spring.stop();

    const spring = new Spring({
      fromValue: this.state.left,
      toValue: e.clientX,
      stiffness: 1000,
      damping: 500,
      mass: 30,
    });

    this._spring = spring
      .onUpdate(({ currentValue }) => this.setState({ left: currentValue }))
      .start();
  }, 100);

  _spring: ?Spring;

  render() {
    return (
      <rectangle
        style={{
          backgroundColor: 'tomato',
          height: 96,
          width: 96,
          padding: 20,
          left: this.state.left,
        }}
      >
        ¯\_(ツ)_/¯
      </rectangle>
    );
  }
}

/* $FlowFixMe */
const canvas: HTMLCanvasElement = document.querySelector('canvas');

// Make our canvas work with HiDPI
const pixelRatio = window.devicePixelRatio;
const height = window.innerHeight;
const width = window.innerWidth;

canvas.height = height * pixelRatio;
canvas.width = width * pixelRatio;
canvas.style.height = `${height}px`;
canvas.style.width = `${width}px`;
canvas.getContext('2d').scale(pixelRatio, pixelRatio);

// Render the app on our canvas
render(<App />, canvas);
