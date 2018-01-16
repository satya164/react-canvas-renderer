# react-canvas-renderer

Renderer target for React which renders to a HTML5 canvas. This is an experimental implementation made for demo purposes and not intended for production.

## Running the example

```sh
yarn # install the dependencies
yarn run example # run the example
```

## API

The renderer exposes a single function, `render`. It takes 2 arguments, a React element, and a `HTMLCanvasElement` (created with the `canvas` tag):

```js
render(<App />, document.querySelector('canvas'));
```

The React elements can use the `rectangle` tag to render rectangles in the canvas, which takes a `style` prop to customize the appearance and placement:

```js
<rectangle
  style={{
    top: 0, // top offset of the rectangle
    left: 0, // left offset of the rectangle
    height: 200, // height of the rectangle
    width: 200, // width of the rectangle
    padding: 10, // padding inside the rectangle
    backgroundColor: 'tomato', // fill color of the rectangle
    color: 'white', // color of the text
    fontSize: 14, // font size of the text in pixels
    fontFamily: 'Helvetica', // font family of the text
  }}
>
  Hello world
</rectangle>
```

To keep the implementation simple, the `rectangle` elements don't support nesting anything other than text.
