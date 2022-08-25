'use strict';
//--------- НА ES5 -------
// function HashStorageFunc() {
//     const storage = {};

//     this.addValue = function(key, value) {
//         storage[key] = value;
//     };
    
//     this.getValue = function(key) {
//         return key in storage ? storage[key] : false;
//     };

//     this.deleteValue = function(key) {
//         if(key in storage) {
//             delete storage[key];    
//             return true;
//         }
//         return false;
//     };

//     this.getKeys = function() {
//         return Object.keys(storage);
//     };
// }

//--------- НА ES6 -------
class HashStorageClass {
    // #storage = {}; приватное свойство
    _storage = {};  //защищеное свойство (на уровне соглашения), но все равно публичное

    addValue(key, value) {
        this._storage[key] = value;
    }
    
    getValue(key) {
        return key in this._storage ? this._storage[key] : false;
    }

    deleteValue(key) {
        if(key in this._storage) {
            delete this._storage[key];    
            return true;
        }
        return false;
    }

    getKeys() {
        return Object.keys(this._storage);
    }
}

const drinkStorage = new HashStorageClass();

const modalTriger = document.querySelectorAll('[data-btn]'),
      modal = document.querySelector('.modal'),
      form = document.querySelector('.modal__form'),
      formTitle = form.querySelector('.modal__title'),
      formBtn = form.querySelector('[data-add]'),
      formInput = form.querySelector('.modal__input'),
      formRadio = form.querySelector('.modal__radio'),
      insert = document.querySelector('.insert__container');
      

let drinkName, drinkAlc, drinkRecipe, button;
 
let questionCount = 0;

function showModal() {
    modal.classList.toggle('_active');
    formInput.classList.remove('_active');
    formInput.required = true;
    formRadio.classList.remove('_active'); 
    questionCount = 0;
    answer = [];
    form.reset();
}
document.addEventListener('keydown', e => {
    if(e.code === 'Escape' && modal.classList.contains('_active')) {
        showModal(); 
    }
});
modal.addEventListener('click', (e) => {
    if(e.target == modal) showModal();
    if(e.target.hasAttribute('data-close')) showModal();
});

modalTriger.forEach(i => {
    i.addEventListener('click', e => {
        button = e.target.getAttribute('data-btn');
        switch(button) {
                case 'enterInfo':
                    formTitle.textContent = 'Введите название напитка';
                    formBtn.textContent = 'добавить';
                    showModal();        
                break;
                case 'getInfo':
                    formTitle.textContent = 'Введите название напитка';
                    formBtn.textContent = 'готово';
                    showModal(); 
                break;
                case 'deleteInfo':
                    formTitle.textContent = 'Введите название напитка для удаления';
                    formBtn.textContent = 'удалить';
                    showModal();           
                break;
                case 'getAll':
                    if (drinkStorage.getKeys().length) {
                        const list = drinkStorage.getKeys().reduce((acc, curr) => 
                                                `<ul>${acc}<li>${curr}</li></ul>`, '');
                        insert.innerHTML = `<h1>Доступные напитки: </h1>${list}`;
                    } else {
                        insert.innerHTML = '<h1>Список с напитками пуст</h1>';
                    } 
                   e.target.blur();
                break;
        }          
    });
});

let answer = [];
form.addEventListener('submit', e => {
    e.preventDefault();
    const question = ['алкогольный?', 'введите рецепт напитка'];
    if (button == 'enterInfo') {
        formTitle.textContent = question[questionCount];
        if (questionCount == 0) {
            formInput.required = false;
            formInput.classList.add('_active');
            formRadio.classList.add('_active');
        }
        if (drinkStorage.getValue(formInput.value.toUpperCase()) && questionCount == 0) {
            insert.innerHTML = `<h1>Данный напиток уже есть в списке, сперва удалите его!</h1>`;
            showModal();
        }
        if (questionCount == 1) {
            const selected = document.querySelector('input[name="alcohol"]:checked').value;
            answer.push(selected);
            formInput.classList.remove('_active');
            formInput.required = true;
            formRadio.classList.remove('_active');
        } 
        if (questionCount != 1) answer.push(formInput.value);
        if (questionCount == question.length) {
            [drinkName, drinkAlc, drinkRecipe] = answer;
            drinkStorage.addValue(drinkName.toUpperCase(), {'alc': drinkAlc, 'recipe': drinkRecipe});
            showModal();
        }
        questionCount++;
    } else if (button == 'getInfo') {
        const getInfo = drinkStorage.getValue(formInput.value.toUpperCase());
        getInfo ? insert.innerHTML = `<h1>Напиток: ${formInput.value.toUpperCase()}</h1>
                                      <span>Алкогольный: ${getInfo.alc}</span>
                                      <p>Рецепт приготовления:</br>${getInfo.recipe}</p>` :
                  insert.innerHTML = `<h1>Данный напиток отсутствует</h1>`;
        showModal();
    } else if (button == 'deleteInfo') {
        drinkStorage.deleteValue(formInput.value.toUpperCase()) ? 
                        insert.innerHTML = `<h1>Информация о напитке удалена</h1>`:
                        insert.innerHTML = `<h1>Данный напиток отсутствует в списке</h1>`;
        showModal();
    }
    formBtn.blur();
    e.target.reset();
});
