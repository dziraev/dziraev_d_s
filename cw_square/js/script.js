'use strict'
let x     = 0;
let y     = 0;
let timer = 0;

const square       = document.querySelector('.square');
const squareIn     = document.querySelector('.square-inner');
const borderRight  = square.offsetWidth - squareIn.offsetWidth;
const borderBottom = square.offsetHeight - squareIn.offsetHeight;

function checkTimer() {
    if (timer) {
        clearInterval(timer)
        timer = 0;
    }
}

function moveSquare(d) {
    if (d === 'w') {
        if (y > 0) {
            squareIn.style.top = `${--y}px`;
        } else {
            square.classList.add('_active')
            clearInterval(timer);
        }
    } else if (d === 's') {
        if (y < borderBottom) {
            squareIn.style.top = `${++y}px`;
        } else {
            square.classList.add('_active')
            clearInterval(timer);
        }
    } else if (d === 'd') {
        if (x < borderRight) {
            squareIn.style.left = `${++x}px`;
        } else {
            square.classList.add('_active')
            clearInterval(timer);
        }
    } else if (d === 'a') {
        if (x > 0) {
            squareIn.style.left = `${--x}px`;
        } else {
            square.classList.add('_active')
            clearInterval(timer);
        }
    }
}

document.addEventListener('keydown', (e) => {
    const pressBtn = e.code;
    switch (pressBtn) {
        case 'KeyS':
            square.classList.remove('_active')
            checkTimer()
            timer = setInterval(moveSquare, 5, 's')
            break
        case 'KeyW':
            square.classList.remove('_active')
            checkTimer()
            timer = setInterval(moveSquare, 5, 'w')
            break
        case 'KeyD':
            square.classList.remove('_active')
            checkTimer()
            timer = setInterval(moveSquare, 5, 'd')
            break
        case 'KeyA':
            square.classList.remove('_active')
            checkTimer()
            timer = setInterval(moveSquare, 5, 'a')
            break
    }
})