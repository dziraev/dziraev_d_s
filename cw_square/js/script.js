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
            squareIn.classList.add('_active')
            checkTimer()
        }
    } else if (d === 's') {
        if (y < borderBottom) {
            squareIn.style.top = `${++y}px`;
        } else {
            squareIn.classList.add('_active')
            checkTimer()
        }
    } else if (d === 'd') {
        if (x < borderRight) {
            squareIn.style.left = `${++x}px`;
        } else {
            squareIn.classList.add('_active')
            checkTimer()
        }
    } else if (d === 'a') {
        if (x > 0) {
            squareIn.style.left = `${--x}px`;
        } else {
            squareIn.classList.add('_active')
            checkTimer()
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.repeat) return
    const pressBtn = e.code;
    switch (pressBtn) {
        case 'KeyS':
            y < borderBottom ? squareIn.classList.remove('_active') : null;
            checkTimer()
            timer = setInterval(moveSquare, 5, 's')
            break
        case 'KeyW':
            y > 0 ? squareIn.classList.remove('_active'): null;
            checkTimer()
            timer = setInterval(moveSquare, 5, 'w')
            break
        case 'KeyD':
            x < borderRight ? squareIn.classList.remove('_active') : null;
            checkTimer()
            timer = setInterval(moveSquare, 5, 'd')
            break
        case 'KeyA':
            x > 0 ? squareIn.classList.remove('_active') : null;
            checkTimer()
            timer = setInterval(moveSquare, 5, 'a')
            break
    }
})