import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tempName: this.props.name
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
    this.nameInput && this.nameInput.focus();
  }
  
  onHeaderClicked = (e) => {
    this.setState({ edit: true, tempName: this.props.name });
  }

  onNameChange = (e) => {
    this.setState({ tempName: e.target.value });
  }

  onKeyPress = (e) => {
    if(this.state.edit) {
      switch(e.which) {
        case 13: 
          this.setState({ edit: false });
          this.props.onCardNameChanged(this.state.tempName);
          break;
        case 27:
          this.setState({ edit: false, tempName: this.props.name });
          break;
      }
    }
  }

  onMouseDown = (e) => {
    if(this.nameInput && !this.nameInput.contains(e.target))
      this.setState({ edit: false, tempName: this.props.name });
  }

  render() {
    const { edit, tempName } = this.state;
    const { name } = this.props;

    const headerComponent = edit ? 
      <input ref={(input) => { this.nameInput = input; }} type="text" className="card-header form-control" value={tempName} onClick={this.onHeaderClicked} onChange={this.onNameChange}/> :
      <h6 className="card-header" onClick={this.onHeaderClicked}>{name}</h6>;
    
    return (
      <div className="card group-card">
        {headerComponent}
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  onCardNameChanged: PropTypes.func.isRequired
};

Card.defaultProps = {
  name: 'Card'
};