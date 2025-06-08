import { rects } from "./figures.js";
import { renderScreen } from "./screen.js";

function findClickedRect() {
    for(let rect of rects) {
        if(rect.clicked === true) {
            return rect;
        }
    }
}

export function getSelectedColor() {
    const colors = document.querySelectorAll('.rect-color');

    colors.forEach(color => {
        color.addEventListener('click', (event) => {
        const clickedRect = findClickedRect();
        
        if(clickedRect === undefined) {
            alert("Выберите фигуру");
        }

        if(clickedRect.clicked === true) {
            clickedRect.color = event.target.dataset.color;
            clickedRect.clicked = false;
            renderScreen();
        } 
        })
    })
}
