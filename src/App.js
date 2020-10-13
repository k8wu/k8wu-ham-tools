import React from 'react';
import './App.css';

// working data for the V=IR calculator
class VIR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voltage: '',
      current: '',
      resistance: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // if we ever have a checkbox implemented in the future...
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // check to see which, if any, of the values are not filled in properly (we need two)
    var numberOfValues = 0;
    var solveFor = '';
    var alertText = '';
    for(var propName in this.state) {
      // is the value filled in at all?
      if(!this.state[propName]) {
        solveFor = propName;
        alertText += 'Value ' + propName + ' is not filled in\n';
      }

      // is the value a valid floating point number (using absolute value is perfectly acceptable, since none of these numbers should ever be negative)
      else if(isNaN(Math.abs(this.state[propName]))) {
        alertText += 'Value ' + propName + ' is not a valid number\n';
      }

      // it's valid enough for us
      else {
        numberOfValues++;
      }
    }
    if(numberOfValues < 2) {
      alert('We need at least two values to compute. Here is what we are missing:\n' + alertText);
      return;
    }
    else if(numberOfValues === 3) {
      alert('We have all of the values. What are we supposed to compute?');
      return;
    }
    else {
      // which variable was missing?
      switch(solveFor) {
        case 'voltage':
          this.setState({
            voltage: Math.abs(this.state.current) * Math.abs(this.state.resistance)
          });
          break;

        case 'current':
          this.setState({
            current: Math.abs(this.state.voltage) / Math.abs(this.state.resistance)
          });
          break;

        case 'resistance':
          this.setState({
            resistance: Math.abs(this.state.voltage) / Math.abs(this.state.current)
          });
          break;

        default:
          break;
      }
    }
  }

  // render element
  render() {
    return(
      <>
        <h2>Voltage, Current, and Resistance</h2>
        <form className="form" name="vir-form" onSubmit={this.handleSubmit}>
          <label>Voltage: </label>
          <input className="number-input" name="voltage" type="text" value={this.state.voltage} onChange={this.handleInputChange} />
          <br />
          <label>Current: </label>
          <input className="number-input" name="current" type="text" value={this.state.current} onChange={this.handleInputChange} />
          <br />
          <label>Resistance: </label>
          <input className="number-input" name="resistance" type="text" value={this.state.resistance} onChange={this.handleInputChange} />
          <br />
          <input type="submit" value="submit" />
        </form>
        <div className="description">
          <p>V=IR, where</p>
          <ul>
            <li>V = voltage (in volts)</li>
            <li>I = current (in amperes)</li>
            <li>R = resistance (in ohms)</li>
          </ul>
        </div>
      </>
    );
  }
}

// working data for the P=IV calculator
class PIV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: '',
      current: '',
      voltage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // if we ever have a checkbox implemented in the future...
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // check to see which, if any, of the values are not filled in properly (we need two)
    var numberOfValues = 0;
    var solveFor = '';
    var alertText = '';
    for(var propName in this.state) {
      // is the value filled in at all?
      if(!this.state[propName]) {
        solveFor = propName;
        alertText += 'Value ' + propName + ' is not filled in\n';
      }

      // is the value a valid floating point number (using absolute value is perfectly acceptable, since none of these numbers should ever be negative)
      else if(isNaN(Math.abs(this.state[propName]))) {
        alertText += 'Value ' + propName + ' is not a valid number\n';
      }

      // it's valid enough for us
      else {
        numberOfValues++;
      }
    }
    if(numberOfValues < 2) {
      alert('We need at least two values to compute. Here is what we are missing:\n' + alertText);
      return;
    }
    else if(numberOfValues === 3) {
      alert('We have all of the values. What are we supposed to compute?');
      return;
    }
    else {
      // which variable was missing?
      switch(solveFor) {
        case 'power':
          this.setState({
            power: Math.abs(this.state.current) * Math.abs(this.state.voltage)
          });
          break;

        case 'current':
          this.setState({
            current: Math.abs(this.state.power) / Math.abs(this.state.voltage)
          });
          break;

        case 'voltage':
          this.setState({
            voltage: Math.abs(this.state.power) / Math.abs(this.state.current)
          });
          break;

        default:
          break;
      }
    }
  }

  // render element
  render() {
    return(
      <>
        <h2>Power, Current, and Voltage</h2>
        <form className="form" name="piv-form" onSubmit={this.handleSubmit}>
          <label>Power: </label>
          <input className="number-input" name="power" type="text" value={this.state.power} onChange={this.handleInputChange} />
          <br />
          <label>Current: </label>
          <input className="number-input" name="current" type="text" value={this.state.current} onChange={this.handleInputChange} />
          <br />
          <label>Voltage: </label>
          <input className="number-input" name="voltage" type="text" value={this.state.voltage} onChange={this.handleInputChange} />
          <br />
          <input type="submit" value="submit" />
        </form>
        <div className="description">
          <p>P=IV, where</p>
          <ul>
            <li>P = power (in watts)</li>
            <li>I = current (in amperes)</li>
            <li>V = voltage (in volts)</li>
          </ul>
        </div>
      </>
    );
  }
}

// calculator container
class Calculator extends React.Component {
  render() {
    switch(this.props.type) {
      case 'VIR':
        return(
          <VIR />
        );

      case 'PIV':
        return(
          <PIV />
        );

      default:
        return(
          <div class="error">You must select a valid calculator</div>
        );
    }
  }
}

function App() {
  return(
    <div className="App">
      <header className="App-header">
        <h1>K8WU Ham Radio Tools</h1>
        <p>This is a work in progress. More calculators and other fun stuff will be added.</p>
      </header>
      <div class="calculator-container vir">
        <Calculator type="VIR" />
      </div>
      <div class="calculator-container piv">
        <Calculator type="PIV" />
      </div>
      <footer>
        <p>&copy; Mike Phipps, K8WU (<a href="https://qrz.com/db/k8wu">Find me on QRZ.com</a>)</p>
      </footer>
    </div>
  );
}

export default App;
