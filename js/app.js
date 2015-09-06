function Animal(name, numLegs) {
    this.name = name;
    this.numLegs = numLegs;
    this.isAlive = true;
}
function Penguin(name) {
    this.name = name;
    this.numLegs = 2;
}
function Emperor(name) {
    this.saying = "Waddle waddle";
}

// set up the prototype chain
Penguin.prototype = new Animal();
Emperor.prototype = new Penguin();

var myEmperor = new Emperor("Jules");
console.log(myEmperor);
// console.log(myEmperor.name); // should print "Waddle waddle"
console.log(myEmperor.numLegs); // should print 2
console.log(myEmperor.isAlive); // should print true




//define global variables used across files
var rint = 0,
    E_loc = 0,
    score = 0,
    gscore = 0,
    tempScore = 0,
    selected = 0,
    clickConfirm = 0,
    deathCount = 0,
    niceCount = 0;

//possible spawn locations for gems
var roadloc_x = [0,101,202,303,404],
    roadloc_y = [60,145,230];

var gems = {};

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    //randomly apply intiial speed to Enemy.
    rint = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    //speed is between 325 and 650
    this.speed = (5-((5-rint)*0.5))*130;
    E_loc = Math.floor(Math.random()*3);    //randomizes y position spawn location
    this.y = e_loc_array[E_loc];            //randomizes y position spawn location
};
// Update the enemy's position
Enemy.prototype.update = function(dt) {
    //randomly apply speed and spawn location to Enemy after each passing off screen
    if (this.x > 700) {
        rint = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        this.speed = (5-((5-rint)*0.5))*130;
        this.x = -200;
        E_loc = Math.floor(Math.random() * 3);
        this.y = e_loc_array[E_loc];
    }
    this.x+=this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class, image depends on menu selection
var Char = function(x,y) {
    if (selected == 1) {
        this.sprite = 'images/char-boy.png';
    }
    else if (selected == 2) {
        this.sprite = 'images/char-cat-girl.png';
    }
    else if (selected == 3) {
        this.sprite = 'images/char-horn-girl.png';
    }
    this.x = x;
    this.y = y;
};

//store new character position based on keyboard input
Char.prototype.handleInput = function (input) {
    if (input == 'left' && this.x > 0) {
        this.x = this.x - 101;
    }
    else if (input == 'right' && this.x < 404) {
        this.x = this.x + 101;
    }
    else if (input == 'up' && this.y > 0) {
        this.y = this.y - 83;
    }
    else if (input == 'down' && this.y < 321) {
        this.y = this.y + 83;
    }
};

//render player
Char.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reset player location after reaching the water
Char.prototype.update = function() {
    if (this.y < 70) {
        score++;
        scoreUpdate(score,gscore);
        this.x = 202;
        this.y = 403;
    }
};

Char.prototype.checkCollisions = function() {
    //collusion with enemies
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 90 && this.x + 90 > allEnemies[i].x && allEnemies[i].y + 80 > this.y
            && this.y + 64 > allEnemies[i].y) {
            score = 0;          //reset score
            gscore = 0;         //reset gem score
            deathCount++;
            this.x = 202;
            this.y = 403;
            scoreUpdate(score,gscore);
        }
    }
    //collusion with Gems
    if (this.x < gems.x + 91 && this.x + 91 > gems.x && gems.y + 70 > this.y && this.y + 70 > gems.y) {
        gscore++;
        scoreUpdate(score,gscore);
        x_loc = Math.floor(Math.random()*5);
        y_loc = Math.floor(Math.random()*3);
        var ran = y_loc;        //randomize gem's color has same index range of 0-2 as gem's Y location randomization
        gems = gemarray[ran];
        gems.x = roadloc_x[x_loc];
        gems.y = roadloc_y[y_loc];
    }
};

// define gem class and randomize spawn location
var gem = function (){
    var x_loc = Math.floor(Math.random()*5);
    var y_loc = Math.floor(Math.random()*3);
    this.x = roadloc_x[x_loc];
    this.y = roadloc_y[y_loc];
};

//render gems
gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//"NICE" image class definition
var gj = function(x,y) {
    this.sprite = 'images/Nice.png';
    this.x = x;
    this.y = y;
};

//"NICE" image render, text stays for 2 seconds then disappears
//TODO: fix text so it says for two seconds even through collison/complete resets.
gj.prototype.render = function() {
    ctx.clearRect(150,0,200,50);
    if (gscore % 3 === 0 && gscore !== 0 && niceCount < 120) {
        niceCount++;
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        tempScore = gscore;
    } else {
        ctx.clearRect(150,0,200,50);
    }
    if (tempScore != gscore) {
        niceCount = 0;
    }
};


//update score on top of screen
function scoreUpdate(score1, score2) {
    ctx.clearRect(390,10,150,30);
    ctx.font = "20px Arial";
    ctx.fillText("Score: ",390,30);
    ctx.fillText(score1,460,30);

    ctx.clearRect(0,10,150,30);
    ctx.font = "20px Arial";
    ctx.fillText("Gem: ",0,30);
    ctx.fillText(score2,70,30);
}

//function to ensure player object creates only after char sprite menu selection
function playerrend() {
    var player = new char(202,403);
    this.player=player;
}

//create enemies
var e_loc_array = [60, 145, 230];
var enemy1 = new Enemy(-101,60);
var enemy2 = new Enemy(-101,145);
var enemy3 = new Enemy(-101,230);
var allEnemies = [enemy1,enemy2,enemy3];
enemy1.sprite = 'images/enemy-bug.png';
enemy2.sprite = 'images/Rock.png';
enemy3.sprite = 'images/Key.png';


//gem and randomizing first gem type on screen.
var gem1 = new gem();
var gem2 = new gem();
var gem3 = new gem();

gem1.sprite = 'images/Gem Blue.png';
gem2.sprite = 'images/Gem Green.png';
gem3.sprite = 'images/Gem Orange.png';

gemarray = [gem1,gem2,gem3];
ran = Math.floor(Math.random()*3);
gems = gemarray[ran];

//create "NICE" image object
nice = new gj(170,0);

// Listen for keypresses for the game
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (clickConfirm == 1) {//in-game key input, initiates only after char selection "enter" key is pressed.
        player.handleInput(allowedKeys[e.keyCode]);
    }
    if (e.which == 39 && selected < 3) {//char select scroll right
        selected ++;
    }
    else if (e.which == 37 && selected > 1) {//char selection scroll left
        selected --;
    }
    if (e.which == 13 && selected !== 0) {//enter key confirmation
        clickConfirm = 1;
    }
});
