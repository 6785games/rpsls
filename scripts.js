const playerOneColor = '#FF2D00',
    playerTwoColor = '#001BFF',
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
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value)
    }

    var test1 = array.join(),
        test2 = array.reverse().join(),
        winnerKey = '',
        winnerColor = '',
        playerOneChoice = array[0],
        playerTwoChoice = array[1];

    // get player one choice
    document.querySelector(".svgClass").getSVGDocument().getElementById(
        circlesMap[playerOneChoice]
    ).style.stroke = playerOneColor;

    // get player two choice
    document.querySelector(".svgClass").getSVGDocument().getElementById(
        circlesMap[playerTwoChoice]
    ).style.stroke = playerTwoColor;

    // decide winner
    if (test1 in arrowsMap) {
        winnerKey = test1;
        winnerColor = playerOneColor;
    }
    else{
        if (test2 in arrowsMap) {
            winnerKey = test2;
            winnerColor = playerTwoColor;       
        }
    }

    document.querySelector(".svgClass").getSVGDocument().getElementById(
        arrowsMap[winnerKey]
    ).style.stroke = winnerColor;

    var txt = winnerKey.replace(",", " " + verbsMap[winnerKey] + " ");

    document.getElementById('rpsls-text').style.color = winnerColor;
    document.getElementById('rpsls-text').innerHTML = txt;
};