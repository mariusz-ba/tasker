import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const { image, primaryText, secondaryText } = this.props;

    return (
      <div className="card">
        <img className="card-img-top" src={image} alt={image}/>
        <div className="card-block">
          <h4 className="card-title">{primaryText}</h4>
          <p className="card-text">{secondaryText}</p>

          {this.props.children}
        </div>
      </div>
    )
  }
}