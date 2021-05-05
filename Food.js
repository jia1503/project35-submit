class Food { 
    constructor(){ 
        this.foodStock=0; 
        this.lastFed; 
        this.image=loadImage('Milk.png'); 
    } 
    updateFoodStock(foodStock){ 
        this.foodStock=foodStock; 
    } 
    getFedTime(lastFed){ 
        this.lastFed=lastFed; 
    } 
    deductFood(){ 
        if(this.foodStock>0){ 
            this.foodStock=this.foodStock-1; 
        } 
    } 
    getFoodStock(){ 
        return this.foodStock; 
    } 
    display(){ 
       
textSize(10);
fill ("yellow");
        if(lastFed>=12){ 
            text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
        }
        else if(lastFed==0){ 
            text("Last Feed : 12 AM",350,30); 
        }else{ 
            text("Last Feed : "+ lastFed + " AM", 350,30);
        }

        var x=80,y=100; 
        

        if(this.foodStock!==0){ 
            for(var i=0;i<this.foodStock;i++){ 
                if(i%10==0){ x=80; y=y+50; 
                } 
                image(this.image,x,y,50,50); x=x+30; 
            } 
        } 
    } 

    bedroom(){
      background(bedroomImg,550,500);
    }

    garden(){
      background(gardenImg, 550, 500);
    }

    washroom(){
      background(washroomImg, 550, 500);
    }
}