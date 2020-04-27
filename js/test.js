var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    //parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('diamonds', 'assets/icons8-beet-48.png', { frameWidth: 100, frameHeight: 100 });
    
    bmd = game.add.bitmapData(50, 50);

}

function create ()
{
    var group = this.add.group({
        key: 'diamonds',
        frame: [ 1, 2, 3, 4 ],
        frameQuantity: 1
    });
    

    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 800,
        height: 600,
        cellWidth: 150,
        cellHeight: 150,
        x: 100,
        y: 100
    });
}
