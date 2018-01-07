import React, { Component } from 'react';

import SettingsTab from './SettingsTab';

export default class SettingsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }
  openTab = (index) => {
    console.log('opening tab: ', index);
    this.setState({ current: index });
  }
  render() {
    const { tabs } = this.props;

    return (
      <div className="row">
        <ul className="settings-tabs col-md-4">
          { tabs &&
            tabs.map((tab, index) => (
              <SettingsTab
                key={index} 
                name={tab.name} 
                active={index === this.state.current} 
                onClick={() => this.openTab(index)}/>
            ))
          }
        </ul>
        <div className="settings-content col-md-8">
          { 
            tabs[this.state.current].component
          }
        </div>
      </div>
    )
  }
}