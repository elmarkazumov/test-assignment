import { Render } from "./render.js";
import { rects } from "./figures.js";
import { mouseEvents } from "./moveRect.js";
import { getSelectedColor } from "./changeColor.js";
import { divisionFigures } from "./divisionFigures.js";

export const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const render = new Render(context);

const playground = document.querySelector('.playground');
playground.appendChild(canvas);

canvas.width = 800;
canvas.height = 800;

export function renderScreen() {
    render.clearCanvas(canvas.width, canvas.height);
    render.drawRect(0, 0, canvas.width, canvas.height, '#dce6eb');

    for(let rect of rects){
        render.drawRect(rect.posX, rect.posY, rect.width, rect.height, rect.color);
    }
}

mouseEvents();

getSelectedColor();
