import React from 'react';
import { ON, OFF } from './../bankData';

export default class Switch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: ON
      }
    }
    
    clickSwitch = () => {
      this.setState((prevState) => ({
        status : prevState.status === OFF ? ON : OFF
      }), () => this.props.updateStatus(this.state.status));
    }
    
    render() {
      const { status } = this.state;
      return(
        <div class="switch" onClick={this.clickSwitch}>
          <div class={`panel ${status === ON ? 'panel-off' : 'panel-on'}`}>
          </div>
          <div class={`panel ${status === ON ? 'panel-on' : 'panel-off'}`}>
          </div>
        </div>
      );
    }
  }