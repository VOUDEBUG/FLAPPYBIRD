console.log ('FlappyBird - Dev by Bruno - v1.0');

const sprites = new Image();
sprites.src = './sprites.png'; // associates Image to our sprite file with all the icons

const canvas = document.querySelector('canvas'); // link to tag canavs from HTLM 
const context = canvas.getContext('2d'); // define 2D reslution for our canvas tag

//FlappyBird creation on screen
const FlappyBird = {
    spriteX: 248, // where is located at X axle in sprites file.
    spriteY: 747, // where is located at Y axle in sprites file.
    Width: 48,  
    Height: 48, 
    canvasX: 10, // destination (canvas) position
    canvasY: 50, // destination (canvas) position
    update(){
        FlappyBird.canvasY = FlappyBird.canvasY +1;
    },
    draw(){
        context.drawImage(
            sprites, // Name of the file with the image
            FlappyBird.spriteX, FlappyBird.spriteY,
            FlappyBird.Width, FlappyBird.Height,
            FlappyBird.canvasX, FlappyBird.canvasY,
            FlappyBird.Width, FlappyBird.Height,  
        );
    }
}

//floor creation on screen
const Floor = {
    spriteX: 456, // where is located at X axle in sprites file.
    spriteY: 1, // where is located at Y axle in sprites file.
    Width: 263,  
    Height: 83, 
    canvasX: 0, // destination (canvas) position
    canvasY: canvas.height - 83, // destination (canvas) position
    draw(){
        context.drawImage(
            sprites, // Name of the file with the image
            Floor.spriteX, Floor.spriteY,
            Floor.Width, Floor.Height,
            Floor.canvasX, Floor.canvasY,
            Floor.Width, Floor.Height,  
        );
        context.drawImage(
            sprites, // Name of the file with the image
            Floor.spriteX, Floor.spriteY,
            Floor.Width, Floor.Height,
            (Floor.canvasX + Floor.Width), Floor.canvasY,
            Floor.Width, Floor.Height,  
        );
    }
}

//Background creation on screen
const Background = {
    spriteX: 1, // where is located at X axle in sprites file.
    spriteY: 1, // where is located at Y axle in sprites file.
    Width: 223,  
    Height: 397, 
    canvasX: 0, // destination (canvas) position
    canvasY: 0, // destination (canvas) position
    draw(){
        context.drawImage(
            sprites, // Name of the file with the image
            Background.spriteX, Background.spriteY,
            Background.Width, Background.Height,
            Background.canvasX, Background.canvasY,
            Background.Width, Background.Height,  
        );
        context.drawImage(
            sprites, // Name of the file with the image
            Background.spriteX, Background.spriteY,
            Background.Width, Background.Height,
            (Background.canvasX + Background.Width), Background.canvasY,
            Background.Width, Background.Height,  
        );
    }
}


function loop(){  
    Background.draw();
    Floor.draw();  
    FlappyBird.draw();    
    FlappyBird.update();

    requestAnimationFrame(loop); // function in JS to request the frame
}

loop();
    