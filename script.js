let qtyCards = 0;
let pairsCounter = 0;
let selectedCards = 0;
let moves = 0;
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  totalSeconds++;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(num) {
  let numString = num + "";
  if (numString.length < 2) {
    return "0" + numString;
  } else {
    return numString;
  }
}

function createCards(){
    for (let  i = 0; i < qtyCards; i++){
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute("onclick","selectCard(this);");
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
`<img src="img/unicornparrot.gif" alt="Unicorn Parrot" class="img"/>`,
`<img src="img/3parrots.gif" alt="Three Parrots" class="img"/>`,
`<img src="img/birthdayparrot.gif" alt="Birthday Parrot" class="img"/>`,
`<img src="img/brazilparrot.gif" alt="Brazillian Parrot" class="img"/>`,
`<img src="img/detectiveparrot.gif" alt="Detective Parrot" class="img"/>`,
`<img src="img/devilparrot.gif" alt="Devil Parrot" class="img"/>`,
`<img src="img/dogeparrot.gif" alt="Doge Parrot" class="img"/>`,
`<img src="img/drinkingparrot.gif" alt="Drinking Parrot" class="img"/>`,
`<img src="img/footballparrot.gif" alt="Football Parrot" class="img"/>`,
`<img src="img/headbangingparrot.gif" alt="Headbanging Parrot" class="img"/>`,
`<img src="img/lsdparrot.gif" alt="LSD Parrot" class="img"/>`,
`<img src="img/mustacheparrot.gif" alt="Mustache Parrot" class="img"/>`,
`<img src="img/negativeparrot.gif" alt="Negative Parrot" class="img"/>`,
`<img src="img/pirateparrot.gif" alt="Pirate Parrot" class="img"/>`,
`<img src="img/policeparrot.gif" alt="Police Parrot" class="img"/>`,
`<img src="img/popcornparrot.gif" alt="Pop Corn Parrot" class="img"/>`,
`<img src="img/scientistparrot.gif" alt="Scientist Parrot" class="img"/>`,
`<img src="img/soccerparrot.gif" alt="Soccer Parrot" class="img"/>`,
`<img src="img/sunglassparrot.gif" alt="Sunglass Parrot" class="img"/>`,
`<img src="img/tenisparrot.gif" alt="Tenis Parrot" class="img"/>`
];

let cardsArray = [];

let displayedCards = [];

function turnCard(card){
    const front = card.querySelector('.front-face');
    const back = card.querySelector('.back-face');
    back.classList.toggle('hide-back');
    front.classList.toggle('hide-front');
    back.classList.toggle('hold-back');
}

function removeCards(){
    const cardsToRemove = document.querySelectorAll('.card');
    console.log(cardsToRemove);
    for (let i = 0; i < cardsToRemove.length; i++){
        cardsToRemove[i].remove();
    }
}

function gameFinished(){
    alert(`Você ganhou em ${moves} jogadas e levou ${minutes.innerHTML} minutos e ${seconds.innerHTML} segundos!`);
    let restart = prompt('Você gostaria de jogar novamente?');
    if (restart === 'sim'){
        cardsArray = [];
        displayedCards = [];
        removeCards();
        selectCards = 0;
        pairsCounter = 0;
        moves = 0;
        const style = document.head.querySelector('style');
        style.remove();
        minutes.innerHTML = '00';
        seconds.innerHTML = '00';
        totalSeconds = 0;
        promptGame();
    }
}

function selectCard(card){
    if (card.classList.contains('selected')){
        return;
    }
    else if (selectedCards === 1){
        const selected = document.querySelector('.selected');
        if (selected.querySelector('.back-face').innerHTML == card.querySelector('.back-face').innerHTML){
            turnCard(card);
            selected.classList.remove('selected');
            selectedCards = 0;
            pairsCounter += 1;
            if (pairsCounter === qtyCards / 2){
                setTimeout(gameFinished, 500);
            }
        }
        else{
            setTimeout(turnCard, 0, card);
            setTimeout(turnCard, 1000, selected);
            setTimeout(turnCard, 1000, card);
            setTimeout(() => {selected.classList.remove('selected')}, 1000, selected);
            selectedCards = 0;
        }
        moves += 1;
    }
    else{
        turnCard(card);
        card.classList.add('selected');
        selectedCards = 1;
        moves += 1;
    }
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
    for (let  j = 0; j < qtyCards; j++){
        cardsArray[j].querySelector('.back-face').innerHTML = displayedCards[j];
        document.querySelector('.game').appendChild(cardsArray[j]);
    }
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width >= 1091){
        let cssTemplateString = `.game-size{width: calc(${qtyCards / 2} * 151px);}`;
        const styleTag = document.createElement("style");
        styleTag.innerHTML = cssTemplateString;
        document.head.insertAdjacentElement('beforeend', styleTag);
        document.querySelector('.game').classList.add('game-size');
    }
}

function promptGame(){
    do {
        qtyCards = Number(prompt('Gostaria de jogar com quantas cartas?'));
    } while (isNaN(qtyCards) || qtyCards % 2 !== 0 || qtyCards < 4 || qtyCards > 14);
    startGame();
}