import React, { Component } from 'react';
import Tab from './Tab';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }

  openTab(index) {
    console.log('Opening tab: ', index)
    this.setState({ current: index });
  }

  render() {
    const { tabs } = this.props;
    console.log(tabs);

    return (
      <div>
        <ul className="nav nav-tabs">
          {
            tabs.map((tab, index) => (
              <Tab
                key={index}
                name={tab.name}
                active={index == this.state.current}
                onClick={() => this.openTab(index)}
              />
            ))
          }
        </ul>
        {
          tabs[this.state.current].component
        }
      </div>
    )
  }
}