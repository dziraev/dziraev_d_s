'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const formReq          = document.querySelectorAll('._req');
    const form             = document.querySelector('.form__body');
    const paymentMethod    = form.elements.payment;
    const inputDev         = form.querySelector('input[id=formDevelopers]');
    const inputSite        = form.querySelector('input[id=formSite]');
    const inputURL         = form.querySelector('input[id=formURL]');
    const inputDate        = form.querySelector('input[id=formDate]');
    const inputEmail       = form.querySelector('input[id=formEmail]');
    const inputVisitors    = form.querySelector('input[id=formVisitors]');
    const inputCatalog     = form.querySelector('select[id=formCatalog]');
    const inputDescription = form.querySelector('textarea[id=formDescription]');
    const radioBlock       = form.querySelector('.radiobuttons');
    const allInputs        = form.querySelectorAll('.form__input');


    inputCatalog.addEventListener('change', validCatalog.bind(null, inputCatalog));
    paymentMethod.forEach(i => i.addEventListener('change', validPayment.bind(null, radioBlock)))

    form.addEventListener('submit', (e) => {
        let res = [validDevelopers(inputDev), validSite(inputSite), validURL(inputURL),
            validDate(inputDate), validEmail(inputEmail), validVisitors(inputVisitors),
            validDescription(inputDescription), validCatalog(inputCatalog), validPayment(radioBlock)].every(i => i ===
                                                                                                                 true);

        if (!res) {
            e.preventDefault();
            focusInput(allInputs)
        }
    })

    formReq.forEach(input => {
        input.addEventListener('blur', (e) => {

            const attr = input.getAttribute('id');

            switch (attr) {
                case 'formDevelopers':
                    validDevelopers(input);
                    break
                case 'formSite':
                    validSite(input)
                    break
                case 'formURL':
                    validURL(input)
                    break
                case 'formDate':
                    validDate(input)
                    break
                case 'formEmail':
                    validEmail(input)
                    break
                case 'formVisitors':
                    validVisitors(input)
                    break
                case 'formDescription':
                    validDescription(input)
                    break
            }
        })
    })


    function formAddError(input, el, content) {
        input.classList.add('_error');
        el.classList.add('_active');
        el.innerHTML = `${content}`;
        input.setAttribute('data-focus', '')
        return false
    }

    function formRemoveError(input, el) {
        input.classList.remove('_error');
        el.classList.remove('_active')
        input.removeAttribute('data-focus')
        return true
    }

    function checkEmail(value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value);
    }

    function checkURL(value) {
        return /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(value);
    }


    function validDevelopers(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue.trim()) {
            return formAddError(input, error, 'Вы не ввели разботчика/ов');
        } else if ((itemValue.match(/[^а-яё\- ,]/gi) || []).length) {
            return formAddError(input, error, 'Поддерживаются только русские символы');
        } else if (itemValue.length < 4 || itemValue.length > 30) {
            return formAddError(input, error, 'Макс. кол-во символов: 30; Мин. кол-во симолов: 4');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validSite(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue.trim()) {
            return formAddError(input, error, 'Вы не ввели название сайта');
        } else if (itemValue.length > 30) {
            return formAddError(input, error, 'Название не может превышать 30 символов');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validURL(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue.trim()) {
            return formAddError(input, error, 'Вы не ввели URL');
        } else if (!checkURL(itemValue)) {
            return formAddError(input, error, 'Введите корректный URL');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validDate(input) {
        const itemValue  = input.value;
        const error      = input.nextElementSibling;
        const insertDate = new Date(itemValue);
        if (!itemValue) {
            return formAddError(input, error, 'Вы не ввели дату');
        } else if (insertDate > Date.now() || insertDate < new Date(1991, 0, 0)) {
            return formAddError(input, error, 'Введите реальную дату создания Вашего сайта');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validEmail(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue.trim()) {
            return formAddError(input, error, 'Вы не ввели Email');
        } else if (!checkEmail(itemValue)) {
            return formAddError(input, error, 'Введите корректный email');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validVisitors(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue) {
            return formAddError(input, error, 'Вы не ввели количество посетителей');
        } else if (!/^[0-9]+$/.test(itemValue)) {
            return formAddError(input, error, 'Используйте только положительные целые числа');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validCatalog(select) {
        const itemValue = select.value;
        const error     = select.nextElementSibling;
        if (itemValue === '3') {
            return formAddError(select, error, 'Недоступно')
        } else {
            return formRemoveError(select, error)
        }
    }

    function validDescription(input) {
        const itemValue = input.value;
        const error     = input.nextElementSibling;
        if (!itemValue.trim()) {
            return formAddError(input, error, 'Вы не ввели описание сайта');

        } else if (itemValue.length < 20) {
            return formAddError(input, error, 'Мин. допустимое значение символов: 20');
        } else if ((itemValue.match(/[^а-яё\- ,]/gi) || []).length) {
            return formAddError(input, error, 'Поддерживаются только русские символы');
        } else {
            return formRemoveError(input, error);
        }
    }

    function validPayment(item) {
        const checkedPayment = item.querySelector('input[name=payment]:checked');
        const error          = item.querySelector('.radiobuttons__error')
        if (!checkedPayment) {
            error.innerHTML = 'Вы не выбрали способ размещения'
            item.classList.add('_error');
            return false;
        } else if (checkedPayment.value === 'free') {
            error.innerHTML = 'В данный момент опция недоступна'
            item.classList.add('_error');
            return false
        } else {
            item.classList.remove('_error')
            return true;
        }
    }

    function focusInput(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].hasAttribute('data-focus')) {
                inputs[i].focus();
                break;
            }
        }
    }
})

