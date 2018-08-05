PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
var app = new PIXI.Application(800, 600, {
    backgroundColor: 0x2d2d2d
});
var playerTexture = new PIXI.Texture.fromImage('assets/swordplayer.png');
let players = [];
var stoneBlockTexture = new PIXI.Texture.fromImage('assets/stoneblock.png');

let stoneBlockContainer = new PIXI.Container();
stoneBlockContainer
app.stage.addChild(stoneBlockContainer);

class StoneBlock {
    constructor(stoneBlockTexture, x, y) {
        this.sprite = new PIXI.Sprite(stoneBlockTexture);
        this.sprite.pivot.x = 0.5;
        this.sprite.pivot.y = 0.5;
        let rotation = Math.floor(Math.random() * 4);
        /*switch (rotation) {
            case 0:
                this.sprite.rotation = 0;
                break;
            case 1:
                this.sprite.rotation = Math.PI / 2;
                break;
            case 2:
                this.sprite.rotation = Math.PI;
                break;
            case 3:
                this.sprite.rotation = 3 * Math.PI / 2;
                break;
        }*/
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scale.x = 2;
        this.sprite.scale.y = 2;
        this.sprite.anchor.set(0.5, 0.5);
        stoneBlockContainer.addChild(this.sprite);
        //app.stage.addChild(this.sprite);
    }
}
let level = 11;
for (let y = 0; y < level; y++) {
    if (y < 6) {
        for (x = -y; x < y; x++) {
            let stoneblock = new StoneBlock(stoneBlockTexture, x * 64, y * 64);
        }
    } else {
        for (x = y - 11; x < 11 - y; x++) {
            let stoneblock = new StoneBlock(stoneBlockTexture, x * 64, y * 64);
        }
    }
}
//stoneBlockContainer.pivot.x = stoneBlockContainer.width / 2;
stoneBlockContainer.pivot.y = stoneBlockContainer.height / 2;

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
    let positions = distributeInCircle(players.length, 170);
    for (let i = 0; i < players.length; i++) {
        players[i].setPos(gallowsSprite.x + positions[i][0], gallowsSprite.y + positions[i][1] + 20);
        if (positions[i][0] > 1) {
            players[i].sprite.scale.x = -2;
        } else {
            players[i].sprite.scale.x = 2;
        }
    }
    stoneBlockContainer.position.x = gallowsSprite.position.x + 33;
    stoneBlockContainer.position.y = gallowsSprite.position.y - 33;
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