var mainText = undefined;
WebFontConfig = {
    custom: {
        families: ['Mercutio'],
        urls: ['/main.css']
    }
};
WebFont.load({
    custom: {
        families: ['Mercutio']
    },
    active: function () {
        //when the font is loaded, create the main text.
        mainText = new StandardMainTextList([new StandardMainText('Welcome, '), new StandardMainText('james')])
        /*mainText = new PIXI.Text('Welcome, james', {
            fontFamily: 'Mercutio',
            fontSize: 512,
            fill: 0xFFFFFF,
            align: 'center',
            resolution: 20
        });
        mainText.scale.x = 0.125;
        mainText.scale.y = 0.125;
        mainText.x = Math.floor(app.renderer.width / 2) - mainText.width / 2;
        mainText.y = 25;
        app.stage.addChild(mainText);*/
    }
});

class StandardMainText {
    constructor(text, color) {
        console.log(color);
        if (color == undefined) {
            color = 0xFFFFFF;
        } else {
            color = color.substr(1);
            color = "0x" + color;
            color = parseInt(color);
        }
        console.log(color);
        this.object = new PIXI.Text(text, {
            fontFamily: 'Mercutio',
            fontSize: 512,
            fill: color,
            align: 'center',
            resolution: 20
        });
        this.object.scale.x = 0.125;
        this.object.scale.y = 0.125;
    }
}
class StandardMainTextList {
    constructor(standardMainTextArray) {
        this.container = new PIXI.Container();
        app.stage.addChild(this.container);
        this.create(standardMainTextArray);
        this.fadeOutTimeout = undefined;
    }
    clear() {
        this.container.removeChildren();
    }
    create(standardMainTextArray) {
        this.clear();
        //fade in if faded out
        this.container.alpha = 1;
        let point = 0;
        for (let i = 0; i < standardMainTextArray.length; i++) {
            standardMainTextArray[i].object.x = point;
            this.container.addChild(standardMainTextArray[i].object);
            point += standardMainTextArray[i].object.width;
        }
        this.reposition();
    }
    fadeOut(time) {
        this.fadeOutTimeout = setTimeout(function () {
            let fadingAnimation = setInterval(function () {
                this.container.alpha = this.container.alpha * 0.8;
                //if transparent enough to be invisible
                if (this.container.alpha < 0.01) {
                    this.container.alpha = 0;
                    clearInterval(fadingAnimation);
                }
            }.bind(this), 10);
        }.bind(this), time);
    }
    //called on window resize also
    reposition() {
        this.container.x = Math.floor(app.renderer.width / 2) - this.container.width / 2;
        this.container.y = 25;
    }
}
//set scaling to work well with pixel art
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
var app = new PIXI.Application(800, 600, {
    backgroundColor: 0x2d2d2d
});
var playerTexture = new PIXI.Texture.fromImage('assets/swordplayerbreathing/sprite_0.png');
var playerTexture2 = new PIXI.Texture.fromImage('assets/swordplayerbreathing/sprite_1.png');
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
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scale.x = 2;
        this.sprite.scale.y = 2;
        this.sprite.anchor.set(0.5, 0.5);
        stoneBlockContainer.addChild(this.sprite);
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
        //this.sprite.scale.x = 2;
        //this.sprite.scale.y = 2;
        usernameColor = 0xFFFFFF;
        this.frameCount = 0;
        players.push(this);
        app.stage.addChild(this.sprite);
        this.username = username;
        this.usernameText = new PIXI.Text(username, {
            fontFamily: 'Mercutio',
            fontSize: 128,
            fill: usernameColor,
            align: 'center',
            resolution: 20
        });
        this.usernameText.scale.x = 0.25;
        this.usernameText.scale.y = 0.25;
        this.usernameText.x = Math.floor(this.sprite.x);
        this.usernameText.y = Math.floor(this.sprite.y - 45);
        this.usernameText.anchor.set(0.5, 0.5);
        app.stage.addChild(this.usernameText);
        setInterval(this.breathe.bind(this), 1500);
    }
    breathe() {
        if (this.frameCount % 2 == 0) {
            this.sprite.texture = playerTexture;
        } else {
            this.sprite.texture = playerTexture2;
        }
        this.frameCount++;
    }
    setPos(x, y) {
        this.sprite.x = Math.floor(x);
        this.sprite.y = Math.floor(y);
        this.usernameText.x = Math.floor(x);
        this.usernameText.y = Math.floor(y - 45);
    }
    destructor() {
        app.stage.removeChild(this.sprite);
        app.stage.removeChild(this.usernameText);
    }
}
var gallowsTexture = new PIXI.Texture.fromImage('assets/newgallows.png');
var gallowsSprite = new PIXI.Sprite(gallowsTexture);
gallowsSprite.anchor.set(0.5, 0.5);
gallowsSprite.scale.x = 2;
gallowsSprite.scale.y = 2;
gallowsSprite.x = Math.floor(app.renderer.width / 2);
gallowsSprite.y = Math.floor(app.renderer.height / 2) - 50;

var mainMessageClearTimeout;

function receiveMainMessage(text) {
    clearTimeout(mainMessageClearTimeout);
    setMainText(text);
    mainMessageClearTimeout = setTimeout(function () {
        setMainText("")
    }, 2000);
}

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
    if (mainText) {
        this.app.stage.removeChild(mainText.container);
        this.app.stage.addChild(mainText.container);
    }
    resize();
}

function resize() {
    const parent = app.view.parentNode;
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
    if (mainText) {
        mainText.reposition();
    }
    gallowsSprite.x = Math.floor(app.renderer.width / 2);
    gallowsSprite.y = Math.floor(app.renderer.height / 2) - 10;
    let positions = distributeInCircle(players.length, 170);
    for (let i = 0; i < players.length; i++) {
        players[i].setPos(gallowsSprite.x + positions[i][0], gallowsSprite.y + positions[i][1] + 20);
        if (positions[i][0] > 1) {
            players[i].sprite.scale.x = -1;
        } else {
            players[i].sprite.scale.x = 1;
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