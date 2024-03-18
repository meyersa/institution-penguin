const canvas = document.querySelector('canvas');
 
const c = canvas.getContext('2d');

//canvas.width = window.innerWidth
//canvas.height = window.innerHeight

canvas.width = 1024
canvas.height = 576

const collisionsMap = [];

for(let i = 0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, i+70));
}



class Boundary {
    static width = 14.5
    static height = 14.5
    constructor({position}) {
        this.position = position;
        this.width = 14.5;
        this.height = 14.5;
    }

    draw(){
        //c.fillStyle = 'rgba(255, 0, 0, 0)';
        c.fillStyle = 'red'
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
bgImage.src = './GameAssets/EntireMap.png';
const foreground = new Image();
foreground.src = './GameAssets/foreground.png';
const playerImage = new Image();
playerImage.src = './GameAssets/playerDown.png';

//draws background image on screen after its fully loaded
bgImage.onload = () => {
    c.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    c.drawImage(foreground, 0, 0, canvas.width, canvas.height)
}


//class for creating sprite
class Sprite{
    //constructor function
    constructor({position, velocity, image, frames = { max: 4} }){
        this.position = position;
        this.image = image; this.frames = {...frames, val: 0, elapsed: 0};
       

        this.image.onload = () => {
            this.width = this.image.width/this.frames.max
            this.height = this.image.height

        }

        this.moving = false
    }
    
    draw(){
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width/4,
            this.image.height, 
            this.position.x, 
            this.position.y,
            this.image.width/8,
            this.image.height/3
        )
        if(this.moving){
            if(this.frames.max > 1){
                this.frames.elapsed++
            }

            if(this.frames.elapsed % 10 === 0){
                if (this.frames.val < this.frames.max - 1){
                    this.frames.val++;
                } 
                else {
                    this.frames.val = 0
                }
            }
        }
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
    player.moving = false;



    //"W" pressed
    if(keys.w.pressed){
        player.moving = true

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
