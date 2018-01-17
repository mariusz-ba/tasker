import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions/authActions';

import { omitBy, isEmpty } from 'lodash';

// Components 
import SettingsTabs from '../components/settings/tabs/SettingsTabs';
import Password from '../components/settings/pages/Password';
import Profile from '../components/settings/pages/Profile'

class Settings extends Component {
  onSaveProfile = (user) => {
    user = {
      _id: this.props.auth.user._id,
      ...omitBy(user, isEmpty)
    }
    this.props.updateUser(user._id, user);
  }
  
  render() {
    console.log(this.props.auth.user);
    return (
      <div className="container">
        <header>&nbsp;</header>
        <div className="row">
          <div className="col">
            <div className="card settings">
              <SettingsTabs tabs={[
                { name: 'Edit Profile', component: <Profile onSave={(user) => this.onSaveProfile(user)} {...this.props.auth.user}/>},
                { name: 'Change Password', component: <Password onSave={(user) => this.onSaveProfile(user)} />}
              ]}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
};

export default connect(mapStateToProps, { updateUser })(Settings);