import React, { PropTypes }       from 'react';
import Paper                      from 'material-ui/lib/paper';
import { DragSource, DropTarget } from 'react-dnd';
import { saveResume }             from 'actions/resumeActions';
import { bindActionCreators }     from 'redux';
import { connect }                from 'react-redux';
import Editor from 'react-medium-editor';

const blockSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findBlock(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveBlock(droppedId, originalIndex);
    }
  }
};

const blockTarget = {
  drop(props) {
    // Simply return an object to make certain props available to the bullet being dropped on it via monitor.getDropResult. See ResumeView's blockTarget for the dispatching of that action.
    console.log('props: ', props)
    return {
      body: props.body,
      blockId: props.blockId
    };
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (monitor.getItemType() === 'block') {
      // This is responsible for reordering the blocks when a block is dragged around the list of blocks
      if (draggedId !== overId) {
        const { index: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      } // ONLY HERE does body re-render, when a block is sorted
    } else if (monitor.getItemType() === 'bullet') {

      // Still TODO: signal to user that it's ok to drop
        // low priority
        // highlight/outline block?
    }
  }
};

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

const ActionCreators = {
  saveResume: saveResume
};

const mapStateToProps = (state) => ({
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

@DropTarget([Types.BLOCK, Types.BULLET], blockTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(Types.BLOCK, blockSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export class Block extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    blockId: PropTypes.any.isRequired,
    moveBlock: PropTypes.func.isRequired,
    findBlock: PropTypes.func.isRequired,
    // coming from ResumeView.js (parent component) thru props
    companyName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    bulletChildren: PropTypes.array.isRequired,
    hasBullets: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    const { children, isDragging, connectDragSource, connectDropTarget } = this.props;

    const styles = {
      blockDrag: {
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
        margin: '0px'
      },
      jobTitle: {
        display: 'inline',
        margin: '10px',
        fontWeight: '700',
        fontSize: '18px'
      },
      pipe: {
        display: 'inline',
        margin: '5px'
      },
      companyName: {
        display: 'inline',
        margin: '10px',
        fontWeight: '500',
        fontSize: '16px'
      },
      location: {
        display: 'inline',
        margin: '10px'
      },
      year: {
        display: 'inline',
        float: 'right',
        marginRight: '10px'
      },
      bullet: {
        fontSize: '14px'
      }
    };

    let bullet;
      bullet = (
        <ul>
          {this.props.children.map(item =>
            // <li style={styles.bullet} key=>{item}</li>
            <li key={item.bulletId}>{item.text}</li>  // this is block id
              // how do I get bullet id?
              // throws console error, but still behaves as it should
          )}
        </ul>
      );

    return connectDragSource(connectDropTarget(
      <div style={styles.blockDrag}>
        <Paper zDepth={1}>
          <div style={styles.jobTitle} {this.props.jobTitle} options={{toolbar: false}}/>
          <div style={styles.pipe}>
            |
          </div>
          <Editor style={styles.companyName} text={this.props.companyName} options={{toolbar: false}}/>
          <div style={styles.pipe}>
            |
          </div>
          <Editor style={styles.location} text={this.props.location} onBlur={e => this.handleChange(e) } options={{toolbar: false}}/>
          <Editor style={styles.year} text={this.props.year} options={{toolbar: false}}/>
          <div>
            {bullet}
          </div>
        </Paper>
      </div>
    ));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);

/*

Still TODO
 - render bullets in blocks immediately upon drop
    - right now only happens on block drop
 - enable dnd for bullets within blocks
 - edit blocks/bullets directly
    - on double click?

 - save resume: new obj in state with props of header, body ([] of blocks of [] of bullets)

*/
