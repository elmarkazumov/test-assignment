import { rects } from "./figures.js";
import { canvas, renderScreen } from './screen.js';
import { checkDistance } from "./stickingFigures.js";


const mouseMoveSettings = {
    isMouseDown: false,
    lastMouseX: 0,
    lastMouseY: 0,
}

let activeRect;

function getMousePos(event) {
    const pos = canvas.getBoundingClientRect();

    return {
        x: event.clientX - pos.left,
        y: event.clientY - pos.top
    };
}

function bordersField() {
    if(activeRect) {
        if(activeRect.posX < 0) {
            activeRect.posX = 0;
        }
        if(activeRect.posY < 0) {
            activeRect.posY = 0;
        }
        if(activeRect.posX + activeRect.width >= canvas.width) {
            activeRect.posX = canvas.width - activeRect.width;
        }
        if(activeRect.posY + activeRect.height >= canvas.height) {
            activeRect.posY = canvas.height - activeRect.height;
        }
    }
}

function checkRects(event) {
    const mousePos = getMousePos(event, canvas);
    mouseMoveSettings.isMouseDown = true;
    mouseMoveSettings.lastMouseX = mousePos.x;
    mouseMoveSettings.lastMouseY = mousePos.y;
    let foundRect = false;

    for(let rect of rects) {
        let checkPos = mousePos.x >= rect.posX && mousePos.x <= rect.posX + rect.width
        && mousePos.y >= rect.posY && mousePos.y <= rect.posY + rect.height;
        if(checkPos) {
            activeRect = rect;
            activeRect.isSelected = true;
            activeRect.clicked = true;
            mouseMoveSettings.offsetX = mousePos.x - rect.posX;
            mouseMoveSettings.offsetY = mousePos.y - rect.posY;
            foundRect = true;
            break;
        }
    }

    if(!foundRect) {
        activeRect = null;
    }
}

function moveRects(event) {
     const mousePos = getMousePos(event, canvas);
        const deltaX = mousePos.x - mouseMoveSettings.lastMouseX;
        const deltaY = mousePos.y - mouseMoveSettings.lastMouseY;

        if(mouseMoveSettings.isMouseDown === true && activeRect) {
            if (activeRect.isSelected === true) {
                activeRect.posX = mousePos.x - mouseMoveSettings.offsetX;
                activeRect.posY = mousePos.y - mouseMoveSettings.offsetY;
            }

            if(rects[0].stickingStatus === true && rects[1].stickingStatus === true) {
                
                let minX = Math.min(...rects.map(rect => rect.posX));
                let minY = Math.min(...rects.map(rect => rect.posY));
                let maxX = Math.max(...rects.map(rect => rect.posX + rect.width));
                let maxY = Math.max(...rects.map(rect => rect.posY + rect.height));

                if(minX + deltaX < 0) {
                    deltaX = -minX;
                }
                if (minY + deltaY < 0){
                    deltaY = -minY;
                }
                if (maxX + deltaX > canvas.width) {
                    deltaX = canvas.width - maxX;
                }
                if (maxY + deltaY > canvas.height) {
                    deltaY = canvas.height - maxY;
                }

                for (const rect of rects) {
                    rect.posX += deltaX; 
                    rect.posY += deltaY;
                }
            }
            bordersField();
            checkDistance();
            renderScreen();

            mouseMoveSettings.lastMouseX = mousePos.x;
            mouseMoveSettings.lastMouseY = mousePos.y;
        }
}

export function mouseEvents() {
    canvas.addEventListener('mousedown', checkRects);

    canvas.addEventListener('mousemove', moveRects);

    canvas.addEventListener('mouseup', () => {
        mouseMoveSettings.isMouseDown = false;
        if(activeRect) {
            activeRect.isSelected = false;
        }
        activeRect = null;
    });
}