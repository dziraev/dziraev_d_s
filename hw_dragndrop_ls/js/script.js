const form            = document.querySelector('.form')
const itemName        = document.getElementById('itemName');
const itemSRC         = document.getElementById('itemSRC');
const itemDescription = document.getElementById('itemDescription');
const btnAdd          = form.querySelector('button[type=button]');
const blockInsert     = document.querySelector('.block__items');
const basket          = document.querySelector('.basket img');
const basketQuantity  = document.querySelector('.basket__quantity')
const modal           = document.querySelector('.modal');
const modalBlockItems = modal.querySelector('.block__items');


let items        = []
let draggedItem  = null;
const modalTitle = document.querySelector('.modal__title');


btnAdd.onclick = function (e) {
    let res = [validInput(itemName), validInput(itemSRC), validInput(itemDescription)].every(i => i === true);
    if (res) {
        items.push(getInfo(itemName.value, itemSRC.value, itemDescription.value))
        form.reset()
    }
}

basket.ondrop = addItem;

basket.onclick = function (e) {
    showModal();
    if (!modalBlockItems.firstElementChild) {
        modalTitle.innerHTML = 'Вы не добавили товар'
    } else {
        modalTitle.innerHTML = ''
    }
};

basket.ondragover = function (e) {
    e.preventDefault();
}

form.onsubmit = function (e) {
    e.preventDefault();
    if (items.length) {
        blockInsert.innerHTML = render(items);
        addedItems            = blockInsert.querySelectorAll('.block__item');

        addedItems.forEach(i => {
            i.querySelector('.button').onclick = (e) => {
                draggedItem = i;
                addItem(e);
            }
            i.draggable                        = true;
            i.ondragstart                      = itemDragStart;
            i.ondragend                        = itemDragEnd;
        })
    }
}


function quantity() {
    let quantity = 0;
    for (let item of JSON.parse(localStorage['items'])) quantity += item.count;
    if (quantity > 0) {
        basketQuantity.classList.add('_active')
    } else {
        basketQuantity.classList.remove('_active');
        modalTitle.innerHTML = 'Корзина пуста'
    }
    basketQuantity.innerHTML = `${quantity}`;
}

function addItem(e) {
    e.preventDefault();
    if (draggedItem) {
        const id = draggedItem.dataset.id
        draggedItem = null;
        countItems(items[id], id) ?
            modalBlockItems.insertAdjacentHTML('beforeend', renderInModal(items[id], id)) : null;
        localStorage['items'] = JSON.stringify(items)
        quantity()
    }
}

function countItems(item, id) {
    if (item.count > 0) {
        const i     = modal.querySelector(`[data-id="${id}"] .item-block__count`);
        i.innerHTML = `${++item.count}`;
        i.classList.add('_active');
        return false
    } else {
        item.count = 1;
        return true
    }
}

function deleteItem(id) {
    --items[id].count;
    localStorage['items'] = JSON.stringify(items)
    checkItem(id);
}

function checkItem(id) {
    let count = JSON.parse(localStorage['items'])[id].count;
    const i   = modal.querySelector(`[data-id="${id}"] .item-block__count`);
    if (count > 1) {
        i.innerHTML = `${count}`;
    } else if (count === 1) {
        i.classList.remove('_active');
    } else {
        modal.querySelector(`.block__item[data-id="${id}"]`).remove()
    }
    quantity();
}

function itemDragStart(eo) {
    draggedItem = eo.currentTarget;
}

function itemDragEnd(eo) {
    draggedItem = null;
}

function getInfo(name, src, description) {
    return {
        name,
        src,
        description,
        count: 0
    }
}

window.onstorage = (e) => {
    items = JSON.parse(localStorage['items'])
    JSON.parse(localStorage['items']).forEach((item, i) => {
        checkItem(i)
    })
}

function showModal() {
    modal.classList.add('_active');
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    modal.classList.remove('_active');
    document.body.style.overflow = '';
}

function validInput(item) {
    if (!item.value.trim()) {
        item.classList.add('_error')
        return false
    } else {
        item.classList.remove('_error')
        return true
    }
}

function render(a) {
    localStorage.items = ''
    if (a.length) {
        return a.reduce((acc, curr, i) =>
            `${acc}<div class="block__item" data-id=${i}>                 
                       <div class="item-block">
                            <div class="item-block__count"></div>
                            <a href="#" class="item-block__picture _ibg">
                               <img class="item-block__image" src="${curr.src}">
                            </a>
                            <div class="item-block__body">
                                <h2 class="item-block__title">${curr.name}</h2>
                                <div class="item-block__text">${curr.description}</div>
                                <div class="item-block__button button" data-id=${i}>Добавить</div>
                            </div>
                        </div>
                   </div>`, '')
    }
}

function renderInModal(item, id) {
    return `<div class="block__item" data-id=${id}>                 
                   <div class="item-block">
                        <div class="item-block__count"></div>
                        <a href="#" class="item-block__picture _ibg">
                           <img class="item-block__image" src="${item.src}">
                        </a>
                        <div class="item-block__body">
                            <h2 class="item-block__title">${item.name}</h2>
                            <div class="item-block__text">${item.description}</div>
                            <div class="item-block__button button" onclick="deleteItem(${id})" data-id=${id}>Удалить</div>
                        </div>
                    </div>
                </div>`
}

document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('_active')) {
        closeModal();
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target.hasAttribute('data-close')) closeModal();
});

