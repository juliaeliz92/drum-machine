
import React from 'react';
import DrumPad from './DrumPad';
import Switch from './Switch';
import { bankOne, bankTwo, ON, OFF } from './../bankData';
import './../styles.scss';

const BANK1 = 'bank1';
const BANK2 = 'bank2';

export default class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankStatus: BANK1,
      powerStatus: ON
    }
  }
  
  componentDidMount() {
    this.addDrumPadListener();
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", () =>  console.log("remove event"));
  }
  
  addDrumPadListener = () => { 
    document.addEventListener("keydown", (e) => {
      const { powerStatus, bankStatus } = this.state;
      if(powerStatus === ON) {
        var bank = bankStatus === BANK1 ? bankOne : bankTwo;
        bank.forEach(item => {
          if(e.keyCode === item.keyCode) {   
            const vid =  document.getElementById(item.keyTrigger);
            if(vid !== null) {
              vid.src = item.url;
              vid.play();
              document.getElementById("display").innerHTML = item.id;
            }
          }
       });
      }
    });
  }
  
  updateBankStatus = (bankStatus) => {
    this.setState({
      bankStatus: bankStatus === ON ? BANK1 : BANK2
    });   
  }
  
  updatePowerStatus = (powerStatus) => {
    if(powerStatus === OFF) {
      document.getElementById("display").innerHTML = "";
    }
    this.setState({
      powerStatus
    });
  }
  
  setDrumVolume = (e) => {
    const volumeValue = parseFloat((parseFloat(e.target.value)/100).toFixed(1));
    document.querySelectorAll(".clip").forEach((item) => {
      item.volume = volumeValue;
    });  
  }
  
  render() {
    const { bankStatus, powerStatus } = this.state;
    let bank = bankStatus === BANK1 ? bankOne : bankTwo;
    return(
      <div id="drum-machine">
        <div id="drum-pad-container">
          {bank.map(item => {
            return (<DrumPad data={item} powerStatus={powerStatus}/>)
          })}
        </div>
        <div id="drum-settings">
          <div class="upper-body">
            <div class="power-container">
              <div className="power-header">
                Power <div className={`power-indicator ${powerStatus === ON ? 'power-on' : 'power-off'}`}></div>
              </div>
              <div className="switch-container">
                <Switch updateStatus={this.updatePowerStatus}/> 
              </div>
            </div>
            <div id="display">
            </div>
          </div>
          <div className="volume-container">
            Volume
            <div className="volume">
              - 
              <input 
                type="range"
                id="vol"
                min="0"
                max="100"
                onChange={this.setDrumVolume}
              />
              +
            </div>
          </div>
          <div class="bank-container">
            Bank
            <div className="switch-container">
              <Switch updateStatus={this.updateBankStatus}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
