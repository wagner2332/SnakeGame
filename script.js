let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0]= {
    x:8 * box,
    y:8 * box
}

let direction = "right";

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "CYAN";
    context.fillRect(0, 0, 16 * box, 16 * box);/*cria o espaço onde fica o jogo*/
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "hotpink";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "darkblue";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);/*quando o evento acontece chama a função*/

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('FIM DE JOGO :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

/*posição para iniciar a cobrinha*/
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
/*posição para add quadradinhos*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;


    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); /*para retirar o último elemento do array*/
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
/*acrescenta uma pecinha no primeiro elemento*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);