var player,mushroom,mushroomGroup,spider,bullet,bulletGroup,centipede,centipede_img;
var mushroom_img,player_img,spider_img;
var health,h1,h2,h3,h4,h5,h6,bar;
function preload(){
  //mushroom_img=loadImage("");
  //player_img=loadImage("");
  spider_img=loadImage("spp.png");
  mushroom_img=loadImage("mushroom.png");
  h1=loadImage("h1.png");
  h2=loadImage("h2.png");
  h3=loadImage("h3.png");
  h4=loadImage("h4.png");
  h5=loadImage("h5.png");
  h6=loadImage("h6.png");
}
function setup() {
  createCanvas(500,500);
  player=createSprite(300, 480, 20, 20);

centipede=createSprite(10,10,50,10);
centipede.shapeColor="green";
centipede.velocityX=2;
mushroomGroup=new Group();
  for (var i=0;i<20  ;i++){
    mushroom=createSprite(random(20,470),random(20,340),10,10);
    mushroomGroup.add(mushroom);
    mushroom.addImage(mushroom_img);
    mushroom.scale=0.1;
    
    mushroom.setCollider("circle",0,0,70)
  }

  spider=createSprite(500,390,15,15);
  spider.addImage("spider",spider_img);
  spider.scale=0.3;
  
  spider.setCollider("circle",0,0,70)
  spider.velocityX=-2;
  spider.velocityY=-2;
  bulletGroup=new Group();

  health=100;

  bar=createSprite(450,10);
  bar.scale=0.2;
}


function draw() {
  background(0);  
player.x=mouseX;
player.y=mouseY;
  if(player.y<350){
    player.y=350;
  }

  if(spider.y<350){
    spider.velocityY=spider.velocityY*(-1);
  }
  if(spider.y>496){
    spider.velocityY=spider.velocityY*(-1);
  }
  if(spider.x<2){
    spider.velocityX=spider.velocityX*(-1);
  }
  if(spider.x>501){
    spider.velocityX=spider.velocityX*(-1);
  }

  if(keyDown("space")){
    bullet=createSprite(player.x,player.y,3,7);
    bullet.shapeColor="red";
    bullet.velocityY=-10;
    bulletGroup.add(bullet);
  }
  if(centipede.x>490||centipede.x<10||mushroomGroup.isTouching(centipede)){
    centipede.velocityX=centipede.velocityX*(-1);
    centipede.y+=5;
  }
  for(var i=0;i<bulletGroup.length;i++){
    if(bulletGroup.get(i).isTouching(centipede)){
      bulletGroup.get(i).destroy();
      health-=4;
      console.log(health);
    }
  }
  switch(health){
    case 100:bar.addImage(h6);
    break;
    case 80:bar.addImage(h5);
    break;
    case 60:bar.addImage(h4);
    break;
    case 40:bar.addImage(h3);
    break;
    case 30:bar.addImage(h2);
    break;
    case 10 :bar.addImage(h1);
    break;
  }
 if(centipede.isTouching(player)||spider.isTouching(player)){
    destroyGame();
  }

  if(health===0){
    destroyGame();
  }
  drawSprites();
}
function destroyGame(){
  bulletGroup.destroyEach();
  centipede.destroy();
  mushroomGroup.destroyEach();
  spider.destroy();
  player.destroy();
  bar.destroy();
  textSize(30);
  fill(255);
  text("GAME OVER",200,200)
}