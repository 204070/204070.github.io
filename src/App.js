import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ClockDate extends Component {
  render() {
    const now = this.props.time;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday', 'Sunday'
    ];

    const months = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 
        'September', 'October', 'November', 'December',
    ];

    const monthText = `${months[now.getMonth()]} ${now.getDate()}th,
${now.getFullYear()}`;

      return (
        <div id="clock-date-box">
            <span id="clock-day">{days[now.getDay() - 1]}</span>
            <span id="clock-date">{monthText}</span>
        </div>
    );
  
  }
}

class ClockTime extends Component {
  render() {
    const now = this.props.time;
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');

    return (
      <div id="clock-time">
      {`${hour} : ${min} : ${sec}`}
    </div>);
  }
}

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      now: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: new Date(),
    });
  }
  
  render() {
    return (
      <div id="clock">
            <div id="clock-box">
                <ClockTime time={this.state.now}/>
                <ClockDate time={this.state.now}/>
            </div>
        </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </div>
        <Clock />
        <div id="footer">
            <p>Digital Clock by @204070</p>
        </div>
      </div>
    );
  }
}

export default App;
