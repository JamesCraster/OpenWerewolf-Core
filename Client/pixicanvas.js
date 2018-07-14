PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
var app = new PIXI.Application(800, 600, {
    backgroundColor: 0x168714
});
$('#innerLeftBox').append(app.view);
var shiftKey = false;
var cardTexture = PIXI.Texture.fromImage('Assets/Card.png');
var aceTexture = PIXI.Texture.fromImage("Assets/Ace.png");


// create a texture from an image path
var texture = PIXI.Texture.fromImage('Assets/Card.png');

// Scale mode for pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

for (var i = 0; i < 10; i++) {
    /*createBunny(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height)
    );*/
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        //event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        //event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}
upArrow = keyboard(16);
upArrow.press = () => {
    shiftKey = true;
};
upArrow.release = () => {
    shiftKey = false;
}

function createBunny(x, y) {

    // create our little bunny friend..
    var bunny = new PIXI.Sprite(texture);

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    bunny.interactive = true;

    bunny.flipped = false;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    bunny.buttonMode = true;

    // center the bunny's anchor point
    bunny.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    bunny.scale.set(3);

    // setup events for mouse + touch using
    // the pointer events
    bunny
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    // For mouse-only events
    // .on('mousedown', onDragStart)
    // .on('mouseup', onDragEnd)
    // .on('mouseupoutside', onDragEnd)
    // .on('mousemove', onDragMove);

    // For touch-only events
    // .on('touchstart', onDragStart)
    // .on('touchend', onDragEnd)
    // .on('touchendoutside', onDragEnd)
    // .on('touchmove', onDragMove);

    // move the sprite to its designated position
    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    app.stage.addChild(bunny);
}

function onDragStart(event) {
    if (shiftKey) {
        if (this.flipped) {
            this.texture = cardTexture;
            this.flipped = false;
        } else {
            this.texture = aceTexture;
            this.flipped = true;
        }
    }
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}