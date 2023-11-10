const product = {
    crazy: {
        name: "Crazy",
        price: 31000,
        amount: 0,
        img: "images/burger_1.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 26000,
        amount: 0,
        img: "images/burger_2.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "Cheeseburger",
        price: 29000,
        amount: 0,
        img: "images/burger_3.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dburger",
        price: 24000,
        amount: 0,
        img: "images/burger_4.png",
        get Summ() {
            return this.price * this.amount
        }
    },
}

const btns = document.querySelectorAll('.card__shop'),
    shopImg = document.querySelector('.shop__img'),
    basketClose = document.querySelector('.basket__close'),
    basket = document.querySelector('.basket'),
    shopItem = document.querySelector('.shop__item'),
    basketBox = document.querySelector('.basket__box'),
    basketTotal = document.querySelector('.basket__total');
    backImg = document.querySelectorAll('.card__img');

    backImg.forEach(bg => {
        bg.addEventListener("click", function () {
            const headerImg=document.querySelector(".header__img")
            const cardSrc =bg.getAttribute('src')
            headerImg.setAttribute("src", cardSrc)
            console.log(cardSrc);
        })
    });

btns.forEach(btn => {
    btn.addEventListener("click", function () {
        const parent = btn.closest('.card'),
            cardId = parent.getAttribute('id')
        product[cardId].amount++
        basketInfo()
    })
});
function basketInfo() {
    const productArr = []
    for (const key in product) {
        const pk = product[key],
            productCard = document.querySelector(`#${key}`),
            span = productCard.querySelector('.card__item')
        if (pk.amount) {
            span.classList.add('active')
            span.innerHTML = pk.amount
            productArr.unshift(pk)
        } else {
            span.classList.remove('active')
        }
    }
    if (totalAmount()) {
        shopItem.classList.add('active')
        shopItem.innerHTML = totalAmount()
    } else {
        shopItem.classList.remove('active')
    }
    basketBox.innerHTML = ''
    for (let i = 0; i < productArr.length; i++) {
        basketBox.innerHTML += basketCard(productArr[i])
    }
    basketTotal.innerHTML = totalSumm()
}

function basketCard(card) {
    const { img, name, price, amount, Summ } = card
    return `<div class="basket__card">
                <img src="${img}" alt=""
                    class="basket__img">
                <div class="basket__info">
                    <h2 class="basket__title">${name}</h2>
                    <p class="basket__price">${Summ} сум</p>
                </div>
                <div class="basket__btns" id="${name.toLowerCase()}_card">
                    <span class="basket__sym">-</span>
                    <p class="basket__amount">${amount}</p>
                    <span class="basket__sym">+</span>
                </div>
            </div>`
}
window.addEventListener("click", (e) => {
    const btn = e.target
    if (btn.classList.contains('basket__sym')) {
        const parent = btn.closest('.basket__btns'),
            parentId = parent.getAttribute('id').split("_")[0]
        btn.innerHTML == '+' ? product[parentId].amount++ : product[parentId].amount--
        basketInfo()
    }
})


function totalAmount() {
    let amount = 0
    for (const key in product) {
        amount += product[key].amount
    }
    return amount
}
function totalSumm() {
    let total = 0
    for (const key in product) {
        total += product[key].Summ
    }
    return total
}

shopImg.addEventListener('click', () => {
    basket.classList.add("active")
})
basketClose.addEventListener('click', () => {
    basket.classList.remove("active")
})



const basketBtn = document.querySelector('.basket__bottom'),
    printMain = document.querySelector('.print__main'),
    printTotal = document.querySelector('.print__total');

basketBtn.addEventListener('click', () => {
    for (const key in product) {
        const { amount, name, Summ } = product[key]
        if (amount) {
            printMain.innerHTML += `
        <div class="print__main-item">
            <p class="print__main-name">
                <span>${name}</span>
                <span>${amount}</span>
            </p>
            <p>${Summ}</p>
        </div>`
        }
    }
    printTotal.innerHTML = `Total Sum: ${totalSumm()}so'm`
    window.print()
})