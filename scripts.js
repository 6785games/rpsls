const playerOneColor = '#FF2D00',  // red
    playerTwoColor = '#001BFF',  // blue
    circlesMap = {
        'rock': 'path850',
        'paper': 'path846',
        'scissors': 'path848',
        'lizard': 'path852',
        'spock': 'path829'
    },
    arrowsMap = {
        'rock,lizard': 'path4741',
        'lizard,spock': 'path4741-6',
        'spock,scissors': 'path4741-6-4',
        'scissors,paper': 'path4741-6-4-0',
        'paper,rock': 'path4741-6-4-0-1',
        'paper,spock': 'rect4899',
        'rock,scissors': 'rect4899-6',
        'lizard,paper': 'rect4899-6-1',
        'spock,rock': 'rect4899-6-1-8',
        'scissors,lizard': 'rect4899-6-1-8-6'
    },
    verbsMap = {
        'rock,lizard': 'crushes',
        'lizard,spock': 'poisons',
        'spock,scissors': 'smashes',
        'scissors,paper': 'cuts',
        'paper,rock': 'covers',
        'paper,spock': 'disproves',
        'rock,scissors': 'crushes',
        'lizard,paper': 'eats',
        'spock,rock': 'vaporizes',
        'scissors,lizard': 'decapitates'
    };


function rpsls() {
    var playerOneChoice = document.querySelector('input[name="playerOne"]:checked').value,
        playerTwoChoice = document.querySelector('input[name="playerTwo"]:checked').value,
        test1 = playerOneChoice + ',' + playerTwoChoice,
        test2 = playerTwoChoice + ',' + playerOneChoice,
        winnerKey = '',
        winnerColor = '#000',
        txt = '';

    if (playerOneChoice === playerTwoChoice) {
        txt = 'DRAW!';
    } else {
        // winner
        if (test1 in arrowsMap) {
            winnerKey = test1; winnerColor = playerOneColor;
        }
        else{
            if (test2 in arrowsMap) {
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
            arrowsMap[winnerKey]).style.stroke = winnerColor;
        document.querySelector(".svgClass").getSVGDocument().getElementById(
            arrowsMap[winnerKey]).style.fill = winnerColor;

        txt = winnerKey.replace(",", " " + verbsMap[winnerKey] + " ");
    }

    // text and victory color
    document.getElementById('rpsls-text').style.color = winnerColor;
    document.getElementById('rpsls-text').innerHTML = txt;
};


const pubnub = new PubNub({
    publishKey: "pub-c-2ee20710-a112-40af-9a77-21eaa1dd53ec",
    subscribeKey: "sub-c-6fe52db8-5906-11eb-aa8f-362bd3cdc5e2"
});

var player = {
    "score": 0,
    "choice": ""
}