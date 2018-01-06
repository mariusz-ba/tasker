import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { image, primaryText, secondaryText } = this.props;

    return (
      <div className="card card-clickable" onClick={this.props.onClick}>
        <div className="card-block">
          <img className="card-img" src={image} alt={image}/>
          <h6 className="card-title">{primaryText}</h6>
          <p className="card-text text-muted">{secondaryText}</p>

          {this.props.children}
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  image: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  onClick: PropTypes.func
};