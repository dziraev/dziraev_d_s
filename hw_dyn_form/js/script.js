'use strict';

function dynForm(arr) {
    if(arr.length > 0) {
        const tagMain = document.querySelector('.main')
        const tagForm = document.createElement('form')
        tagForm.action = 'https://fe.it-academy.by/TestForm.php'
        tagForm.method = 'GET'
        tagForm.classList.add('form');
        tagForm.autocomplete = 'off';
        tagMain.append(tagForm)

        function createElem({content: c, name: n, type: t, options: o}) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('form__line');
            switch (t) {
                case 'select':
                    o = o.reduce((acc, curr) => `${acc} <option value="${curr.value}">${curr.text}</option>`, '')
                    wrapper.innerHTML = `<label for="${n}" class="form__label">${c}</label>
                                         <select id="${n}" name="${n}" class="form__input">${o}</select>`
                    break
                case 'radio':
                    o = o.reduce((acc, curr, i) =>
                        `${acc}<div class="radiobuttons__item">
                            <input id="${n}-${i}" name="${n}" type="${t}" value="${curr.value}" class="radiobuttons__input">
                            <label for="${n}-${i}" class="radiobuttons__label">${curr.text}</label>
                        </div>`, '')
                    wrapper.innerHTML = `<div class="radiobuttons">${c}${o}</div>`;
                    break
                case 'submit':
                    wrapper.innerHTML = `<button type="${t}" class="form__button button">${c}</button>`;
                    break
                case 'checkbox':
                    wrapper.innerHTML = `<div class="checkbox">${c}
                                             <div class="checkbox__item">
                                                <input id="${n}" type="${t}" name="${n}" class="checkbox__input">
                                                <label for="${n}" class="checkbox__label"></label> 
                                             </div>
                                         </div>`;
                    break
                case 'textarea':
                    wrapper.innerHTML = `<label for="${n}" class="form__label">${c}</label>
                                     <textarea id="${n}" name="${n}" class="form__input form__input_area"></textarea>`;
                    break
                default:
                    wrapper.innerHTML = `<label for="${n}" class="form__label">${c}</label>
                                     <input id="${n}" type="${t}" name="${n}" class="form__input">`
            }
            return wrapper;
        }

        arr.forEach(i => {
            switch (i.kind) {
                case 'number':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'number'}));
                    break
                case 'shorttext':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'email'}));
                    break
                case 'combo':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'select', options: i.variants}));
                    break
                case 'radio':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'radio', options: i.variants}));
                    break
                case 'check':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'checkbox'}));
                    break
                case 'memo':
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'textarea'}));
                    break
                case 'submit':
                    tagForm.append(createElem({content: i.caption, type: 'submit'}));
                    break
                default:
                    tagForm.append(createElem({content: i.label, name: i.name, type: 'text'}));
            }
        })
    }
}


const formDef1 =
    [
        {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
        {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
        {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
        {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                text: 'бытовая техника',
                value: 3
            }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
        },
        {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
        {label: 'Описание сайта:', kind: 'memo', name: 'description'},
        {caption: 'Опубликовать', kind: 'submit'},
    ];
const formDef2 =
    [
        {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
        {label: 'Имя:', kind: 'longtext', name: 'firstname'},
        {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
        {label: 'Возраст:', kind: 'number', name: 'age'},
        {caption: 'Зарегистрироваться', kind: 'submit'},
    ];

dynForm(formDef1);
dynForm(formDef2);
