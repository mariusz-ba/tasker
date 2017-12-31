import React, { Component } from 'react';
import { connect } from 'react-redux';

class Team extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <h1>Displaying information about team with id: {id}</h1>
      </div>
    )
  }
}

function mapStateToProps({ teams }) {
  return { teams }
};

export default connect(mapStateToProps)(Team);