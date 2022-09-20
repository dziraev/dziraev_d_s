'use strict'
const arreaW      = 800;
const arreaH      = 500;
const ballSize    = 50;
const racketW     = 30;
const racketH     = 100;
const arreaElem   = document.getElementById('tennis');
const racketElemL = document.getElementById('racketL');
const racketElemR = document.getElementById('racketR');
const ballElem    = document.getElementById('ball')
const btnStart    = document.getElementById('start');
const btnReset    = document.getElementById('reset');
const playerL     = document.getElementById('left');
const playerR     = document.getElementById('right');

let timer = null;

//AREA
const arrea            = {
    width: 800,
    height: 500,
}
arreaElem.style.width  = arrea.width + 'px';
arreaElem.style.height = arrea.height + 'px';

//BALL
const ball           = {
    speedX: 0,
    speedY: 0,
    posX: arrea.width / 2 - ballSize / 2,
    posY: arrea.height / 2 - ballSize / 2,
    boost: 0.1,
    update(elem, posX, posY) {
        elem.style.transform = `translate(${posX}px, ${posY}px) translateZ(0)`;
    }
}
ballElem.style.width = ballElem.style.height = ballSize + 'px';
ball.update(ballElem, ball.posX, ball.posY)

//RACKET LEFT
const racketLeft         = {
    speed: 0,
    posX: 0,
    posY: arreaH / 2 - racketH / 2,
    count: 0,
}
racketElemL.style.width  = racketW + 'px';
racketElemL.style.height = racketH + 'px';
updateRacketPos(racketElemL, racketLeft.posY)

//RACKET RIGHT
const racketRight        = {
    speed: 0,
    posX: 0,
    posY: arreaH / 2 - racketH / 2,
    count: 0,
}
racketElemR.style.width  = racketW + 'px';
racketElemR.style.right  = racketRight.posX;
racketElemR.style.height = racketH + 'px';
updateRacketPos(racketElemR, racketRight.posY)


btnStart.onclick = startGame;

btnReset.onclick = function () {
    racketLeft.count  = 0;
    racketRight.count = 0;
    if (!timer) {
        updateCount();
        showOpacity(playerR);
        showOpacity(playerL);
        ball.posX       = arreaW / 2 - ballSize / 2;
        ball.posY       = arreaH / 2 - ballSize / 2;
        racketLeft.posY = racketRight.posY = arreaH / 2 - racketH / 2;
        ball.update(ballElem, ball.posX, ball.posY)
        updateRacketPos(racketElemL, racketLeft.posY);
        updateRacketPos(racketElemR, racketRight.posY);
    }
}

function startGame() {
    if (!timer) {
        ball.posX   = arreaW / 2 - ballSize / 2;
        ball.posY   = arreaH / 2 - ballSize / 2;
        const dirBallX    = Math.random() < 0.5 ? 1 : -1;
        const dirBallY    = Math.random() < 0.5 ? 1 : -1;
        ball.speedX = dirBallX * (Math.random() * 2 + 5); //при старте всегда новая скорость для разного направления мяча
        ball.speedY = dirBallY * (Math.random() * 4 + 5);
        move()
    }
}

document.addEventListener('keydown', e => {
    const pressBtn = e.code;

    switch (pressBtn) {
        case 'KeyW':
            racketLeft.speed = -10;
            break
        case 'KeyS':
            racketLeft.speed = 10;
            break
        case 'ArrowUp':
            racketRight.speed = -10;
            e.preventDefault()
            break
        case 'ArrowDown':
            e.preventDefault()
            racketRight.speed = 10;
            break
    }
})

document.addEventListener('keyup', e => {

    const pressBtn = e.code;

    switch (pressBtn) {
        case 'KeyW':
            racketLeft.speed = 0;
            break
        case 'KeyS':
            racketLeft.speed = 0;
            break
        case 'ArrowUp':
            racketRight.speed = 0;
            break
        case 'ArrowDown':
            racketRight.speed = 0;
            break
        case 'Space':
            startGame()
            break
    }
})

function move() {
    racketLeft.posY += racketLeft.speed;
    racketRight.posY += racketRight.speed;
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    //TOP BORDER FOR LEFT RACKET
    if (racketLeft.posY <= 0) {
        racketLeft.posY = 0;
    }
    //BOTTOM BORDER FOR LEFT RACKET
    if (racketLeft.posY >= arreaH - racketH) {
        racketLeft.posY = arreaH - racketH;
    }
    //TOP BORDER FOR RIGHT RACKET
    if (racketRight.posY <= 0) {
        racketRight.posY = 0;
    }
    //BOTTOM BORDER FOR RIGHT RACKET
    if (racketRight.posY >= arreaH - racketH) {
        racketRight.posY = arreaH - racketH;
    }
    //TOP BORDER FOR BALL
    if (ball.posY <= 0) {
        ball.speedY = -ball.speedY;
        ball.posY   = 0;
    }
    //BOTTOM BORDER FOR BALL
    if (ball.posY + ballSize >= arreaH) {
        ball.speedY = -ball.speedY;
        ball.posY   = arreaH - ballSize;
    }
    //HITTING ON THE LEFT RACKET
    if (ball.posX <= racketW) {
        if (ball.posY + ballSize > racketLeft.posY && ball.posY < racketLeft.posY + racketH) {
            ball.posX   = racketW;
            ball.speedX = -(ball.speedX + (ball.speedX < 0 ? -ball.boost : ball.boost)); //при ударе увеличиваем скорость мяча
        }
    }
    //HITTING ON THE RIGHT RACKET
    if (ball.posX >= arreaW - racketW - ballSize) {
        if (ball.posY + ballSize > racketRight.posY && ball.posY < racketRight.posY + racketH) {
            ball.posX   = arreaW - racketW - ballSize;
            ball.speedX = -(ball.speedX + (ball.speedX < 0 ? -ball.boost : ball.boost));
        }
    }
    timer = requestAnimationFrame(move);
    //A POINT FOR THE RIGHT SIDE
    if (ball.posX <= 0) {
        racketRight.count++;
        showOpacity(playerR);
        updateCount();
        ball.posX = 0
    }
    //A POINT FOR THE LEFT SIDE
    if (ball.posX >= arreaW - ballSize) {
        racketLeft.count++;
        showOpacity(playerL);
        updateCount();
        ball.posX = arreaW - ballSize;
    }
    updateRacketPos(racketElemL, racketLeft.posY)
    updateRacketPos(racketElemR, racketRight.posY)
    ball.update(ballElem, ball.posX, ball.posY)
}

function updateRacketPos(elem, posY) {
   elem.style.transform = `translateY(${posY}px) translateZ(0)`;
}

function updateCount() {
    cancelAnimationFrame(timer)
    timer               = null;
    playerL.textContent = `${racketLeft.count}`
    playerR.textContent = `${racketRight.count}`;
}

function showOpacity(elem) {
    elem.style.opacity = '1';
    setTimeout(() => {
        elem.style.opacity = '0.1';
    }, 500)

}