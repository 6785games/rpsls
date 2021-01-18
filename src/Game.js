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
      p2Choice: null,
      whosTurn: this.props.myTurn
    };

    this.turn = 1;
    this.gameOver = false;
    this.counter = 0;
    this.choice = null;
  }

  componentDidMount(){
    this.props.pubnub.getMessage(this.props.gameChannel, (msg) => {
      // Publish move to the opponent's board
      if(msg.message.turn === this.props.id){
        this.publishMove(msg.message.choice, msg.message.player);
      }

      // Start a new round
      else if(msg.message.reset){
        this.setState({
          whosTurn : this.props.myTurn
        });

        this.turn = 1;
        this.gameOver = false;
        this.counter = 0;
        this.choice = null;
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
      this.turn = 1;
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
            possibleCombinations = [];

      if (combo1 === combo2) {
        // Draw
        this.gameOver = true;
        this.newRound(null);
      }
      
      if (combo1 in possibleCombinations) {
        // player 1 wins
        this.announceWinner(1);
      } else {
        if (combo2 in possibleCombinations) {
          // player 2 wins
          this.announceWinner(2);
        }
      }
    }
  };
   
  // Opponent's move is published to the board
  publishMove = (choice, player) => {
    if (player === 1) {
      this.setState({p1Choice: choice, whosTurn: !this.state.whosTurn});
      this.turn = 2;
    } else {
      this.setState({p2Choice: choice, whosTurn: !this.state.whosTurn});
      this.turn = 1;
    }

    this.checkForWinner();
  }

  onMakeMove = (choice) =>{
    if (this.turn === this.props.id) {
      if (this.props.id === 1) {
        this.setState({p1Choice: choice, whosTurn: !this.state.whosTurn});
        this.turn = 2;
      } else {
        this.setState({p2Choice: choice, whosTurn: !this.state.whosTurn});
        this.turn = 1;
      }

      // Publish move to the channel
      this.props.pubnub.publish({
        message: {
          choice: choice,
          player: this.props.id,
          turn: this.turn
        },
        channel: this.props.gameChannel
      });  

      // Check if there is a winner
      this.checkForWinner();
    }
  }

  bothMovesMade = () => {
    if (this.state.p1Choice && this.state.p2Choice) {
      // color stuff in here
    }
  }

  render() {
    let status;
    // Change to current player's turn
    status = `${this.state.whosTurn ? "Your turn" : "Opponent's turn"}`;

    return (
      <div className="game">
        <div className="board">
          <Board
              p1Choice={this.state.p1Choice}
              p2Choice={this.state.p2Choice}
            />  
            <p className="status-info">{status}</p>        
        </div>
        
        <div className="scores-container">
          <div>
            <p>Host: {this.state.p1Score} </p>
          </div>

          <div>
            <p>Guest: {this.state.p2Score} </p>
          </div>
        </div>

        <form>
          <div id="playerChoice">
              <input type="radio" id="rock" name="playerChoice" value="rock">
                <label for="rock">Rock</label></input> - 
              <input type="radio" id="paper" name="playerChoice" value="paper">
                <label for="paper">Paper</label></input> - 
              <input type="radio" id="scissors" name="playerChoice" value="scissors">
                <label for="scissor">Scissors</label></input> - 
              <input type="radio" id="lizard" name="playerChoice" value="lizard">
                <label for="lizard">Lizard</label></input> - 
              <input type="radio" id="spock" name="playerChoice" value="spock">
                <label for="spock">Spock</label></input>
          </div>
          <button type="submit" onClick={choice => this.onMakeMove(choice)}>Select</button>
        </form>
      </div>
    );
  }
}

export default Game;
