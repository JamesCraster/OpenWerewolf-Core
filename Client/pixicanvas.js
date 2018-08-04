PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
var app = new PIXI.Application(800, 600, {
    backgroundColor: 0x2d2d2d
});
var playerTexture = new PIXI.Texture.fromImage('assets/owwplayer.png');
let players = [];

class Player {
    constructor(playerTexture, username) {
        this.sprite = new PIXI.Sprite(playerTexture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.x = 2;
        this.sprite.scale.y = 2;
        players.push(this);
        app.stage.addChild(this.sprite);;
        this.usernameText = new PIXI.Text(username, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xff1010,
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
}
var gallowsTexture = new PIXI.Texture.fromImage('assets/gallows.png');
var gallowsSprite = new PIXI.Sprite(gallowsTexture);
gallowsSprite.anchor.set(0.5, 0.5);
gallowsSprite.scale.x = 2;
gallowsSprite.scale.y = 2;
gallowsSprite.x = Math.floor(app.renderer.width / 2);
gallowsSprite.y = Math.floor(app.renderer.height / 2) - 50;

var player1 = new Player(playerTexture, 'jcraster');

function resize() {
    const parent = app.view.parentNode;
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
    gallowsSprite.x = Math.floor(app.renderer.width / 2);
    gallowsSprite.y = Math.floor(app.renderer.height / 2) - 50;
    let positions = distributeInCircle(players.length, 200);
    for (let i = 0; i < players.length; i++) {
        players[i].setPos(gallowsSprite.x + positions[i][0], gallowsSprite.y + positions[i][1] + 25);
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