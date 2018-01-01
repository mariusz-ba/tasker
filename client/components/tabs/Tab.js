import React, { Component } from 'react';

export default class Tab extends Component {
  render() {
    const { name, active } = this.props;
    const activeClass = active ? 'active' : '';

    return (
      <li className="nav-item ">
        <a className={"nav-link " + activeClass} href="#" onClick={this.props.onClick}>{name}</a>
      </li>
    )
  }
}