import React from 'react';

class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      txt: ''
    }
    
    this.playerOneColor = '#FF2D00';  // red
    this.playerTwoColor = '#001BFF';  // blue
    
    // key: choice
    // value: id
    this.circlesMap = {
        'rock': 'path850',
        'paper': 'path846',
        'scissors': 'path848',
        'lizard': 'path852',
        'spock': 'path829'
    };

    // key: <winner>,<loser>
    // value: [action, arrow id]
    this.resolveMap = {
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
  }

  componentDidUpdate = () => {
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
        winnerColor = '#000';

    if (playerOneChoice === playerTwoChoice) {
        this.setState('txt', 'DRAW!');
    } else {
        // winner
        if (test1 in this.arrowsMap) {
            winnerKey = test1; winnerColor = this.playerOneColor;
        }
        else{
            if (test2 in this.arrowsMap) {
                winnerKey = test2; winnerColor = this.playerTwoColor;       
            }
        }

        // color player one choice
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          this.circlesMap[playerOneChoice]).style.stroke = this.playerOneColor;
        // color player two choice
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          this.circlesMap[playerTwoChoice]).style.stroke = this.playerTwoColor;
        // color arrow
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          this.resolveMap[winnerKey][1]).style.stroke = winnerColor;
        document.querySelector(".svgClass").getSVGDocument().getElementById(
          this.resolveMap[winnerKey]).style.fill = winnerColor;

        this.setState(
          'txt',
          winnerKey.replace(",", " " + this.resolveMap[winnerKey][0] + " ")
        );
    }

    // text and victory color
    document.getElementById('rpsls-text').style.color = winnerColor;
  }

  render() {
    return <div>
        <object class="svgClass" type="image/svg+xml"
              data="media/512px-rpsls.svg"
              width="350" height="350" ></object>
        <p id="rpsls-text">{ this.state.text }</p>
      </div>;
  }
}

export default Board;
