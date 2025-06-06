import { rects } from "./figures.js";
import { canvas, renderScreen } from './screen.js';

const mouseMoveSettings = {
    isMouseDown: false,
}

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

    for(let rect of rects) {
        const checkPos = mousePos.x >= rect.posX && mousePos.x <= rect.posX + rect.width
        && mousePos.y >= rect.posY && mousePos.y <= rect.posY + rect.height;

        if(checkPos) {
            rect.isSelected = true;
            mouseMoveSettings.draggedElement = rect;
            mouseMoveSettings.offsetX = mousePos.x - rect.posX;
            mouseMoveSettings.offsetY = mousePos.y - rect.posY;
        }
    }
}

export function mouseEvents() {
    canvas.addEventListener('mousedown', checkRects);

    canvas.addEventListener('mousemove', (event) => {
        const mousePos = getMousePos(event, canvas);
        if (mouseMoveSettings.isMouseDown && mouseMoveSettings.draggedElement.isSelected) {
            mouseMoveSettings.draggedElement.posX = mousePos.x - mouseMoveSettings.offsetX;
            mouseMoveSettings.draggedElement.posY = mousePos.y - mouseMoveSettings.offsetY;
            renderScreen();
        }
    });

    canvas.addEventListener('mouseup', () => {
        mouseMoveSettings.isMouseDown = false;
        mouseMoveSettings.draggedElement.isSelected = false;
    });
}