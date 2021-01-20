import React from 'react';
import Figures from './Figures';

const defaultColor = '#000',
    playerOneColor = '#FF2D00',  // red
    playerTwoColor = '#001BFF',  // blue
    circlesMap = {
        'rock': 'path850',
        'paper': 'path846',
        'scissors': 'path848',
        'lizard': 'path852',
        'spock': 'path829'
    },
    resolveMap = {
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
    
    //  this.rpsls();
  }

  getFinalData = () => {
    if (this.props.p1Choice && this.props.p2Choice) {
      var playerOneChoice = this.props.p1Choice,
        playerTwoChoice = this.props.p2Choice,
        p1Circle = '',
        p2Circle = '',
        test1 = playerOneChoice + ',' + playerTwoChoice,
        test2 = playerTwoChoice + ',' + playerOneChoice,
        winnerKey = '',
        winnerColor = '#000',
        wArrow = '',
        txt = '';

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
          p1Circle = circlesMap[playerOneChoice];
          p2Circle = circlesMap[playerTwoChoice];
          txt = winnerKey.replace(",", " " + resolveMap[winnerKey][0] + " ");
          wArrow = resolveMap[winnerKey][1]
        }
    }
    return [winnerKey, winnerColor, txt, p1Circle, p2Circle, wArrow];
  }
  /*
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
  }*/

  renderFigures() {
    let wKey, wColor, wText, p1Circle, p2Circle, wArrow = this.getFinalData();
    return (
      <Figures
        defaultColor={defaultColor}
        p1Choice={this.props.p1Choice}
        p1Circle={p1Circle}
        p1Color={playerOneColor}
        p2Choice={this.props.p2Choice}
        p2Circle={p2Circle}
        p2Color={playerTwoColor}
        wKey={wKey}
        wColor={wColor}
        wText={wText}
        wArrow={wArrow}
      />
    );
  }

  render() {
    return <div>{this.renderFigures()}<p className="rpsls-text" style={{color: this.getFinalData()[1]}}>{this.getFinalData()[2]}</p></div>;
  }
}

export default Board;
