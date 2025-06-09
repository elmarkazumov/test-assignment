import { rects } from "./figures.js";

function getCenterPoint() {
    for (const rect of rects) {
        rect.center = {
            x: rect.posX + rect.width / 2,
            y: rect.posY + rect.height / 2,
        }
    }
}

function getDistance() {
    getCenterPoint();
    const distance = Math.pow((rects[1].center.x - rects[0].center.x), 2) + Math.pow((rects[1].center.y - rects[0].center.y), 2);
    return distance <= 125 * 125;
}

function connectingRects() {
    let movingRect, staticRect;

    for(const rect of rects) {
        rect.stickingStatus = true;

        if(rect.isSelected === true) {
            movingRect = rect;
        } else {
            staticRect = rect;
        }
    }

    const dx = movingRect.center.x - staticRect.center.x;
    const dy = movingRect.center.y - staticRect.center.y;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            movingRect.posX = staticRect.posX + staticRect.width;
        } else {
            movingRect.posX = staticRect.posX - movingRect.width;
        }
    } else {
        if (dy > 0) {
            movingRect.posY = staticRect.posY + staticRect.height;
        } else {
            movingRect.posY = staticRect.posY - movingRect.height;
        }
    }

}

export function checkDistance(){
    if (getDistance()) {
        connectingRects();
    }
}