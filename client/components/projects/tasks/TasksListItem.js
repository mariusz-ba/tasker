import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { _id, onTaskToggled } = this.props;
    onTaskToggled(_id, e.target.checked);
  }

  onDescriptionClicked = () => {
    this.setState({ edit: true, tempDescription: this.props.description });
  }

  onDescriptionChange = (e) => {
    this.setState({ tempDescription: e.target.value });
  }

  onKeyPress = (e) => {
    if(this.state.edit) {
      switch(e.which) {
        case 13: 
          this.setState({ edit: false });
          this.props.onTaskDescriptionChanged(this.props._id, this.state.tempDescription);
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
    const { description, completed } = this.props;

    const checked = completed ? 'checked' : '';

    const descriptionComponent = edit ?
      <input ref={(input) => {this.descriptionInput = input}} type="text" className="form-control" value={tempDescription} onChange={this.onDescriptionChange}/> :
      <div>
        <input type="checkbox" onChange={this.onCheckboxChanged} checked={checked}/>
        <span onClick={this.onDescriptionClicked}>{description}</span>
        <span className="badge badge-secondary"><i className="fa fa-comment-o" aria-hidden="true"></i> 16</span>
        <span className="badge badge-primary">Mariusz Baran - Sun, Jan 2</span>
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
  onTaskToggled: PropTypes.func.isRequired,
  onTaskDescriptionChanged: PropTypes.func.isRequired
};

TasksListItem.defaultProps = {
  description: 'Task description'
};