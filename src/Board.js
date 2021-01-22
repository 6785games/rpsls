import React from 'react';
import Figures from './Figures';

const defaultColor = '#000',
    playerOneColor = '#FF2D00',  // red
    playerTwoColor = '#001BFF',  // blue
    circlesMap = {
        'rock': '#path850',
        'paper': '#path846',
        'scissors': '#path848',
        'lizard': '#path852',
        'spock': '#path829'
    },
    resolveMap = {
        'rock,lizard': ['crushes', '#path4741'],
        'lizard,spock': ['poisons', '#path4741-6'],
        'spock,scissors': ['smashes', '#path4741-6-4'],
        'scissors,paper': ['cuts', '#path4741-6-4-0'],
        'paper,rock': ['covers', '#path4741-6-4-0-1'],
        'paper,spock': ['disproves', '#rect4899'],
        'rock,scissors': ['crushes', '#rect4899-6'],
        'lizard,paper': ['eats', '#rect4899-6-1'],
        'spock,rock': ['vaporizes', '#rect4899-6-1-8'],
        'scissors,lizard': ['decapitates', '#rect4899-6-1-8-6']
    };
class Board extends React.Component {
  getFinalData = () => {
    let p1Circle = '',
      p2Circle = '',
      wKey = '',
      wColor = '#000',
      wArrow = '',
      wText = '';

    if (this.props.p1Choice && this.props.p2Choice) {
      let playerOneChoice = this.props.p1Choice,
        playerTwoChoice = this.props.p2Choice,
        test1 = playerOneChoice + ',' + playerTwoChoice,
        test2 = playerTwoChoice + ',' + playerOneChoice;

        if (playerOneChoice === playerTwoChoice) {
          wText = 'DRAW';
        } else {
          // winner
          if (test1 in resolveMap) {
              wKey = test1; wColor = playerOneColor;
          }
          else{
              if (test2 in resolveMap) {
                  wKey = test2; wColor = playerTwoColor;       
              }
          }
          p1Circle = circlesMap[playerOneChoice];
          p2Circle = circlesMap[playerTwoChoice];
          wText = wKey.replace(",", " " + resolveMap[wKey][0] + " ");
          wArrow = resolveMap[wKey][1]
        }
    }
    return [wKey, wColor, wText, p1Circle, p2Circle, wArrow];
  }

  render() {
    let dt = this.getFinalData(),
      wKey = dt[0],
      wColor = dt[1], 
      wText = dt[2],
      p1Circle = dt[3],
      p2Circle = dt[4],
      wArrow = dt[5]; 

    return (
        <div>
            <Figures
              p1Choice={this.props.p1Choice}
              p1Circle={p1Circle}
              p1Color={playerOneColor}
              p2Choice={this.props.p2Choice}
              p2Circle={p2Circle}
              p2Color={playerTwoColor}
              wColor={wColor}
              wText={wText}
              wArrow={wArrow}
            />
            <p className="rpsls-text" style={{color: wColor}}>{wText}</p>
        </div>
    );
  }
}

export default Board;
