class Render {
    constructor(context) {
        if(context && context instanceof CanvasRenderingContext2D) {
            this.context = context;
        }
    }

    drawRect(x, y, w, h, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
    }
}

export {Render}