// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game', // Asegúrate de que el canvas se añada al div con id "game"
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicialización del juego
const game = new Phaser.Game(config);

let player;
let stars;
let cursors;
let score = 0;
let scoreText;

function preload() {
    this.load.image('sky', 'https://examples.phaser.io/assets/skies/space3.png');
    this.load.image('ground', 'https://examples.phaser.io/assets/sprites/platform.png');
    this.load.image('star', 'https://examples.phaser.io/assets/demoscene/star.png');
    this.load.spritesheet('dude', 'https://examples.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Fondo
    this.add.image(400, 300, 'sky');

    // Plataforma estática
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Jugador
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // Estrellas
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Colisiones
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    // Superposición para recoger estrellas
    this.physics.add.overlap(player, stars, collectStar, null, this);

    // Texto de puntuación
    scoreText = this.add.text(16, 16, 'Puntuación: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Puntuación: ' + score);
}
