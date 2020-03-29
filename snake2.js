function init()
{
    canvas=document.getElementById('mycanvas');
    W=H=canvas.width=canvas.height=1000;
    pen=canvas.getContext('2d');
    cs=66;
    game_over=false;
    food=getRandomFood();

    snake={
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++)
           {    
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
           }
        },

        updateSnake:function(){
            console.log("updating snake accordingly");

            this.cells.pop(); 
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            
			var nextX,nextY;       

            if(this.direction=="right")
            {
                nextX=headX+1;
                nextY=headY;
            }
            else
            if(this.direction=="left")
            {
                nextX=headX-1;
                nextY=headY;
            }
            else
            if(this.direction=="down")
            {
                nextX=headX;
                nextY=headY+1;
            }
            else
            {
                nextX=headX;
                nextY=headY-1;
            }

           // var X=headX+1;
           // var Y=headY;
            this.cells.unshift({x:nextX,y:nextY});
            var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

            

        }


    };
    snake.createSnake();
    
    function keyPressed(e){
        if(e.key=="ArrowRight"){
            snake.direction=="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction=="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction=="down";
        }
        else {
            snake.direction=="up";
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake(); 
    pen.fillRect(food.x,food.y,cs,cs);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-cs)/cs);
    var foodY=Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food
}

function gameloop(){
    draw();
    update();
}


init();
var f=setInterval(gameloop,100);