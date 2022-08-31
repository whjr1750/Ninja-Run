var enemies
var bg , bgImg ;
var ninja , ninjaImg ;
var ninjaFire , ninjaFireImg ;
var bird , birdImg ;
var enemy1 , enemy1Img  , enemy2 , enemy2Img , enemy3 , enemy3Img , enemy4 , enemy4Img  , enemy5 , enemy5Img , enemy6 , enemy6Img ;
var weapon , weaponImg ;
var enemyGroup , weaponGroup ;
var gameOver , gameOverImg ;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score = 0;
var bgSound , enemyKillSound , gameOverSound , arrowDestroySound ; 
var gameWonSound;
var win , winImg ;
var winBg , winBgImg ;
var devil , devilImg , arrow , arrowImg ;
var arrowGroup ;
var chilli , chilliImg ;
var restart , restartImg ;
var shieldGroup ;
var ninjalist=[]
//-----------------------------------------------------------------------------------------------------------------------------------

function preload()
{
	bgImg = loadImage("bg.jpg");
	ninjaImg = loadAnimation("ninja1.png","ninja2.png","ninja3.png","ninja4.png","ninja5.png","ninja6.png");
	ninjaFireImg = loadAnimation("ninjafire1.png" , "ninjafire2.png" , "ninjafire3.png" , "ninjafire4.png" , "ninjafire5.png" , "ninjaFire6.png");
	birdImg = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png");
	enemy1Img = loadImage("enemy1.png");
	enemy2Img = loadImage("enemy2.png");
	enemy3Img = loadImage("enemy3.png");
	enemy4Img = loadImage("enemy4.png");
	enemy5Img = loadImage("enemy5.png");
	enemy6Img = loadImage("enemy6.png");
	weaponImg = loadImage("weapon.png");
	gameOverImg = loadImage("gameOver.png");
	bgSound = loadSound("bg-music.mp3");
	gameWonSound = loadSound("game-win.mp3");
	enemyKillSound = loadSound("destroy-enemy_.mp3");
	gameOverSound = loadSound("game-over.wav");
	arrowDestroySound = loadSound("arrow-destroy.mp3");
	winImg = loadImage("you-win.png");
	winBgImg = loadImage("win-bg.jpg");
	devilImg = loadImage("devil.png");
	arrowImg = loadImage("arrow...png");
	chilliImg = loadImage("shield.png");
	restartImg = loadImage("restart.png");
	
}

//---------------------------------------------------------------------------------------------------------------------------------------

function setup() {

	createCanvas(700, 360);

	if(gameState === PLAY){
		bgSound.play();
	} ;

	

	 if(gameState === END){
		gameOverSound.play();
		console.log("yup");
	}
	
	// moving background 
	bg = createSprite(500,180);
	bg.addImage(bgImg);
	bg.velocityX = -5;


	// creating ninja
	ninja = createSprite(80 , 240 , 50 ,50);
	ninja.scale = 0.8
	ninja.addAnimation("ninja",ninjaImg);
	

	// creating bird
	bird = createSprite(150 , 130 , 20 , 20);
	bird.addAnimation("bird",birdImg);
	bird.scale = 0.5
	bird.x = ninja.x ;

	//game over
	gameOverSprite=createSprite(350,100,10,10);
	gameOverSprite.addImage("gameover",gameOverImg);
	gameOverSprite.visible=false;

	// making restart image
	restart = createSprite(350 , 180 , 10 , 10);
	restart.addImage(restartImg);
	restart.scale = 0.5 ;
	restart.visible = false ;

	// making devil
	devil = createSprite(650 , 40 , 10 , 10);
	devil.addImage(devilImg);
	devil.scale = 0.2 ;
	
	
	
	// making groups
	enemyGroup = new Group();
	weaponGroup = new Group();
	arrowGroup = new Group();
	shieldGroup = new Group();
	
}

//-----------------------------------------------------------------------------------------------------------------------------------------

function draw() {
background(0);

drawSprites();

//~~~~~~~~~~~~~~~~~~~~~~~~

if(gameState===PLAY){
	
// calling functions
spawnEnemies();
spawnArrows();


//code to reset the background
if(bg.x < 290 )
{
   	   bg.x = width/2;
}
	
// creating weapon
if(keyDown("space")){
	spawnWeapon();
}

// creating chilli weapon
if(keyDown(RIGHT_ARROW)){

	spawnShield();
	ninjalist[0]=ninja;
	ninjalist[1]=ninja;

}

if(arrowGroup.collide(shieldGroup)){
	console.log("hello")
	shieldGroup.destroyEach();
	arrowGroup.destroyEach();
	ninjalist.pop();
}





if(ninja.isTouching(arrowGroup)){
	gameState=END ;
	gameOverSound.play();
	console.log("gameover");
	
} 
if(ninja.isTouching(enemyGroup)){
	gameState=END ;
	gameOverSound.play();
	console.log("gameover");
	
} 
if(score === 30){
	gameState=END;
	gameWonSound.play();

}

}

//~~~~~~~~~~~~~~~~~~~~~~~~



else if(gameState === END){

bg.velocityX = 0;
ninja.destroy()
bird.visible=false;
enemyGroup.setVelocityXEach(0);
enemyGroup.destroyEach();
weaponGroup.destroyEach();
arrowGroup.destroyEach();
enemyGroup.setLifetimeEach(-1);
gameOverSprite.visible=true;
//restart.visible = true ;
devil.destroy();


fill("black");
textSize(17)
text("Press CTRL+R TO RESTART THE GAME" , 200 , 200);


}

//~~~~~~~~~~~~~~~~~~~~~~~~


if(score === 30){

	win = createSprite(350 , 200 , 20 , 20);
	win.addImage(winImg);
	win.scale = 1 ;
	win.Lifetime = 2

	ninja.visible=false;
	bg.velocityX = 0;
	bird.visible=false;
	enemyGroup.setVelocityXEach(0);
	enemyGroup.destroyEach();
	weaponGroup.destroyEach();
	enemyGroup.setLifetimeEach(-1);

	winBg = createSprite(350,180);
	winBg.addImage(winBgImg);
	winBg.scale = 0.37
}

/* destroying arrow
if(chilli.isTouching(arrowGroup)){
	arrowGroup.destroyEach();
} */

//~~~~~~~~~~~~~~~~~~~~~~

// text
textSize(17)
fill("black");
text("SCORE : "+score,450,20);
fill("red");
fill("red")
text("GOAL : 30", 320 , 20);
fill("#018184")
textSize(12)
text("ZOOM '175' FOR THE BEST EXPERIANCE", 3 , 20);
text("Use SPACE to fire" , 3 , 35);
text("Use RIGHT ARROW to save Ninja from Arrows", 115 , 35);

}
 


//--------------------------------------------------------------------------------------------------------------------------------------------

function spawnEnemies(){

	if(frameCount % 60 === 0 ){
		
		enemies = createSprite(random(700,750),random(255,256)) ;
		enemies.velocityX = -4
		
		
		var rand = Math.round(random(1,6));
		switch(rand) {

			case 1:enemies.addImage(enemy1Img);
				   enemies.scale = 0.5
				   break;
			case 2:enemies.addImage(enemy2Img);
				   enemies.scale = 0.4
				   break;
			case 3:enemies.addImage(enemy3Img);
				   enemies.scale = 0.4
				   break;
			case 4:enemies.addImage(enemy4Img);
				   enemies.scale = 0.35
				   break;
			case 5:enemies.addImage(enemy5Img);
				   enemies.scale = 0.4
				   break;
			case 6:enemies.addImage(enemy6Img);
				   enemies.scale = 0.39
				   break;
			default: break;
		
		}
		enemyGroup.add(enemies);
	
	}

	//-----------------------------------------------------------------------------------------------------------------------------------

	for(i=0;i<enemyGroup.length;i=i+1){
      
		if(weaponGroup.isTouching(enemyGroup.get(i))){
		  score=score+1;
		  enemyGroup.get(i).destroy();
		  weaponGroup.setLifetimeEach(-1);
		  weaponGroup.destroyEach();
		  enemyKillSound.play();
		 
		}
 
     }
	}

	for(a=0;a<shieldGroup.length;a=a+1){

		if(arrowGroup.isTouching(enemyGroup.get(a))){
			shieldGroup.get(a).destroy();
			arrowGroup.setLifetimeEach(-1);
			arrowGroup.destroyEach();
			arrowDestroySound.play();
			console.log("arrow")
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------

function spawnWeapon(){

	weapon = createSprite(150 , 240 , 20 , 20);
	weapon.addImage(weaponImg);
	weapon.velocityX=6;
	weapon.scale = 0.2 ;
	weapon.x = ninja.x ;
	weapon.y = ninja.y ;
	weaponGroup.add(weapon);
}

//-------------------------------------------------------------------------------------------------------------------------------------

function spawnArrows(){

	if(frameCount % 100 === 0){
		arrow = createSprite( 650 , 50 , 20 , 20 );
		arrow.addImage(arrowImg);
		arrow.scale = 0.15 ;
		arrow.velocityX = -25 ;
		arrow.velocityY = 9 ;

		arrowGroup.add(arrow);
	}
	
}

//-------------------------------------------------------------------------------------------------------------------------------------

function spawnShield(){
	
	chilli = createSprite(90 , 240 , 100 , 100)
	chilli.addImage(chilliImg);
	//chilli.debug=true
	chilli.scale = 0.6 ;
	shieldGroup.add(chilli);

}