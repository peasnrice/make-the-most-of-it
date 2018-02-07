import React from 'react';
import Moment from 'react-moment';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './index.css';

var moment = require('moment');

function Square(props) {
    if (props.value === "X") {
      return (
        <button className="circle passed" onClick={props.onClick}>
        </button>
      ); 
    } else {
      return (
        <button className="circle" onClick={props.onClick}>
        </button>
      );      
    }
}

class Board extends React.Component {
    constructor(props) {
    super(props);
    
    const today = new Date();
    const birthday_ = moment(today).subtract(20, "years");
    
    this.state = {
      squares: Array(5200).fill(null),
      xIsNext: true,
      today: moment(),
      birthday: moment(today).subtract(20, "years"),
      weeksAlive: moment(today).diff(birthday_, 'weeks'),
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const squares = this.state.squares;
    
    this.setState({
      startDate: date,
      weeksAlive: moment(this.state.today).diff(date, 'weeks'),
    });
  }

  createCalendar = () => {
    let table = []
    console.log(this.state.weeksAlive);
    // Outer loop to create parent
    for (let i = 0; i < 80; i++) {
      let childContent = []
      //Inner loop to create children
      for (let j = 0; j < 52; j++) {
        if (this.state.weeksAlive > i*52+j){
          childContent.push(<Square 
            value = "X"
            onClick={() => this.handleClick(i*52+j)}
          />)          
        } else {
          childContent.push(<Square 
            value = "O"
            onClick={() => this.handleClick(i*52+j)}
          />)            
        }
      }
      table.push(<div className="board-row">{childContent}</div>)
      //Create the parent and add the children
    }
    return table
  }
  
  handleClick(i) {
    const squares = this.state.squares;
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}  
      />
    );
  }

  render() {
    return (
      <div className="calendarView">
        <div className="calendarIntro">
          When were you born?
        <DatePicker className="calendarIntro"
          selected={moment(this.state.today).subtract(20, "years")}
          onChange={this.handleChange}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          minDate={moment().subtract(80*52, "weeks")}
          maxDate={moment()}
        />
        </div>
        <div className="calendarIntro">
          You have been alive for {this.state.weeksAlive} weeks. If you are expecting to live to 80 you have {80*52 - this.state.weeksAlive} to go...
        </div>
        <div className="calendarContentWrap">
          <div className="calendarContent">
            {this.createCalendar()}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;  
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
