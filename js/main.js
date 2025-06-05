import { Render } from "./render.js";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const playground = document.querySelector('.playground');
playground.appendChild(canvas);

canvas.width = 800;
canvas.height = 800;

const render = new Render(context);

render.drawRect(0, 0, canvas.width, canvas.height, '#dce6eb');