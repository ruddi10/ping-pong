//background color
function backgroundcolor(){
    let x= Math.floor(Math.random()*255);
    let y= Math.floor(Math.random()*255);
    let z= Math.floor(Math.random()*255);
    document.querySelector("body").style.backgroundColor=`rgba(${x},${y},${z})`;
}

setInterval(backgroundcolor,1000);


var c= document.getElementById("game");
c.width=850;
c.height=400;
var contx= c.getContext("2d");
 
// move userhandle
window.addEventListener("mousemove",userhandle);
function userhandle(){
    user.y= (event.y/window.innerHeight)*(c.height-user.height);
}

// move computer handle
function comphandle(b){
    if(b-comp.height/2<= 0){
        comp.y=comp.height*0.25;
    }
    else if(b+comp.height/2==c.height)
        {
            comp.y=(c.height-comp.height)*0.75;
        }
    else{
    comp.y=( b-comp.height/2)*0.75;
    }
}
function restart(){
   ball.x=425;
    ball.y=200;
    ball.speed=5*Math.pow(2,0.5);
    ball.velocityX=5;
    ball.velocityY=5;
}
//collission detector
function collission(){
    if(ball.x-ball.r-user.width<=0||ball.x+ball.r+comp.width>=c.width)
    {     
            if(user.y-ball.r<=ball.y&&ball.y<=user.y+ball.r+user.height&&ball.x<c.width/2)
                {
                
                    return true;
                }
            else if (comp.y - ball.r <= ball.y && ball.y <= comp.y + ball.r + comp.height && ball.x > c.width / 2) {
                return true;

            }


            else {
                return false;
            }

    }
    else{
        return false;
    }
}


// make rectangle
function rect(x,y,w,h,color)
{   
    contx.fillStyle = color;
    contx.fillRect(x,y,w,h);

   
}
// make circle
function circle(x,y,r,color){
contx.beginPath();
contx.fillStyle= color;
contx.arc(x,y,r,0,Math.PI*2,false);
contx.fill();
}
// make net
function net(){
    for(i=0;i<10;i++){
        rect(420,i*40+4,5,31);
    }
}
// write text
function text(score,x,y){
contx.font= "60px fantasia";
contx.fillStyle="white";
contx.fillText(score,x,y);
}

// user object
var user={
    x:0,
    y:150,
    color:"#ffffff",
    width:30,
    height:100,
    score:0,
}
//computer object
var comp={
    x:820,
    y:150,
    color:"#ffffff",
    width:30,
    height:100,
    score:0,
}

// ball object
var ball={
    x:425,
    y:200,
    color:"white",
    r:20,
    speed:5*Math.pow(2,0.5),
    velocityX:5,
    velocityY:5,
}
// fuction that display diff components
function render(){
contx.clearRect(0, 0, c.width, c.height);
rect(user.x,user.y,user.width,user.height,user.color);
rect(comp.x,comp.y,comp.width,comp.height,comp.color);
circle(ball.x,ball.y,ball.r,ball.color);
net();
text(user.score,212.5,70);
text(comp.score,637.5,70);

}
function update(){
   
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    comphandle(ball.y);
    if(ball.y+ball.r>=c.height||ball.y-ball.r<=0){
        ball.velocityY=-ball.velocityY;

    }
    

    
    if(collission())
    {  
       player= ball.x<425?user:comp;
       dir= ball.x<425?1:-1;
         a =( ball.y-(player.y+player.height/2))/(player.height/2+ball.r)*Math.PI/4;
        ball.speed +=0.1;
            ball.velocityX = dir*ball.speed*Math.cos(a);
            ball.velocityY =ball.speed*Math.sin(a) ;

    }
    if(ball.x-ball.r<=0)
    {
        comp.score++;
        restart();
    }
    if(ball.x+ball.r>=c.width)
    {
        user.score++;
        restart();
}
  
}
// 
function game(){
    update();
    render();
}
setInterval(game,1000/50);