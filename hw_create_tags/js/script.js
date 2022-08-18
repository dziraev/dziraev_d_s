'use strict';

const modalTriger = document.querySelectorAll('[data-tag]'),
      modal = document.querySelector('.modal'),
      form = document.querySelector('.modal__form'),
      insert = document.querySelector('.insert__container');

let tag;
let ul;

function creatEl(tagName, content) {
    const newTag = document.createElement(tagName);
    newTag.append(content);
    return newTag;
}

function showModal() {
    modal.classList.toggle('_active'); 
}

modal.addEventListener('click', (e) => {
    if(e.target == modal) showModal();
    if(e.target.hasAttribute('data-close')) showModal();      
});

modalTriger.forEach(i => {
    i.addEventListener('click', e => {
        tag = e.target.getAttribute('data-tag');
        showModal();
        document.querySelector('.modal__input').focus();
        if(tag === 'ul') {
            ul = document.createElement('ul');
            insert.append(ul);
        }
    });
});

document.addEventListener('keydown', e => {
    if(e.code === 'Escape' && modal.classList.contains('_active')) {
        showModal();
    }
});

form.addEventListener('submit', e => {
    const value = modal.querySelector('.modal__input').value;
    if(tag === 'ul') { 
        ul.append(creatEl('li', value));   
    }
    else {
        insert.append(creatEl(tag, value));
    }
    document.querySelector('[data-add]').blur();
    e.target.reset();
    e.preventDefault();
}); 

