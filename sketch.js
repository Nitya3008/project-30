const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var wall1,wall2,ground;
var stones=[];

function preload(){
  zombieImg=loadImage("./assets/zombie.png");
  backgroundImg=loadImage("./assets/background.png");
  buttonImg=loadImage("./assets/axe.png");
 bridgeImg=loadImage("./assets/wood.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  frameRate(80);

 wall1=new Base(200, height / 2 + 50, 600, 100, "#8d6e63", true);
 wall2 = new Base(width - 200, height / 2 + 50, 600, 100, "#8d6e63", true);
ground=new Base(0,height-10,width*2,20,"#795548",true);
 bridge=new Bridge(15,{x:width/2-300,y:height/2});
 
 jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);

 zombie=createSprite(width/2,height-110);
 zombie.addImage("zombie",zombieImg);
 zombie.scale=0.1;
 zombie.velocityX=-10;

 breakButton=createButton("buttonImg");
 breakButton.position(width-200,height/2-50);
 breakButton.mousePressed(handleButtonPress)

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    
    stones.push(stone);
  }
 

}

function draw() {
  background(51);
  image(backgroundImg,0,0,width,height);
  Engine.update(engine);

 ground.show();
 wall1.show();
 wall2.show();
 bridge.show();
 
  for (var stone of stones) {
    stone.show();
  }
  drawSprites();
}

function handleButtonPress(){
  bridge.break();
  
  setTimeout(()=>{
    jointLink.detach();
  },1500);
}