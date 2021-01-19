import React from 'react';
import Figures from './Figures';

const playerOneColor = '#FF2D00';  // red
const playerTwoColor = '#001BFF';  // blue

// key: choice
// value: id
const circlesMap = {
  'rock': 'path850',
  'paper': 'path846',
  'scissors': 'path848',
  'lizard': 'path852',
  'spock': 'path829'
};

// key: <winner>,<loser>
// value: [action, arrow id]
const resolveMap = {
  'rock,lizard': ['crushes', 'path4741'],
  'lizard,spock': ['poisons', 'path4741-6'],
  'spock,scissors': ['smashes', 'path4741-6-4'],
  'scissors,paper': ['cuts', 'path4741-6-4-0'],
  'paper,rock': ['covers', 'path4741-6-4-0-1'],
  'paper,spock': ['disproves', 'rect4899'],
  'rock,scissors': ['crushes', 'rect4899-6'],
  'lizard,paper': ['eats', 'rect4899-6-1'],
  'spock,rock': ['vaporizes', 'rect4899-6-1-8'],
  'scissors,lizard': ['decapitates', 'rect4899-6-1-8-6']
};
class Board extends React.Component {
  componentDidUpdate() {
    if (this.props.p1Choice && this.props.p2Choice) {
      this.rpsls();
    }
  }

  rpsls = () => {
    var playerOneChoice = this.props.p1Choice,
        playerTwoChoice = this.props.p2Choice,
        test1 = playerOneChoice + ',' + playerTwoChoice,
        test2 = playerTwoChoice + ',' + playerOneChoice,
        winnerKey = '',
        winnerColor = '#000',
        txt = ''

    if (playerOneChoice === playerTwoChoice) {
        txt = 'DRAW';
    } else {
        // winner
        if (test1 in resolveMap) {
            winnerKey = test1; winnerColor = playerOneColor;
        }
        else{
            if (test2 in resolveMap) {
                winnerKey = test2; winnerColor = playerTwoColor;       
            }
        }

        // color player one choice
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          circlesMap[playerOneChoice]).style.stroke = playerOneColor;
        // color player two choice
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          circlesMap[playerTwoChoice]).style.stroke = playerTwoColor;
        // color arrow
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          resolveMap[winnerKey][1]).style.stroke = winnerColor;
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          resolveMap[winnerKey]).style.fill = winnerColor;
        txt = winnerKey.replace(",", " " + resolveMap[winnerKey][0] + " ");
    }

    // text and victory color
    document.getElementById('rpsls-text').style.color = winnerColor;
    document.getElementById('rpsls-text').innerHTML = txt;
  }

  renderFigures(i) {
    return (
      <Figures />
    );
  }

  render() {
    return <div><Figures /><p id="rpsls-text"></p></div>;
  }
}

export default Board;
