console.log ('FlappyBird - Dev by Bruno - v1.0');

const colisionSound = new Audio(); //Insert audio 
colisionSound.src = './hit.wav';

const sprites = new Image();
sprites.src = './sprites.png'; // associates Image to our sprite file with all the icons

const canvas = document.querySelector('canvas'); // link to tag canavs from HTLM 
const context = canvas.getContext('2d'); // define 2D reslution for our canvas tag


function colision(FlappyBird, Floor){
    const FlappyBirdY = FlappyBird.canvasY + FlappyBird.Height;
    const floorY = Floor.canvasY;
    
    if(FlappyBirdY >= floorY) {
        return true;
    }
    return false;
    }
    

    //FlappyBird creation on screen
    function createFlappybird () {
        const FlappyBird = { // it is a global variable - all resources have access to this var
            spriteX: 248, // where is located at X axle in sprites file.
            spriteY: 747, // where is located at Y axle in sprites file.
            Width: 48,  
            Height: 48, 
            canvasX: 10, // destination (canvas) position
            canvasY: 50, // destination (canvas) position
            gravity: 0.25,    
            fall: 0,
            fly: 4.6,
            jump(){
                FlappyBird.fall = - FlappyBird.fly;
            },
            update(){
                if(colision(FlappyBird, globais.Floor)){
                  colisionSound.play(); //web audio API
                    setTimeout(() =>{
                        colisionSound.pause();
                    },3000);
                   
                  setTimeout(() =>{
                      ChangeScreen(Screen.Start);
                      
                  },3000);
                  
                    return;
                }
        
                FlappyBird.fall = FlappyBird.fall + FlappyBird.gravity;
                FlappyBird.canvasY = FlappyBird.canvasY + FlappyBird.fall;
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
        };
        return FlappyBird;
    }
    

//floor creation on screen
function createFloor (){
    const Floor = {
        spriteX: 456, // where is located at X axle in sprites file.
        spriteY: 1, // where is located at Y axle in sprites file.
        Width: 263,  
        Height: 83, 
        canvasX: 0, // destination (canvas) position
        canvasY: canvas.height - 83, // destination (canvas) position
        update(){
            const slideFloor = 1;
            const repeat = Floor.Width / 2;
            const moveFloor = Floor.canvasX - slideFloor;
            
            console.log('Floor', Floor.canvasX);
            console.log('repeat', repeat);
            console.log('moverFloor', moveFloor); 

            Floor.canvasX = moveFloor % repeat;
        },
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
    return Floor;
};

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

//GetReady creation on screen
const GetReady = {
    spriteX: 263, // where is located at X axle in sprites file.
    spriteY: 423, // where is located at Y axle in sprites file.
    Width: 178,  
    Height: 219, 
    canvasX: (canvas.width / 2) - 178 / 2, // destination (canvas) position
    canvasY: 55, // destination (canvas) position
    draw(){
        context.drawImage(
            sprites, // Name of the file with the image
            GetReady.spriteX, GetReady.spriteY,
            GetReady.Width, GetReady.Height,
            GetReady.canvasX, GetReady.canvasY,
            GetReady.Width, GetReady.Height,  
        );
    }
}

//Screens
function initialize(){
    globais.FlappyBird = createFlappybird(); 
    globais.Floor = createFloor();
};
const globais = {};
let ActiveScreen = {};
function ChangeScreen( newScreen) {
    ActiveScreen = newScreen;

    if(ActiveScreen.initialize){
        initialize();
    }
};

const Screen = {
    Start:{
        initialize(){
        },
        draw(){
            Background.draw();
            globais.Floor.draw();  
            globais.FlappyBird.draw();  
            GetReady.draw();
    },
        click(){
            ChangeScreen(Screen.Play);
    },

        update(){
            globais.Floor.update();

        },
    },

    Play:{
        draw(){
    Background.draw();
    globais.Floor.draw();  
    globais.FlappyBird.draw();   
        },

        click(){
    globais.FlappyBird.jump();
        },

        update(){
    globais.FlappyBird.update();
        },
    }

};

function loop(){     
    ActiveScreen.draw();
    ActiveScreen.update();

    requestAnimationFrame(loop); // function in JS to request the frame
}

window.addEventListener('click', function(){
    if (ActiveScreen.click){
        ActiveScreen.click();
    }
});

ChangeScreen(Screen.Start);
loop();
    
