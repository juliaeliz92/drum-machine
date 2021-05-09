import React from 'react';
import { ON } from './../bankData';

export default class DrumPad extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        string: this.props.data.id,
        url: this.props.data.url,
        label: this.props.data.keyTrigger,
        keyCode: this.props.data.keyCode,
        powerStatus: this.props.powerStatus
      }
    }
    
    componentWillReceiveProps(nextProps) {
      this.setState({ 
        string: nextProps.data.id,
        url: nextProps.data.url,
        label: nextProps.data.keyTrigger,
        keyCode: nextProps.data.keyCode,
        powerStatus: nextProps.powerStatus
      });    
    }
    
    playAudio = () => {
      const { powerStatus, string, url, label } = this.state;
      if(powerStatus === ON) {
         const vid = document.getElementById(label);
         vid.src = url;
         vid.play();
         document.getElementById("display").innerHTML = string;
      }
    } 
    
    render() {
      const { label, string, url } = this.state;
      return(
        <div
          class="drum-pad"
          onClick={this.playAudio}
          id={`pad-${string}`}
         >
          {label}
          <audio id={label} className="clip" src={url} type="audio/mpeg" />
        </div>
      );
    }
  }