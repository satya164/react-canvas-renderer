/**
 * Private reconciler instance
 * It implements methods to create and update the tree
 *
 * @flow
 */

import shallowEqual from 'shallow-equal/objects';
import Reconciler from 'react-reconciler';
import Rectangle from './Rectangle';

const EMPTY_OBJECT = {};
const NOOP = () => {};

const CanvasRenderer = Reconciler({
  // Create an instance of our primitive components
  createInstance(type, props) {
    switch (type) {
      case 'rectangle':
        return new Rectangle(props);
      default:
        throw new Error(`Invalid component type: ${type}`);
    }
  },

  // Create a text node instance
  // We return plain text since we don't care about text nodes
  createTextInstance(text) {
    return text;
  },

  // Append new children for the first time
  appendInitialChild(parentInstance, child) {
    parentInstance.appendInitialChild(child);
  },

  // Called before flushing the initial tree to the host
  finalizeInitialChildren() {
    return false;
  },

  // Identity function in most scenarios, i.e. returns the same instance
  // Added to support the `getNodeMock` functionality for the TestRenderers
  getPublicInstance(instance) {
    return instance;
  },

  // Computes diff for the update
  // Fiber can reuse the diff even if it pauses or aborts rendering a subset of the tree
  // We don't care about the diff since we need to redraw everything
  prepareUpdate() {
    return EMPTY_OBJECT;
  },

  // Used to trigger global side-effects in the host environment
  // In ReactDOM this is used for things such as disabling the ReactDOM events to ensure no
  // callbacks are fired during DOM manipulations
  prepareForCommit: NOOP,
  resetAfterCommit: NOOP,

  // HostContext is an internal object for any bookkeeping the renderer may need to do
  // based on current location in the tree
  // In DOM this is necessary for calling the correct `document.createElement` calls
  // depending on being in an `html`, `svg`, `mathml`, or other context of the tree
  getRootHostContext()  {
    return EMPTY_OBJECT;
  },

  getChildHostContext() {
    return EMPTY_OBJECT;
  },

  // Whether to set the text content for text nodes
  // We don't implement this since we don't have text node instances
  shouldSetTextContent() {
    return false;
  },

  resetTextContent: NOOP,

  // Whether to schedule updates synchronously
  // This is removed in https://github.com/facebook/react/pull/11771
  useSyncScheduling: true,

  // Used by Fiber to keep track of start and expiration time
  now: () => performance.now(),

  mutation: {
    // Append child to the container instance
    appendChildToContainer(container, child) {
      container.appendChild(child);
    },

    // Append child to an element instance
    appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    },

    // Remove child from the container instance
    removeChildFromContainer(container, child) {
      container.removeChild(child);
    },

    // Remove child from an element instance
    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    // Insert child in the container instance
    insertInContainerBefore(container, child, childBefore) {
      container.insertBefore(child, childBefore);
    },

    // Insert child in an element instance
    insertBefore(parentInstance, child, childBefore) {
      parentInstance.insertBefore(child, childBefore);
    },

    // Commit the updates to an element
    // The diff calculated in `prepareUpdate` is received as the `updatePayload`
    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      if (!shallowEqual(oldProps, newProps)) {
        instance.replaceProps(newProps);
      }
    },

    // Commit the updates to text node
    commitTextUpdate: NOOP,

    // Called for initial render if `initializeFinalChildren` returns true.
    commitMount: NOOP,
  },
});

export default CanvasRenderer;
