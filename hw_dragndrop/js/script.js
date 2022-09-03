
    const form            = document.querySelector('.form')
    const itemName        = document.getElementById('itemName');
    const itemSRC         = document.getElementById('itemSRC');
    const itemDescription = document.getElementById('itemDescription');
    let items           = [];
    const btnAdd          = form.querySelector('button[type=button]');
    const blockInsert = document.querySelector('.block__items');

    btnAdd.addEventListener('click', () => {
        let res = [validInput(itemName), validInput(itemSRC), validInput(itemDescription)].every(i => i === true);
        if (res) {
            items.push(getInfo(itemName.value, itemSRC.value, itemDescription.value))
            form.reset()
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const a = render(items);
        if (a) {
            blockInsert.insertAdjacentHTML('beforeend', a);
            items = []
        }
    })


    function getInfo(name, src, description) {

        return {name, src, description}
    }

    function render(a) {
        if (a.length) {
            return a.reduce((acc, curr) =>
                `${acc}<div class="block__item">
                    <div class="item-block">
                        <a href="#" class="item-block__picture _ibg">
                           <img class="item-block__image" src="${curr.src}">
                        </a>
                        <div class="item-block__body">
                            <a href="" class="item-block__title">${curr.name}</a>
                            <div class="item-block__text">${curr.description}</div>
                            <a href="" class="item-block__button">Добавить</a>
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





