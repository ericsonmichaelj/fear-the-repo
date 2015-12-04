import React, { PropTypes } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';


export default class ResumeHeader extends React.Component {
  static propTypes = {
    // body: PropTypes.string
  }

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <Editor style={this.props.styles.name} text='Your name here' options={{toolbar: false}}/>
          <Editor style={this.props.styles.email} text='email@website.com'options={{toolbar: false}}/>
          <Editor style={this.props.styles.phone} text='123-456-7890' options={{toolbar: false}}/>
          <Editor style={this.props.styles.city} text='San Francisco, CA' options={{toolbar: false}}/>
          <Editor style={this.props.styles.url} text='linkedin.com/michaeljordan' options={{toolbar: false}}/>
          <Editor style={this.props.styles.url} text='github.com/number23' options={{toolbar: false}}/>
        </Paper>
      </div>
    );
  }
}

