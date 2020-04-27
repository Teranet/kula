var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade'
    }
};


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
    this.load.image('danger','assets/icons8-poison-96.png');
    this.load.multiatlas('bg', 'assets/bg.json', 'assets');
    
}

function create ()
{
    //we set the background image
     var background = this.add.sprite(0, 80, 'bg', 'bg.png');
     
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

}

function update ()
{
    
}

function cardclick(card){
card.input.enabled = false;
this.tweens.add({
    x: card.x,
    targets: card,
    duration: 500,
    //angle: 180,
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
console.log("remaining cards --> "+opencards);

}




