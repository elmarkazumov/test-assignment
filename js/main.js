import { Render } from "./render.js";

const rects = [
    {
        width: 100,
        height: 100,
        posX: 50,
        posY: 50,
        color: '#e1cdf0',
        clickedStatus: false,
        stickingStatus: false,
    }, 
    {
        width: 100,
        height: 100,
        posX: 650,
        posY: 650,
        color: '#2eb1a4',
        clickedStatus: false,
        stickingStatus: false,
    }
    
];

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const playground = document.querySelector('.playground');
playground.appendChild(canvas);

canvas.width = 800;
canvas.height = 800;

const render = new Render(context);

render.drawRect(0, 0, canvas.width, canvas.height, '#dce6eb');

render.drawRect(rects[0].posX, rects[0].posY, rects[0].width, rects[0].height, rects[0].color);

render.drawRect(rects[1].posX, rects[1].posY, rects[1].width, rects[1].height, rects[1].color);

let isDragging = false;

function handleMouseMove(event) {
    if(!isDragging) {
        return;
    }

    const canvasPlace = canvas.getBoundingClientRect();

    rects.forEach(element => {
        if(event.clientX - canvasPlace.left >= element.posX && event.clientX - canvasPlace.left <= element.posX + element.width &&
            event.clientY - canvasPlace.top >= element.posY && event.clientY - canvasPlace.top <= element.posY + element.height
        ){
            element.clickedStatus = true;
        }

        if(element.clickedStatus) {
            render.clearCanvas(canvas.width, canvas.height);
            element.posX = parseInt(event.clientX - canvasPlace.left);
            element.posY = parseInt(event.clientY - canvasPlace.top);
            render.drawRect(element.posX, element.posY, element.width, element.height, element.color);
            console.log(element.posX, element.posY);
        }
    });
}

function handleMouseDown() {
    isDragging = true;

    canvas.addEventListener('mousemove', handleMouseMove);
}

function handleMouseUp() {
    isDragging = false;

    canvas.removeEventListener('mousemove', handleMouseMove);
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);