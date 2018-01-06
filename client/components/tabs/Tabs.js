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
    this.setState({ current: index });
  }

  render() {
    const { tabs } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs card-header-tabs profile-tabs justify-content-center">
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
        <div className="row">
        {
          tabs[this.state.current].component
        }
        </div>
      </div>
      // <div className="card">
      //   <div className="card-header">
      //     <ul className="nav nav-tabs card-header-tabs">
      //       {
      //         tabs.map((tab, index) => (
      //           <Tab
      //             key={index}
      //             name={tab.name}
      //             active={index == this.state.current}
      //             onClick={() => this.openTab(index)}
      //           />
      //         ))
      //       }
      //     </ul>
      //   </div>
      //   <div className="card-body">
      //     <div className="row">
      //     {
      //       tabs[this.state.current].component
      //     }
      //     </div>
      //   </div>
      // </div>
    )
  }
}