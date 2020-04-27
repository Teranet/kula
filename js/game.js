var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    parent: 'game-div',
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
    }
};
window.addEventListener('resize', resizeApp);


var game = new Phaser.Game(config);
var opencards = 12;
var cardcolor = [
    0x6666ff,
    0x9966ff,
    0xff6699,
    0xff33cc
];
var randomfood = [
    'beet',
    'carrot',
    'cauliflower',
    'corn',
    'orange',
    'peach',
    'potato',
    'pumpkin',
    'rasberry',
    'sesame',
    'zucchini',
    'danger',
    'danger',
    'danger',
    'danger'
];
var danger = 'danger';
var explosion;
var button_play_x;
var button_play_y;
var controlbtn;

function preload ()
{
    this.load.image('beet', 'assets/icons8-beet-96.png');
    this.load.image('carrot', 'assets/icons8-carrot-96.png');
    this.load.image('cauliflower', 'assets/icons8-cauliflower-96.png');
    this.load.image('corn', 'assets/icons8-corn-96.png');
    this.load.image('orange', 'assets/icons8-orange-96.png');
    this.load.image('peach', 'assets/icons8-peach-96.png');
    this.load.image('potato', 'assets/icons8-potato-96.png');
    this.load.image('pumpkin', 'assets/icons8-pumpkin-96.png');
    this.load.image('rasberry', 'assets/icons8-raspberry-96.png');
    this.load.image('sesame', 'assets/icons8-sesame-96.png');
    this.load.image('zucchini', 'assets/icons8-zucchini-96.png');
    this.load.image('danger','assets/icons8-bomb-96.png');
    this.load.multiatlas('bg', 'assets/bg.json', 'assets');
    this.load.audio('boom', ['assets/explosion.mp3','assets/Explosion.ogg']);
    this.load.image('button_play','assets/button_play.png');
    this.load.image('button_stop','assets/button_stop.png');
    
}

function create ()
{
    //we set the background image
     var background = this.add.sprite(0, 80, 'bg', 'bg.png');
     button_play_x = background.x +500;
     button_play_y = background.y +650;
    
     controlbtn = this.add.sprite(button_play_x, button_play_y, 'button_play').setInteractive();
     controlbtn.on('pointerdown', actionOnClick);
     this.add.text(450, 40, '| Balance: Ksh 1000', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
     this.add.text(150, 40, ' User x: Won, 12 | User Y: Won 1233', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

     explosion = this.sound.add('boom');
     var boarder = this.add.rectangle(298, 385, 590, 600).setStrokeStyle(2, 0xff69b4);
     var x =80;
     var y =170;
     for (let index = 1; index < 13; index++) {
         var randomcolor = cardcolor[Math.floor(Math.random()*cardcolor.length)];
         card= this.add.rectangle(x, y, 120, 120, randomcolor).setStrokeStyle(4,0xefc53f);
         x=x+140;
         if ((index % 4 == 0)) {
             x=80;
             y=y+170;
         }
         card.setInteractive();
         card.on('clicked', cardclick, this);

         
     }
     this.input.on('gameobjectup', function (pointer, gameObject)
     {
         gameObject.emit('clicked', gameObject);
     }, this);

     resizeApp();
}

function update (time, delta)
{
    
}

function cardclick(card){
card.input.enabled = false;
this.tweens.add({
    x: card.x,
    targets: card,
    duration: 500,
    yoyo: false,
    flipX: true,
    repeat: 0,
    ease: 'Sine.easeInOut'

})
this.add.rectangle(card.x, card.y, 120, 120, 0xffffff).setStrokeStyle(4,0xefc53f);
var foodID = Math.floor(Math.random()*randomfood.length);
var randfood = randomfood[foodID];
randomfood.splice(foodID,1);

card =this.add.image(card.x, card.y, randfood);
card.displayWidth =120;
card.scaleY = card.scaleX;
opencards--;
let clicked = card.texture.key;
console.log("remaining cards --> "+opencards+" NAME::->"+clicked);
if (clicked == 'danger') {
    explosion.play();
    
    


}

}



function resizeApp ()
{
	// Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
	let game_ratio		= 600 / 800;
	
	// Make div full height of browser and keep the ratio of game resolution
	let div			= document.getElementById('game-div');
	div.style.width		= (window.innerHeight * game_ratio) + 'px';
	div.style.height	= window.innerHeight + 'px';
	
	// Check if device DPI messes up the width-height-ratio
	let canvas			= document.getElementsByTagName('canvas')[0];
	
	let dpi_w	= parseInt(div.style.width) / canvas.width;
	let dpi_h	= parseInt(div.style.height) / canvas.height;		
	
	let height	= window.innerHeight * (dpi_w / dpi_h);
	let width	= height * game_ratio;
	
	// Scale canvas	
	canvas.style.width	= width + 'px';
	canvas.style.height	= height + 'px';
}


function actionOnClick () {

    console.log('click');

    controlbtn.inputEnabled = false;

    // this.game.canvas.style.cursor = "default";

}






