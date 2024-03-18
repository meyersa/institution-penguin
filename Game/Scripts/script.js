const canvas = document.querySelector('canvas');
 
const c = canvas.getContext('2d');

//canvas.width = window.innerWidth
//canvas.height = window.innerHeight

if(window.innerWidth <= 2048){
    canvas.width = window.innerWidth;
    canvas.height = ((window.innerWidth) / 1.777777);

}else{
    canvas.width = 1024 * 2
    canvas.height = 576 * 2
}

console.log(canvas.width)
console.log(canvas.height)

const collisionsMap = [];

for(let i = 0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, i+70));
}



class Boundary {
    static width = canvas.width/70.6206896552 //14.5 * 2
    static height = canvas.height/39.724137931 //14.5 * 2
    constructor({position}) {
        this.position = position;
        this.width = canvas.width/70.6206896552;
        this.height = canvas.height/39.724137931;
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0)';
        //c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}


//placing boundaries
const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == 1025){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width +4,
                        y: i * Boundary.height -4
                    }
             })
            )
        }
    })
})

//creating background and player images
const bgImage = new Image();
bgImage.src = './GameAssets/SnowMap.png';
const foreground = new Image();
foreground.src = './GameAssets/SnowMapforeground.png';
const playerImage = new Image();
playerImage.src = './GameAssets/playerDown.png';

//draws background image on screen after its fully loaded
bgImage.onload = () => {
    c.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    c.drawImage(foreground, 0, 0, canvas.width, canvas.height)
}

const playerImageWidth = (canvas.width/7.71875)/6
const playerImageHeight = (canvas.height/12.25)/2

//class for creating sprite
class Sprite{
    //constructor function
    constructor({position, velocity, image, frames = { max: 1} }){
        this.position = position;
        this.image = image;
        this.frames = frames;

        this.image.onload = () => {
            this.width = this.image.width/this.frames.max
            this.height = this.image.height

        }
    }
    


    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width/4,
            this.image.height, 
            this.position.x, 
            this.position.y,
            playerImageWidth,
            playerImageHeight
        )
        console.log(this.image.width)
        console.log(this.image.height)
    }
}

//creatin sprite object
const player = new Sprite({
    position:{
        x: canvas.width/3 - playerImage.width/2,
        y: canvas.height/2- playerImage.height/2
    },
    image: playerImage
})

//object to check for key press
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

//function to detect collisions -- does not handle collisions
function collisionDetection({object1, object2}){
    return(
        object1.position.x + object1.width/8 >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width/8 &&
        object1.position.y <= object2.position.y + object2.height/3 &&
        object1.position.y + object1.height/3 >= object2.position.y
    )
}


function animate() {
    window.requestAnimationFrame(animate)

    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw the background image
    c.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    boundaries.forEach(boundary => {boundary.draw()})
        
    player.draw();

    //loading foreground image last
    c.drawImage(foreground, 0, 0, canvas.width, canvas.height)

   
    let moving = true;

    console.log(moving);

    //"W" pressed
    if(keys.w.pressed){
        //collision detection
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                collisionDetection({
                    object1: player,
                    object2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 2
                    }}
                })
            ){
                console.log("Colliding");
                moving = false;
                break;
            }
        }

        //only move if not colliding
        if(moving)
            player.position.y -=2;

    }
    //"A" pressed
    else if(keys.a.pressed){
        //collision detection
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                collisionDetection({
                    object1: player,
                    object2: {...boundary, position: {
                        x: boundary.position.x + 2,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log("Colliding");
                moving = false;
                break;
            }
        }
        //only move if not colliding
        if(moving)
            player.position.x -=2;
    }
    //"S" pressed
    else if(keys.s.pressed){
        //collision detection
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                collisionDetection({
                    object1: player,
                    object2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 2
                    }}
                })
            ){
                console.log("Colliding");
                moving = false;
                break;
            }
        }
        //only move if not colliding
        if(moving)
            player.position.y +=2;
    }
    //"D" pressed
    else if(keys.d.pressed){
        //collision detection
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                collisionDetection({
                    object1: player,
                    object2: {...boundary, position: {
                        x: boundary.position.x - 2,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log("Colliding");
                moving = false;
                break;
            }
        }
        //only move if not colliding
        if(moving)
            player.position.x +=2;
    }
}

animate()






//Called when any key is pressed
window.addEventListener('keydown', (e) => {
    //E Key Press
    switch(e.key){
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;

    }
})
//Ccalled when key is lifted
window.addEventListener('keyup', (e) => {
    //E Key Press
    switch(e.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;

    }
})
