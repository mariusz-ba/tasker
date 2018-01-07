import React, { Component } from 'react';

export default class SettingsTab extends Component {
  render() {
    const active = this.props.active ? 'settings-active' : '';
    return (
      <li className={active} onClick={this.props.onClick}>
        { this.props.name }
      </li>
    )
  }
}