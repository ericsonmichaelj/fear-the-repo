import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Editor from 'react-medium-editor';
import Radium from 'radium';


const Types = {
  BULLET: 'bullet',
  BLOCK: 'block'
};

// This is our specification object, which will be passed into DropSource below. It describes how the drag source reacts to the drag and drop events
const bulletSource = {
  // When dragging starts, beginDrag is called
  // What's returned is the only information available to the drop targets
    // should be the minimum amount of info, which is why why return just the ID and not the entire object

  beginDrag(props, monitor, component) {
    // Store the ID of the parent block of the dragged bullet
    const parentBlockId = component.props.parentBlockId;
    // Get the index of the parent block
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    return {
      bulletId: props.bulletId,
      parentBlockId: parentBlockId,
      parentBlockIndex: parentBlockIndex,
      originalIndex: props.findBullet(props.bulletId, parentBlockIndex).index,
      text: props.text
    };
  },

  // When dragging stops, endDrag is called
  endDrag(props, monitor) {
    // Monitors allow you to get info about the drag state
    // getItem() returns a plain obj representing the currently dragged item, specified in the return statement of its beginDrag() method
    const { bulletId: droppedId, originalIndex } = monitor.getItem();
    // Check whether or not the drop was handled by a compatible drop target
    const didDrop = monitor.didDrop();

    // If not, return the bullet to the original position
    if (!didDrop) {
      props.moveBullet(droppedId, originalIndex);
    }
  },

  isDragging(props, monitor) {
    // Our bullet gets unmounted while dragged, so this keeps its appearance dragged
    return props.bulletId === monitor.getItem().bulletId;
  }
};

const bulletTarget = {
  hover(props, monitor) {
    const { bulletId: draggedId } = monitor.getItem();
    const { bulletId: overId, parentBlockId: parentBlockId } = props;
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    if (monitor.getItemType() !== 'block') {
      if (monitor.getItem().parentBlockId === props.parentBlockId) {
        if (draggedId !== overId) {
          const { bulletIndex: overIndex } = props.findBullet(overId, parentBlockIndex);
          props.moveBullet(draggedId, overIndex, parentBlockId);
        }
      }
    }
  }
};

@DropTarget([Types.BULLET, Types.BLOCK], bulletTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
// DragSource takes 3 parameters:
  // type [string]: only the drop targets registered for the same type will react to items produced by this drag source
  // spec [obj]: implements drag source specs (beginDrag, endDrag, etc)
  // collect: aka the collecting function. Returns an obj of the props to inject into our component
@DragSource(Types.BULLET, bulletSource, (connect, monitor) => ({
  // The 'collecting function' will be called by React DnD with a 'connector' that lets you connect nodes to the DnD backend, and a 'monitor' to query info about the drag state
  connectDragSource: connect.dragSource(),  // This gives our component the connectDragSource prop so we can mark the relevant node inside its render() as draggable
  isDragging: monitor.isDragging()
}))

@Radium
export default class Bullet extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    bulletId: PropTypes.any.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    findBullet: PropTypes.func.isRequired,
    handleUpdateLocalState: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveBullet: PropTypes.func.isRequired,
    parentBlockId: PropTypes.any.isRequired,
    styles: PropTypes.object,
    text: PropTypes.string.isRequired
  };

  hideBullet(event, target) {
    this.props.actions.hideBullet(target);
  }

  render() {
    const { bulletId,
            connectDragSource,
            connectDropTarget,
            isDragging,
            parentBlockId,
            styles } = this.props;

    const bulletDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'default',
      width: '100%',
      ':hover': {}
    };

    return connectDragSource(connectDropTarget(
      <div style={bulletDrag} key='bullet'>

        <Editor style={styles.editorField}
                text={this.props.text || '[new bullet point]'}
                options={{ toolbar: false }}
                onBlur={e => this.props.handleUpdateLocalState(e, 'text', 'bullets', bulletId, parentBlockId)} />


        {Radium.getState(this.state, 'bullet', ':hover') ? (
<<<<<<< HEAD
        <img src={require('styles/assets/ic_remove_circle_outline_black_24px.svg')}
             onClick={e => this.hideBullet(e, this.props.bulletId)} />
=======
        <img src='styles/assets/ic_remove_circle_outline_black_24px.svg'
             onClick={e => this.hideBullet(e, bulletId)} />
>>>>>>> 570fa831fb3e2affa75f8c75732e931ae4fcaf8f
          ) : null}

        {Radium.getState(this.state, 'bullet', ':hover') ? (
        <img src={require('styles/assets/drag-vertical.png')} style={styles.handle} />
          ) : null}

      </div>
    ));
  }
}
import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Editor from 'react-medium-editor';
import Radium from 'radium';


const Types = {
  BULLET: 'bullet',
  BLOCK: 'block'
};

// This is our specification object, which will be passed into DropSource below. It describes how the drag source reacts to the drag and drop events
const bulletSource = {
  // When dragging starts, beginDrag is called
  // What's returned is the only information available to the drop targets
    // should be the minimum amount of info, which is why why return just the ID and not the entire object

  beginDrag(props, monitor, component) {
    // Store the ID of the parent block of the dragged bullet
    const parentBlockId = component.props.parentBlockId;
    // Get the index of the parent block
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    return {
      bulletId: props.bulletId,
      parentBlockId: parentBlockId,
      parentBlockIndex: parentBlockIndex,
      originalIndex: props.findBullet(props.bulletId, parentBlockIndex).index,
      text: props.text
    };
  },

  // When dragging stops, endDrag is called
  endDrag(props, monitor) {
    // Monitors allow you to get info about the drag state
    // getItem() returns a plain obj representing the currently dragged item, specified in the return statement of its beginDrag() method
    const { bulletId: droppedId, originalIndex } = monitor.getItem();
    // Check whether or not the drop was handled by a compatible drop target
    const didDrop = monitor.didDrop();

    // If not, return the bullet to the original position
    if (!didDrop) {
      props.moveBullet(droppedId, originalIndex);
    }
  },

  isDragging(props, monitor) {
    // Our bullet gets unmounted while dragged, so this keeps its appearance dragged
    return props.bulletId === monitor.getItem().bulletId;
  }
};

const bulletTarget = {
  hover(props, monitor) {
    const { bulletId: draggedId } = monitor.getItem();
    const { bulletId: overId, parentBlockId: parentBlockId } = props;
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    if (monitor.getItemType() !== 'block') {
      if (monitor.getItem().parentBlockId === props.parentBlockId) {
        if (draggedId !== overId) {
          const { bulletIndex: overIndex } = props.findBullet(overId, parentBlockIndex);
          props.moveBullet(draggedId, overIndex, parentBlockId);
        }
      }
    }
  }
};

@DropTarget([Types.BULLET, Types.BLOCK], bulletTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
// DragSource takes 3 parameters:
  // type [string]: only the drop targets registered for the same type will react to items produced by this drag source
  // spec [obj]: implements drag source specs (beginDrag, endDrag, etc)
  // collect: aka the collecting function. Returns an obj of the props to inject into our component
@DragSource(Types.BULLET, bulletSource, (connect, monitor) => ({
  // The 'collecting function' will be called by React DnD with a 'connector' that lets you connect nodes to the DnD backend, and a 'monitor' to query info about the drag state
  connectDragSource: connect.dragSource(),  // This gives our component the connectDragSource prop so we can mark the relevant node inside its render() as draggable
  isDragging: monitor.isDragging()
}))

@Radium
export default class Bullet extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    bulletId: PropTypes.any.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    findBullet: PropTypes.func.isRequired,
    handleUpdateLocalState: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveBullet: PropTypes.func.isRequired,
    parentBlockId: PropTypes.any.isRequired,
    styles: PropTypes.object,
    text: PropTypes.string.isRequired
  };

  hideBullet(event, target) {
    this.props.actions.hideBullet(target);
  }

  render() {
    const { bulletId,
            connectDragSource,
            connectDropTarget,
            isDragging,
            parentBlockId,
            styles } = this.props;

    const bulletDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'default',
      width: '100%',
      ':hover': {}
    };

    return connectDragSource(connectDropTarget(
      <div style={bulletDrag} key='bullet'>

        <Editor style={styles.editorField}
                text={this.props.text || '[new bullet point]'}
                options={{ toolbar: false }}
                onBlur={e => this.props.handleUpdateLocalState(e, 'text', 'bullets', bulletId, parentBlockId)} />


        {Radium.getState(this.state, 'bullet', ':hover') ? (
        <img src='styles/assets/ic_remove_circle_outline_black_24px.svg'
             onClick={e => this.hideBullet(e, bulletId)} />
          ) : null}

        {Radium.getState(this.state, 'bullet', ':hover') ? (
        <img src='styles/assets/drag-vertical.png' style={styles.handle} />
          ) : null}

      </div>
    ));
  }
}
