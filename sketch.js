var dog,sadDog,happyDog, database; 
var foodS,foodStock; 
var fedTime,lastFed=0; 
var feed,addFood, gameState;
var foodObj, update, readGameState, bedroomImg, washroomImg, gardenImg; 
function preload(){ 
    sadDog=loadImage("Dog.png"); 
    happyDog=loadImage("happydog.png");
    bedroomImg=loadImage("BedRoom.png");
    washroomImg=loadImage("WashRoom.png") 
    gardenImg=loadImage("Garden.png");
} 
function setup() { 
    database=firebase.database(); 
    createCanvas(1000,400); 
    foodObj = new Food(); 
    foodStock=database.ref('Food'); 
    foodStock.on("value",readStock); 
    dog=createSprite(800,200,150,150); 
    dog.addImage(sadDog); 
    dog.scale=0.15; 
    feed=createButton("Feed the dog"); 
    feed.position(700,95); 
    feed.mousePressed(feedDog); 
    addFood=createButton("Add Food"); 
    addFood.position(800,95); 
    addFood.mousePressed(addFoods); 
    readGameState = database.ref('gameState');
    readGameState.on("value", function(data){
        gameState=data.val();
    });
} 
function draw() { 
    background(46,139,87); 
 
    
       
  currentTime=hour();
        if(currentTime == (lastFed+1)){
            update("Playing");
            foodObj.garden();
        }else if (currentTime==(lastFed+2)){
            update("Sleeping");
            foodObj.bedroom();
            }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
                update("Bathing"); 
                foodObj.washroom();
              
           
                }else{ 
                   update("Hungry");
                    foodObj.display();

                }

                if(gameState!="Hungry"){
                    feed.hide();
                    addFood.hide();
                    dog.remove();
                }else{
                    feed.show();
                    addFood.show();
                    dog.addImage(sadDog);
                }          
drawSprites();

            
            }
    
 
//function to read food Stock 
function readStock(data){ 
    foodS=data.val(); 
    foodObj.updateFoodStock(foodS); 
} 
//function to update food stock and last fed time 
function feedDog(){ 
    dog.addImage(happyDog); 
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   
    database.ref('/').update({ 
        Food:foodObj.getFoodStock(), 
        FeedTime:hour() ,
    gameState:"Hungry"
    })
        
        
    } 
    //function to add food in stock 
    function addFoods(){ 
        foodS++; 
        database.ref('/').update({ Food:foodS }) 
    }
function update(state){
    database.ref('/').update({
        gameState : state
    })
}
