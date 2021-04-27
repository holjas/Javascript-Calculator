import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false, //captures the amount when equal is used
      display: [], //what displays on the screen
      decimal: false, //looks for duplicate decimals
    };
    this.handleChange = this.handleChange.bind(this);
    this.displayInput = this.displayInput.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.doMath = this.doMath.bind(this);
    this.checkOperator = this.checkOperator.bind(this);
  }

  handleChange(value, type) {
    if (type === "action") {
      //keeps the display value in play after equals is used.
      if (this.state.result === true) {
        this.setState({
          display: [this.state.display],
          result: false,
        });
      }
      this.checkOperator(value);
      this.setState({ decimal: false });
    }

    if (type === "number") {
      if (this.state.display[0] === 0) {
        console.log("Numbers cannot be zero");
        this.setState({ display: [] });
      } else {
        this.displayInput(value);
      }
    }

    if (type === "decimal") {
      if (this.state.decimal === false) {
        this.displayInput(value);
        this.setState({ decimal: true });
      } else {
        console.log("You already entered a decimal");
      }
    }

    if (type === "equals") {
      this.doMath();
      console.log(this.state.display);
    }
  }
  checkOperator(value) {
    this.displayInput(value);

    const w = this.state.display[this.state.display.length - 1];
    const x = this.state.display[this.state.display.length - 2];
    const y = this.state.display.length - 1;
    const z = this.state.display.length - 2;

    if (
      (value === "+" || value === "*" || value === "/") &&
      (w === "+" || w === "*" || w === "/")
    ) {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, y).concat(value),
      }));
    } else if (
      (value === "+" || value === "*" || value === "/") &&
      (x === "+" || x === "*" || x === "/" || x === "-") &&
      typeof w !== "number"
    ) {
      this.setState((prevState) => ({
        display: prevState.display.slice(0, z).concat(value),
      }));
    }
  }

  doMath() {
    let displayResult;
    let answer = eval(this.state.display.join(""));

    if (answer === false) {
      displayResult = 0;
    } else if (answer % 1 !== 0) {
      displayResult = parseFloat(answer.toFixed(4));
    } else {
      displayResult = answer;
    }
    this.setState({
      display: displayResult,
      decimal: false,
      result: true,
    });
  }

  // pushes value into display state
  displayInput(value) {
    this.setState((prevState) => ({
      display: [...prevState.display, value],
    }));
  }

  // console.log the states with the C button
  clearScreen() {
    this.setState({ result: false, display: [], decimal: false });
  }

  render() {
    return (
      <>
        <>
          <div className="container">
            {/* title row */}
            <div className="row" id="">
              <div className="col text-center">
                <h1 className="display-4">Javascript Calculator</h1>
              </div>
            </div>
            {/* title row end*/}
            {/* display start*/}
            <div className="row justify-content-center mt-5">
              <div
                className="col-sm-9 col-md-7 col-lg-5 col-xl-4 text-center"
                id="display"
              >
                <h3 className="display-4 bg-light border rounded">
                  {this.state.display.length === 0 ? 0 : this.state.display}
                  {/* keeps this display at 0, until state.display is filled */}
                </h3>
              </div>
            </div>
            {/* display end*/}
            {/* Number pad start*/}
            <div className="row justify-content-center mb-5">
              <div className="col-sm-9 col-md-7 col-lg-5 col-xl-4">
                <KeyPad onClick={this.handleChange} />
                <div
                  id="clear"
                  className="clear-display btn btn-outline-dark bg-warning col-12 p-4"
                  onClick={this.clearScreen}
                >
                  C
                </div>
              </div>
            </div>
            {/* Number pad end*/}
          </div>
        </>
      </>
    );
  }
}

class KeyPad extends React.Component {
  render() {
    return (
      <>
        {numberpad.map((item, index) => (
          <div
            className="btn btn-outline-dark col-sm-3 p-3"
            key={index}
            id={item.id}
            onClick={() => this.props.onClick(item.value, item.type)}
          >
            {item.value}
          </div>
        ))}
      </>
    );
  }
}

const numberpad = [
  { value: 7, type: "number", id: "seven" },
  { value: 8, type: "number", id: "eight" },
  { value: 9, type: "number", id: "nine" },
  { value: "/", type: "action", id: "divide" },
  { value: 4, type: "number", id: "four" },
  { value: 5, type: "number", id: "five" },
  { value: 6, type: "number", id: "six" },
  { value: "*", type: "action", id: "multiply" },
  { value: 1, type: "number", id: "one" },
  { value: 2, type: "number", id: "two" },
  { value: 3, type: "number", id: "three" },
  { value: "-", type: "action", id: "subtract" },
  { value: 0, type: "number", id: "zero" },
  { value: ".", type: "decimal", id: "decimal" },
  { value: "=", type: "equals", id: "equals" },
  { value: "+", type: "action", id: "add" },
];

export default App;
