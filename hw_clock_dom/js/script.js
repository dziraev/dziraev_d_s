'use strict';
const form      = document.querySelector('.form');
const inputForm = form.querySelector('.form__input');
const error     = document.querySelector('.form__error');
let timer;
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (document.querySelector('.clock')) {
        document.querySelector('.clock').remove();
        clearInterval(timer);
    }
    if (validInput(inputForm, error)) {
        const widthClock = +inputForm.value; //ширина самих часов (фона)
        const radius     = +(widthClock / 2 - 0.085 * widthClock).toFixed() //радиус с отступом по периметру
        let angle        = 30;

        const clock = document.createElement('div')
        clock.classList.add('clock');
        clock.style.cssText = `width: ${widthClock}px; height: ${widthClock}px;
                               background-color: #fccb66; position: relative; border-radius: 50%; margin: 0 auto`;
        for (let i = 1; i <= 12; i++) {
            const hour      = document.createElement('div');
            const widthHour = widthClock * 0.11 // ширина области 'часа'

            const hourCenterX = widthClock / 2 + radius * Math.sin(angle / 180 * Math.PI);
            const hourCenterY = widthClock / 2 - radius * Math.cos(angle / 180 * Math.PI);

            const left = Math.round(hourCenterX - widthHour / 2);
            const top  = Math.round(hourCenterY - widthHour / 2);

            hour.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; color: #272524;
                                  background-color: #46b483; border-radius: 50%; width: ${widthHour}px; height: ${widthHour}px;
                                  display: flex; justify-content: center; align-items: center; font-size: ${0.06 * widthClock}px`;
            hour.textContent   = `${i}`
            clock.append(hour)
            angle += 30
        }

        form.after(clock)

        const time         = document.createElement('div');
        time.style.cssText = `position: absolute; top: 35%; left: 50%; transform: translate(-50%, 0); 
                              color: #000; font-size: ${widthClock * 0.1}px`
        clock.append(time)

        const hourArrow = document.createElement('div');
        const minArrow  = document.createElement('div');
        const secArrow  = document.createElement('div');
        const center    = document.createElement('div');

        center.style.cssText    = `position: absolute; top: 50%; left: 50%; background-color: #272524; transform: translate(-50%, -50%);  
                                   border-radius: 50%; width: ${widthClock * 0.08}px; height: ${widthClock * 0.08}px;
                                   z-index: 4;`
        hourArrow.style.cssText = `position: absolute; top: 50%; left: 50%; width: ${widthClock * 0.3}px; height: ${widthClock * 0.04}px; 
                                   border-radius: ${widthClock * 0.04}px; background-color: #272524; 
                                   transform-origin: left center; z-index: 1`;
        minArrow.style.cssText  = `position: absolute; top: 50%; left: 50%; width: ${widthClock * 0.38}px; height: ${widthClock * 0.02}px;
                                   border-radius: ${widthClock * 0.04}px; background-color: #272524; 
                                   transform-origin: left center; z-index: 2`;
        secArrow.style.cssText  = `position: absolute; top: 50%; left: 50%; width: ${widthClock * 0.45}px; height: ${widthClock * 0.01}px; 
                                   border-radius: ${widthClock * 0.04}px; background-color: #272524;
                                   transform-origin: left center; z-index: 3;`;

        clock.append(hourArrow, minArrow, secArrow, center);

        update();

        timer = setInterval(update)

        function update() {
            const currTime = new Date();
            let timeObj    = formatDate(currTime);
            let sec = +timeObj.sec + timeObj.ms / 1000; //секунды + милисекунды, для плавности стрелки
            let fraction = (sec / 100 * 1.66).toFixed(3).slice(2); // cоздаем для минут дробную часть (для плавности)
                                                                            // т.к. секунд всего 60 (100/60 = 1.66)

            let minut = `${timeObj.min}.${fraction}`;

            time.textContent          = `${timeObj.hour}:${timeObj.min}:${timeObj.sec}`;
            hourArrow.style.transform = `translateY(-50%) rotate(${timeObj.hour * 30 + minut / 2 - 90}deg)`;
            minArrow.style.transform  = `translateY(-50%) rotate(${minut * 6 - 90}deg)`;
            secArrow.style.transform  = `translateY(-50%) rotate(${sec * 6 - 90}deg)`;
        }

    } else {
        e.target.reset()
    }
})

function validInput(input, errorEl) {
    const v = input.value
    if (!/^[0-9]+$/.test(v) || +v < 200 || +v > 800) {
        errorEl.style.visibility = 'visible';
        errorEl.textContent      = 'Введите целое положительное число от 200 до 800';
        return false
    } else {
        errorEl.style.visibility = 'hidden';
        return true
    }
}

function formatDate(date) {
    let hour = date.getHours();
    let min  = date.getMinutes();
    let sec  = date.getSeconds();
    let ms   = date.getMilliseconds();

    hour = hour < 10 ? '0' + hour : hour;
    min  = min < 10 ? '0' + min : min;
    sec  = sec < 10 ? '0' + sec : sec;

    return {hour, min, sec, ms}
}

