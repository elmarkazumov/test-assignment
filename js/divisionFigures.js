import { rects } from "./figures.js";
import { renderScreen } from "./screen.js";

const divisionButton = document.querySelector('.rects-disconnect');

function generateRandomPos() {
    for (const rect of rects) {
        if(rect.stickingStatus === true) {
            rect.stickingStatus = false;
            rect.posX = Math.floor(Math.random() * 700);
            rect.posY = Math.floor(Math.random() * 700);
        }
    }
}

export function divisionFigures() {
    generateRandomPos();
    renderScreen();
}

divisionButton.addEventListener('click', divisionFigures);