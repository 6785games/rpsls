import React from 'react';
import Board from './Board';
import Swal from "sweetalert2";  

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      p1Score: 0,
      p2Score: 0,
      p1Choice: null,
      p2Choice: null
    };

    this.gameOver = false;
    this.counter = 0;
    this.choice = null;
  }

  componentDidMount(){
    this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
      // Publish move to the opponent's board
      if(msg.message.choice){
        this.publishMove(msg.message.choice, msg.message.player);
        // Check if there is a winner
        this.checkForWinner();
      }

      // Start a new round
      else if(msg.message.reset){
        this.gameOver = false;
        this.counter = 0;
        this.choice = null;
        this.setState({
          p1Choice: null,
          p2Choice: null
        });
        Swal.close()
      }

      // End the game and go back to the lobby
      else if(msg.message.endGame){
        Swal.close();
        this.props.endGame();
      }
    });
  }

  newRound = (winner) => {
    let title = (winner === null) ? 'Tie game!' : `Player ${winner} won!`;
    // Show this if the player is not the room creator
    if((this.props.isRoomCreator === false) && this.gameOver){
      Swal.fire({  
        position: 'top',
        allowOutsideClick: false,
        title: title,
        text: 'Waiting for a new round...',
        confirmButtonColor: 'rgb(208,33,41)',
        width: 275,
        customClass: {
            heightAuto: false,
            title: 'title-class',
            popup: 'popup-class',
            confirmButton: 'button-class',
        } ,
      });
    } 

    // Show this to the room creator
    else if(this.props.isRoomCreator && this.gameOver){
      Swal.fire({      
        position: 'top',
        allowOutsideClick: false,
        title: title,
        text: 'Continue Playing?',
        showCancelButton: true,
        confirmButtonColor: 'rgb(208,33,41)',
        cancelButtonColor: '#aaa',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes!',
        width: 275,
        customClass: {
            heightAuto: false,
            title: 'title-class',
            popup: 'popup-class',
            confirmButton: 'button-class',
            cancelButton: 'button-class'
        } ,
      }).then((result) => {
        // Start a new round
        if (result.value) {
          this.props.pubnub.publish({
            message: {
              reset: true
            },
            channel: this.props.gameChannel
          });
        }

        else{
          // End the game
          this.props.pubnub.publish({
            message: {
              endGame: true
            },
            channel: this.props.gameChannel
          });
        }
      })      
    }
   }

	// Update score for the winner
  announceWinner = (winner) => {
		let players = {
			1: this.state.p1Score,
			2: this.state.p2Score
		}
	
		if(winner === 1){
			players[1] += 1;
			this.setState({
				p1Score: players[1]
			});
		}
		else{
			players[2] += 1;
			this.setState({
				p2Score: players[2]
			});
		}
		// End the game once there is a winner
		this.gameOver = true;
		this.newRound(winner);	
  }
  
  checkForWinner = () => {
    // Possible winning combinations
    if (this.state.p1Choice && this.state.p2Choice) {
      // Both answers submitted, resolve
      const combo1 = this.state.p1Choice + ',' + this.state.p2Choice,
            combo2 = this.state.p2Choice + ',' + this.state.p1Choice,
            possibleCombinations = [
              'rock,lizard',
              'lizard,spock',
              'spock,scissors',
              'scissors,paper',
              'paper,rock',
              'paper,spock',
              'rock,scissors',
              'lizard,paper',
              'spock,rock',
              'scissors,lizard'
            ];

      if (combo1 === combo2) {
        // Draw
        this.gameOver = true;
        this.newRound(null);
      }
      
      if (possibleCombinations.includes(combo1)) {
        // player 1 wins
        this.announceWinner(1);
      } else {
        if (possibleCombinations.includes(combo2)) {
          // player 2 wins
          this.announceWinner(2);
        }
      }
    }
  };
   
  // Opponent's move is published to the board
  publishMove = (choice, player) => {
    if (player === 1) {
      this.setState({p1Choice: choice});
    } else {
      this.setState({p2Choice: choice});
    }
  }

  onMakeMove = (choice) =>{
    this.choice = choice;

    // Publish move to the channel
    this.props.pubnub.publish({
      message: {
        choice: this.choice,
        player: this.props.id,
      },
      channel: this.props.gameChannel
    });  
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
              p1Choice={this.state.p1Choice}
              p2Choice={this.state.p2Choice}
            /> 
        </div>
        
        <div className="scores-container">
          <div>
            <p>Host: {this.state.p1Score} | Guest: {this.state.p2Score} </p>
          </div>
        </div>
        {
          !this.choice &&
          <div id="playerChoice">
              <input type="button" id="rock" name="playerChoice" value="rock"
                onClick={(e) => this.onMakeMove("rock", e)}></input> 
              <input type="button" id="paper" name="playerChoice" value="paper"
                onClick={(e) => this.onMakeMove("paper", e)}></input> 
              <input type="button" id="scissors" name="playerChoice" value="scissors"
                onClick={(e) => this.onMakeMove("scissors", e)}></input> 
              <input type="button" id="lizard" name="playerChoice" value="lizard"
                onClick={(e) => this.onMakeMove("lizard", e)}></input> 
              <input type="button" id="spock" name="playerChoice" value="spock"
                onClick={(e) => this.onMakeMove("spock", e)}></input> 
          </div>
        }
      </div>
    );
  }
}

export default Game;
