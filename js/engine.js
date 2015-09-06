<<<<<<< HEAD
<<<<<<< HEAD
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
=======
var Engine = (function(global) {
    //predefined global variables
>>>>>>> master
=======
var Engine = (function(global) {
    //predefined global variables
>>>>>>> master
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
<<<<<<< HEAD
<<<<<<< HEAD
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
=======
=======
>>>>>>> master

        //Get time delta information which is required for movement animation

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);

        //Game over fade in screen
        if (deathCount > 4) {
            ctx.globalAlpha = 0;
            var ggfadein = setInterval(function(){
                ctx.globalAlpha += 0.01;
                ctx.clearRect(0,0,505,606);
                ctx.drawImage(Resources.get('images/game over.png'),0,0);
                if (ctx.globalAlpha > 0.99) {
                    console.log("cleared");  //TODO figure out interval run duplication issue.
                    clearInterval(ggfadein);
                }
            },20);

            //Game over fadeout screen and reset all game values
            setTimeout(function() {
                var ggfadeout = setInterval(function(){
                ctx.clearRect(0,0,505,606);
                ctx.globalAlpha -= 0.01;
                ctx.drawImage(Resources.get('images/game over.png'),0,0);
                if (ctx.globalAlpha < 0.015) {
                    rint = 0,
                    E_loc = 0,
                    score = 0,
                    gscore = 0,
                    tempScore = 0,
                    selected = 0,
                    clickConfirm = 0,
                    deathCount = 0;
                    clearInterval(ggfadeout);
                    init();
                }
            },20);
            }, 4000);
        }

        //continue loop until game over deathcount is reached
        if (deathCount < 5) {
            render();

            // Set our lastTime variable which is used to determine the time delta
            lastTime = now;
            /* Use the browser's requestAnimationFrame function to call this
             * function again as soon as the browser is able to draw another frame.
             */
            win.requestAnimationFrame(main);
        }
    }

    //contains game starting screen
    function init() {
        fadeCtx = canvas.getContext('2d');
        fadeCtx.globalAlpha = 0;
        var interval = setInterval(function() {
            ctx.clearRect(0,0,505,606);
            fadeCtx.drawImage(Resources.get('images/Prologue.png'),0,0);
            fadeCtx.globalAlpha += 0.01;
            if (fadeCtx.globalAlpha > 0.99) {
                clearInterval(interval);
            }
        },20);

        var elemLeft = canvas.offsetLeft;
        var elemTop = canvas.offsetTop;
        //draw "start" image and set event click to happen within start image area
        setTimeout(function () {
            ctx.drawImage(Resources.get('images/Start.png'),0,0);
        }, 3000);

        canvas.addEventListener('click', function(event){
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            if (x > 250 && x < 400 && y > 290 && y < 340) {
                selected = 1;
                selectchar();
            }
        });
    }

    //character selection screen
    function selectchar() {
        //show selectable characters
        ctx.drawImage(Resources.get('images/Greyback.png'),0,0);
        ctx.drawImage(Resources.get('images/char-boy.png'),51,200);
        ctx.drawImage(Resources.get('images/char-cat-girl.png'),202,200);
        ctx.drawImage(Resources.get('images/char-horn-girl.png'),353,200);

        //select characters
        if (selected == 1) {
            ctx.drawImage(Resources.get('images/arrow_up1.png'),71,350);
        }
        else if (selected == 2) {
            ctx.drawImage(Resources.get('images/arrow_up1.png'),222,350);
        }
        else if (selected == 3){
            ctx.drawImage(Resources.get('images/arrow_up1.png'),373,350);
        }

        //enter into main function when Enter is confirmed
        if(clickConfirm == 1) {
            playerrend();
            lastTime = Date.now();
            canvas.width = canvas.width;
            scoreUpdate(0,0);
            main();
        }
        else{
            win.requestAnimationFrame(selectchar);
        }
    }

    //updates Entities, checks collisions, and render all objects
    function update(dt) {
        updateEntities(dt);
        player.checkCollisions();
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> master
=======
>>>>>>> master
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
<<<<<<< HEAD
<<<<<<< HEAD
     * on your enemy and player entities within app.js
=======
     * on your enemy, player, gem and "NICE" entities within app.js
>>>>>>> master
=======
     * on your enemy, player, gem and "NICE" entities within app.js
>>>>>>> master
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
<<<<<<< HEAD
<<<<<<< HEAD

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }
=======
=======
>>>>>>> master
        player.render();
        gems.render();
        nice.render();
    }

<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
<<<<<<< HEAD
<<<<<<< HEAD
        'images/char-boy.png'
=======
=======
>>>>>>> master
        'images/char-boy.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Nice.png',
        'images/Rock.png',
        'images/Key.png',
        'images/Prologue.png',
        'images/Start.png',
        'images/Greyback.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/arrow_up1.png',
        'images/game over.png'
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> master
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
<<<<<<< HEAD
<<<<<<< HEAD
})(this);
=======
    global.selected=selected;
})(this);

window.addEventListener('load', Engine);
>>>>>>> master
=======
    global.selected=selected;
})(this);

window.addEventListener('load', Engine);
>>>>>>> master
