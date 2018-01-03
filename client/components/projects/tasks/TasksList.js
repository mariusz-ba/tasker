import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksList extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
