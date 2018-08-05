PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
var app = new PIXI.Application(800, 600, {
    backgroundColor: 0x2d2d2d
});
var playerTexture = new PIXI.Texture.fromImage('assets/swordplayer.png');
let players = [];

class Player {
    constructor(playerTexture, username, usernameColor) {
        //usernameColor = usernameColor.substr(1);
        this.sprite = new PIXI.Sprite(playerTexture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.x = 2;
        this.sprite.scale.y = 2;
        players.push(this);
        app.stage.addChild(this.sprite);
        this.username = username;
        this.usernameText = new PIXI.Text(username, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: usernameColor,
            align: 'center'
        });
        this.usernameText.x = this.sprite.x;
        this.usernameText.y = this.sprite.y - 40;
        this.usernameText.anchor.set(0.5, 0.5);
        app.stage.addChild(this.usernameText);
    }
    setPos(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
        this.usernameText.x = x;
        this.usernameText.y = y - 40;
    }
    destructor() {
        app.stage.removeChild(this.sprite);
        app.stage.removeChild(this.usernameText);
    }
}
var gallowsTexture = new PIXI.Texture.fromImage('assets/gallows.png');
var gallowsSprite = new PIXI.Sprite(gallowsTexture);
gallowsSprite.anchor.set(0.5, 0.5);
gallowsSprite.scale.x = 2;
gallowsSprite.scale.y = 2;
gallowsSprite.x = Math.floor(app.renderer.width / 2);
gallowsSprite.y = Math.floor(app.renderer.height / 2) - 50;

function removeAllPlayers() {
    for (let i = 0; i < players.length; i++) {
        players[i].destructor();
    }
    players = [];
    resize();
}

function removePlayer(username) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].username == username) {
            players[i].destructor();
            players.splice(i, 1);
            resize();
        }
    }
}

function addPlayer(username, usernameColor) {
    let newPlayer = new Player(playerTexture, username, usernameColor);
    resize();
}

function resize() {
    const parent = app.view.parentNode;
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
    gallowsSprite.x = Math.floor(app.renderer.width / 2);
    gallowsSprite.y = Math.floor(app.renderer.height / 2) - 50;
    let positions = distributeInCircle(players.length, 200);
    for (let i = 0; i < players.length; i++) {
        players[i].setPos(gallowsSprite.x + positions[i][0], gallowsSprite.y + positions[i][1] + 20);
        if (positions[i][0] > 1) {
            players[i].sprite.scale.x = -2;
        } else {
            players[i].sprite.scale.x = 2;
        }
    }
}

function distributeInCircle(number, radius) {
    var positions = [];
    var angle = 2 * Math.PI / number;
    for (let i = 0; i < number; i++) {
        positions.push([radius * Math.sin(angle * i), radius * Math.cos(angle * i)]);
    }
    return positions;
}
$(window).resize(resize);
app.stage.addChild(gallowsSprite);
$('#canvasContainer').append(app.view);