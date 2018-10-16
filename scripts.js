
let cards;
let hasFlippedCard = false;/*отвечать за состояние переворота*/
let lockBoard = false;
let firstCard, secondCard;
let instruments = ["","Treble clef","violin","harp","drum","flute","piano","saxophone"];
let frontImage = '<img class="back-face" src="img/1.png" alt="Treble clef" />';

function draw(){
	let game = document.getElementById("game");
	let textHtml = "";
	for(let i = 2; i<8; i++){
	    textHtml =  '<div class="memory-card" data-framework="';
		textHtml =  textHtml +instruments[i];
		textHtml =  textHtml +'"><img class="front-face" src="img/';
		textHtml =  textHtml +i;
		textHtml =  textHtml +'.png" alt="';
		textHtml =  textHtml +instruments[i];
		textHtml =  textHtml +'" /> <img class="back-face" src="img/1.png" alt="';
		textHtml =  textHtml +instruments[1];
		textHtml =  textHtml +'" /> </div>';
		game.innerHTML = game.innerHTML + textHtml + textHtml;
	}
}
	//к каждой карточке '.memory-card' прикрепить событие flipCard вызываемое при каждом onclick
function handling(){
	cards = document.querySelectorAll('.memory-card');
	cards.forEach(card => card.addEventListener('click', flipCard));
}

// при нажатии кнопки мыши меняется картинка
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}
//проверка на совпадение карточек
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//В случае совпадения  обработчики событий будут откреплены от обеих карточек, чтобы предотвратить их переворот
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
//перевернёт обе карточки с помощью 1500 мс тайм-аута, который удалит класс .flip
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}
//обнуление переменных firstCard и secondCard
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


//Перемешивание
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

//запуск игры
function gamePlay() {	
     draw();
	 handling();
     shuffle();
     
}

gamePlay();