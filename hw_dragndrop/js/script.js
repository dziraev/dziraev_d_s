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
let addedItems;
let items             = [];
const storageBasket   = [];

btnAdd.addEventListener('click', () => {
    let res = [validInput(itemName), validInput(itemSRC), validInput(itemDescription)].every(i => i === true);
    if (res) {
        items.push(getInfo(itemName.value, itemSRC.value, itemDescription.value))
        form.reset()
    }
})
basket.ondragover = function (e) {
    e.preventDefault();
}
basket.addEventListener('drop', e => {
    let itemId = e.dataTransfer.getData('id')
    if (itemId !== '') {
        storageBasket.push(itemId)
        basketQuantity.classList.add('_active')
        basketQuantity.innerHTML = `${storageBasket.length}`;
        const findItem           = addedItems.find(i => itemId === i.dataset.itemNumber)
        modalBlockItems.append(findItem.cloneNode(true));
    }
})

basket.addEventListener('click', () => {
    showModal();
    const modalTitle = document.querySelector('.modal__title');
    if(!modalBlockItems.firstElementChild) {
        modalTitle.innerHTML = 'Вы не добавили товар'
    } else {
        modalTitle.innerHTML = ''
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (items.length) {
        blockInsert.innerHTML = render(items);
        addedItems            = [...document.querySelectorAll('.block__item')];
        addedItems.forEach(i => {
            i.ondragstart = function (e) {
                e.dataTransfer.setData('id', this.dataset.itemNumber)
            }
        })
    }
})

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

function getInfo(name, src, description) {
    return {name, src, description}
}

function render(a) {
    if (a.length) {
        return a.reduce((acc, curr, i) =>
            `${acc}<div class="block__item" data-item-number=${i}>
                       <div class="item-block">
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

function validInput(item) {
    if (!item.value.trim()) {
        item.classList.add('_error')
        return false
    } else {
        item.classList.remove('_error')
        return true
    }
}





