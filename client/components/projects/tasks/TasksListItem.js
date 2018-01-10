import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prettyDate } from '../../../utils/date';

export default class TasksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tempDescription: this.props.description
    }
  }

  componentDidMount() { 
    document.addEventListener('keyup', this.onKeyPress);
    document.addEventListener('mousedown', this.onMouseDown);
  }
  
  componentWillUnmount() { 
    document.removeEventListener('keyup', this.onKeyPress);
    document.removeEventListener('mousedown', this.onMouseDown);
  }
  
  componentDidUpdate() {
    this.descriptionInput && this.descriptionInput.focus();
  }

  onCheckboxChanged = (e) => {
    const { onTaskToggled } = this.props;
    onTaskToggled(e.target.checked);
  }
  
  onDescriptionChange = (e) => {
    this.setState({ tempDescription: e.target.value });
  }
  
  onEditClicked = () => {
    this.setState({ edit: true, tempDescription: this.props.description });
  }

  onDeleteClicked = () => {
    this.props.onDeleteClicked();
  }

  onDescriptionClicked = (e) => {
    this.props.onDescriptionClicked();
  }

  onKeyPress = (e) => {
    if(this.state.edit) {
      switch(e.which) {
        case 13: 
          this.setState({ edit: false });
          this.props.onDescriptionChanged(this.state.tempDescription);
          break;
        case 27:
          this.setState({ edit: false, tempDescription: this.props.description });
          break;
      }
    }
  }

  onMouseDown = (e) => {
    if(this.descriptionInput && !this.descriptionInput.contains(e.target))
      this.setState({ edit: false, tempDescription: this.props.name });
  }

  render() {
    const { edit, tempDescription } = this.state;
    const { description, completed, comments } = this.props;

    const checked = completed ? 'checked' : '';
    const lastComment = comments.sort((lhs, rhs) => lhs.updatedAt > rhs.updatedAt)[comments.length - 1];

    const descriptionComponent = edit ?
      <input ref={(input) => {this.descriptionInput = input}} type="text" className="form-control" value={tempDescription} onChange={this.onDescriptionChange}/> :
      <div>
        <input type="checkbox" onChange={this.onCheckboxChanged} checked={checked}/>
        <span className="tasks-list-item-description" onClick={this.onDescriptionClicked}>{description}</span>
        { comments.length > 0 &&
          <span className="badge badge-secondary"><i className="fa fa-comment-o" aria-hidden="true"></i> {comments.length} Comments - {prettyDate(new Date(lastComment.updatedAt))}</span>
        }
        <button className="btn btn-sm btn-danger pull-right" style={{marginLeft: 5}} onClick={this.onDeleteClicked}>Delete</button>
        <button className="btn btn-sm btn-light pull-right" onClick={this.onEditClicked}>Edit</button>
      </div>

    return (
      <div className="task-row">
        {descriptionComponent}
      </div>
    )
  }
}

TasksListItem.propTypes = {
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  onTaskToggled: PropTypes.func.isRequired,
  onDescriptionChanged: PropTypes.func.isRequired,
  onDescriptionClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func.isRequired
};

TasksListItem.defaultProps = {
  description: 'Task description',
  completed: false,
  comments: []
};