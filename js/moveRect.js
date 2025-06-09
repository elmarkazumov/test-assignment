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
                rects[0].posX += deltaX;
                rects[0].posY += deltaY;

                rects[1].posX += deltaX;
                rects[1].posY += deltaY;
            }
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