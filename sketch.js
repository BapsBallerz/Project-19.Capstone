var rocket, rocketImg;
var space, spaceImg;
var asteroid, asteroidImg, asteroidsGroup;
var gameState = "play";
var invisibleWall, invisibleWallGroup;



function preload(){
spaceImg = loadImage("space.jpeg");
rocketImg = loadImage("rocket.png");
asteroidImg = loadImage("asteroid.jpeg");
}

function setup() {
    createCanvas(600, 600);
    rocket = createSprite(300, 550, 50, 50);
    rocket.addImage(rocketImg);
    rocket.scale = 0.15;

    //space = createSprite(600, 600);
    //space.addImage("space", spaceImg);

    

    asteroidsGroup = new Group();
    invisibleWallGroup = new Group();
}
 

function draw() {
    background(spaceImg);
    if(gameState ==="play") {

        if(keyDown("RIGHT_ARROW")) {
            rocket.x = rocket.x+3;
        }
        
        if(keyDown("LEFT_ARROW")) {
            rocket.x = rocket.x-3;
        }

        if(keyDown("SPACE")) {
            rocket.velocityY = -10;
        }
        
        rocket.velocityY = rocket.velocityY + 0.75;

        if(spaceImg.y>400) {
            spaceImg.y = 300;
        }


        spawnAsteroids();

     if(rocket.isTouching(invisibleWallGroup)) {
            rocket.velocityY = 0;
     }

       if(asteroidsGroup.isTouching(rocket)) {
           rocket.velocityY = 0;
       }

       if(invisibleWallGroup.isTouching(rocket)||
       rocket.y>600) {
           rocket.destroy();
           gameState = "end";
       }


    }






    drawSprites();
    
}

if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
}

function spawnAsteroids() { 
    if(frameCount % 240 === 0) {
        asteroid = createSprite(200, -50);
        asteroid.scale = 0.25;
        asteroid.x = Math.round(random(120, 400));
        asteroid.addImage(asteroidImg);
        asteroid.velocityY = 1;
        rocket.depth = asteroid.depth;
        rocket.depth += 1
        asteroid.lifetime = 800;
        asteroidsGroup.add(asteroid);
    }
}