import React, { Component } from 'react';

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: ''
    }
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onChangeConfirm = (e) => {
    this.setState({ confirm: e.target.value });
  }

  onUpdate = (e) => {
    e.preventDefault();
    if(this.state.password === this.state.confirm)
      this.props.onSave(this.state);
  }

  render() {
    const { password, confirm } = this.state;
    const isValidPassword = password === confirm ? '' : 'is-invalid';
    const buttonDisabled = password === confirm ? '' : 'disabled';
    return (
      <div>
        <div className="settings-header">
          <h5>Change password</h5>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            type="password"
            value={password}
            onChange={this.onChangePassword}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            className={`form-control ${isValidPassword}`}
            type="password"
            value={confirm}
            onChange={this.onChangeConfirm}/>
          { password !== confirm ? <div className="invalid-feedback">Incorrect password</div> : null }
        </div>
        <div className="text-center">
          <button className={`btn btn-sm btn-primary ${buttonDisabled}`} onClick={this.onUpdate}>Save</button>
        </div>
      </div>
    )
  }
}