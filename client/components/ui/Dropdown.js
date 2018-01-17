import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      width: 0
    }
  }

  componentDidMount() {
    this.setState({ width: ReactDOM.findDOMNode(this.dropdownToggle).getBoundingClientRect().width });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if(this.dropdownMenu && !this.dropdownMenu.contains(e.target) && !this.dropdownToggle.contains(e.target) && this.state.open)
      this.toggleOpen();
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  onActionClicked = (e, action) => {
    e.preventDefault();
    action();
    this.toggleOpen();
  }

  render() {
    const { label, options, className } = this.props;
    const { open, width } = this.state;

    return (
      <div className="dropdown">
        <button 
          ref={(element) => {this.dropdownToggle = element}} 
          className={`dropdown-toggle ${className}`} 
          onClick={this.toggleOpen}>
          {label}
        </button>
        <div
          ref={(element) => {this.dropdownMenu = element}}
          className="dropdown-menu" 
          style={ open ? {display: 'block', width } : {display: 'none'}}>
          {
            options.map((option, index, array) => {
              switch(option.type) {
                case 'header':    return <a className="dropdown-item" href="#">{option.label}</a>;
                case 'separator': return <div className="dropdown-divider"></div>;
                case 'group': {
                  return (
                    <div key={index}>
                      <h6 className="dropdown-header">{option.label}</h6>
                      { 
                        option.items.map((item, index) => (
                          <a key={index} className="dropdown-item" href="#" onClick={(e) => this.onActionClicked(e, item.action)}>{item.label}</a>
                        )) 
                      }
                      { index !== array.length - 1 &&
                        <div className="dropdown-divider"></div>
                      }
                    </div>
                  );
                }
                case undefined: return <a key={index} className="dropdown-item" href="#" onClick={(e) => this.onActionClicked(e, option.action)}>{option.label}</a>;
              }
            })
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};