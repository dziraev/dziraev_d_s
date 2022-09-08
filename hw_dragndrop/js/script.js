const form            = document.querySelector('.form')
const itemName        = document.getElementById('itemName');
const itemSRC         = document.getElementById('itemSRC');
const itemDescription = document.getElementById('itemDescription');
const btnAdd          = form.querySelector('button[type=button]');
const blockInsert     = document.querySelector('.block__items');
const basket          = document.querySelector('.basket');
const basketQuantity  = basket.querySelector('.basket__quantity')
const modal           = document.querySelector('.modal');
const modalBlockItems = modal.querySelector('.block__items');
const storageBasket   = {};
let addedItems;
let items             = [];
let draggedItem       = null;


btnAdd.onclick = function (e) {
    let res = [validInput(itemName), validInput(itemSRC), validInput(itemDescription)].every(i => i === true);
    if (res) {
        items.push(getInfo(itemName.value, itemSRC.value, itemDescription.value))
        form.reset()
    }
}

basket.ondrop = function (e) {
    e.preventDefault();
    if (draggedItem) {
        countItems(draggedItem.dataset.item) ? modalBlockItems.append(draggedItem.cloneNode(true)) : null
        let quantity = 0;
        for (let item in storageBasket) quantity += storageBasket[item];
        basketQuantity.innerHTML = `${quantity}`;
        basketQuantity.classList.add('_active');
    }
}

basket.onclick = function (e) {
    showModal();
    const modalTitle = document.querySelector('.modal__title');
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
        addedItems            = document.querySelectorAll('.block__item');

        addedItems.forEach(i => {
            i.ondragstart = itemDragStart;
            i.ondragend   = itemDragEnd;
        })
    }
}

function countItems(item) {
    if (item in storageBasket) {
        const i     = modal.querySelector(`[data-item="${item}"] .item-block__count`);
        i.innerHTML = `${++storageBasket[item]}`;
        i.classList.add('_active');
        return false
    } else {
        storageBasket[item] = 1
        return true
    }
}

function itemDragStart(eo) {
    draggedItem = eo.currentTarget;
}

function itemDragEnd(eo) {
    draggedItem = null;
}

function getInfo(name, src, description) {
    return {name, src, description}
}

function render(a) {
    if (a.length) {
        return a.reduce((acc, curr, i) =>
            `${acc}<div class="block__item" data-item=${i}>                 
                       <div class="item-block">
                            <div class="item-block__count"></div>
                            <a href="#" class="item-block__picture _ibg">
                               <img class="item-block__image" src="${curr.src}">
                            </a>
                            <div class="item-block__body">
                                <h2 class="item-block__title">${curr.name}</h2>
                                <div class="item-block__text">${curr.description}</div>
                            </div>
                        </div>
                   </div>`, '')
    }
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





