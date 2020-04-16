




/**
 * Ahmed Essam Mohamed
 * Sun - Wed (11am - 2pm)
 * Eng Ahmed Bahnasy
 */





var score = document.getElementById('score');
var life = document.getElementById('life');
var playBtn = document.getElementById('play-btn');
var scoreResult = document.getElementById('score-result');

var happyHen = document.querySelectorAll('.hens-section .happy-hen');
var happyEgg = document.querySelectorAll('.hens-section .happy-egg');

var basketSection = document.querySelector('.basket-section');
var basketCounter = document.querySelector('.basket-counter');
var introSection = document.querySelector('.intro-section');
var basketImg = document.querySelector('.basket-section .basket-img');
var gameOver = document.querySelector('.game-over');
var brokenEgg = document.querySelectorAll('.broken-eggs .broken-egg');

var lifeCounter;
var scoreCounter;

var intervalList = [];

//var basketTopPos = basketImg.getBoundingClientRect().top;
var happyMp3 = document.getElementById('happy-mp3');
var scoreMp3 = document.getElementById('score-mp3');
var gameOverMp3 = document.getElementById('game-over');

reset();

/**
 * Move the basket when mouse moving
 */
document.addEventListener('mousemove', function(e) {
    basketSection.style.left = e.clientX+ 'px';
});

/**
 * Play The Game When Click Play Button
 */
playBtn.addEventListener('click', function() {
    playGame();
});


/**
 * function to trigger each egg 
 */
function trigger(egg) {
    var speed = Math.floor(Math.random() * 5) + 7;
    var topPos = 50;
    var state = true;
    var inter = setInterval(function() {
        var eggTop = Math.floor(egg.getBoundingClientRect().top);
        var eggLeft = Math.floor(egg.getBoundingClientRect().left);
        var eggWidth = Math.floor(egg.getBoundingClientRect().width);
        var eggHeight = Math.floor(egg.getBoundingClientRect().height);
        
        
        var basketTop = Math.floor(basketImg.getBoundingClientRect().top);
        var basketLeft = Math.floor(basketImg.getBoundingClientRect().left);
        var basketWidth = Math.floor(basketImg.getBoundingClientRect().width);
        var basketHeight = Math.floor(basketImg.getBoundingClientRect().height);

        topPos += 1;


        //Check position of egg
        if (
            //Top
            (eggTop + eggHeight > basketTop && eggTop < basketTop + basketHeight)
            &&
            //Left
            (eggLeft + eggWidth >= basketLeft && eggLeft+ eggWidth < basketLeft + basketWidth)
        
        ) {
            topPos = 5;
            scoreUp();
            
        } else if (eggTop > basketTop ) { //egg is broken
            
            //console.log("Broken");
            if (state) {
                state = false;
                topPos = 50;
                showBrokenEgg(egg);
                lostLife();
            }
        }
        
        /*
        //Check position of egg
        if (eggTotalTop == basketTop
            &&
            (eggLeft + eggWidth >= basketLeft && eggLeft+ eggWidth < basketLeft + basketWidth)
        
        ) {
            topPos = 5;
            scoreUp();
            
        } else if (eggTop > basketTop) { //egg is broken
            
            //console.log("Broken");
            if (state) {
                state = false;
                topPos = 50;
                showBrokenEgg(egg);
                lostLife();
            }
        }
        */
        state = true;
        
        egg.style.top = topPos + "px";
    }, speed);
    return inter;
}

/**
 * Play the game
 */
function playGame() {
    introSection.style.display = 'none';
    scoreResult.innerHTML = '';
    for(var i=0; i < happyEgg.length; i++) {
        intervalList.push(trigger(happyEgg[i]));
        console.log(happyEgg[i].dataset.egg)
    }
    reset();
    happyMp3.play();
}


/**
 * show & hide broken egg function 
 */
function showBrokenEgg(egg) {
    var dataEgg = Number(egg.getAttribute('data-egg'));
    brokenEgg[dataEgg].style.display = 'inline-block';
    setTimeout(function() {
        brokenEgg[dataEgg].style.display = 'none';
    }, 1000);
}

/**
 * lost one life
 */
function lostLife() {
    lifeCounter--;
    life.innerHTML = lifeCounter;
    checkLife();
}

/**
 * Update the score
 */
function scoreUp() {
    scoreCounter++;
    score.innerHTML = scoreCounter;
    basketCounter.innerHTML = scoreCounter;
    scoreMp3.play();
}


/**
 * Check `lifeCounter` 
 * user in `lostLife()` function
 * change `play` button to `play again`
 */
function checkLife() {
    if (lifeCounter == 0) {
        for(var i = 0; i < intervalList.length; i++) {
            window.clearInterval(intervalList[i]);
        }
        introSection.style.display = 'block';
        scoreResult.innerHTML = scoreCounter;
        playBtn.innerHTML = "play Again";
        gameOverMp3.play();
        happyMp3.pause();
    }
}

/**
 * Reset the game when losing
 */
function reset() {
    scoreCounter = 0;
    lifeCounter = 10;
    life.innerHTML = lifeCounter;
    score.innerHTML = scoreCounter;
    basketCounter.innerHTML = scoreCounter;
    happyMp3.currentTime = 0;
}
