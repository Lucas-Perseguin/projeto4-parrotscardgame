let qtyCards = undefined;

function createCards(){
    for (let  i = 0; i < qtyCards; i++){
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute("onclick","turnCard(this);");
        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face', 'face');
        const img = document.createElement('img');
        img.classList.add('img');
        img.setAttribute('src', 'img/front.png');
        img.setAttribute('alt', 'Parrot image');
        frontFace.appendChild(img);
        card.appendChild(frontFace);
        const backFace = document.createElement('div');
        backFace.classList.add('back-face', 'hide-back', 'face');
        card.appendChild(backFace);
        cardsArray.push(card);
    }
}

const cards =
[
`<img src="img/bobrossparrot.gif" alt="Bob Ross Parrot" class="img"/>`,
`<img src="img/explodyparrot.gif" alt="Explody Parrot" class="img"/>`,
`<img src="img/fiestaparrot.gif" alt="Fiesta Parrot" class="img"/>`,
`<img src="img/metalparrot.gif" alt="Metal Parrot" class="img"/>`,
`<img src="img/revertitparrot.gif" alt="Revertit Parrot" class="img"/>`,
`<img src="img/tripletsparrot.gif" alt="Triplets Parrot" class="img"/>`,
`<img src="img/unicornparrot.gif" alt="Unicorn Parrot" class="img"/>`
];

const cardsArray = [];

let displayedCards = [];

function turnCard(card){
    const front = card.querySelector('.front-face');
    const back = card.querySelector('.back-face');
    back.classList.toggle('hide-back');
    front.classList.toggle('hide-front');
    back.classList.toggle('hold-back');
}

function compare() { 
	return Math.random() - 0.5; 
}

function startGame(){
    cards.sort(compare);
    for (let  i = 0; i < qtyCards / 2; i++){
        displayedCards.splice(i * 2, 0, cards[i], cards[i])
    }
    displayedCards.sort(compare);
    createCards();
    for (let  i = 0; i < qtyCards; i++){
        cardsArray[i].querySelector('.back-face').innerHTML = displayedCards[i];
        document.querySelector('.game').appendChild(cardsArray[i]);
    }
    displayedCards = [];
    const cssTemplateString =`.game-size{width: calc(${qtyCards / 2} * 151px);}`;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = cssTemplateString;
    document.head.insertAdjacentElement('beforeend', styleTag);
    document.querySelector('.game').classList.add('game-size');
}

function promptGame(){
    do {
        qtyCards = Number(prompt('Gostaria de jogar com quantas cartas?'));
    } while (isNaN(qtyCards) || qtyCards == 0 || qtyCards % 2 !== 0 || qtyCards < 4 || qtyCards > 14);
    startGame();
}


/*@media (max-device-width: 614px) {

}*/