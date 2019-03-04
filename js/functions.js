"use strict";

var cards = [];
var currentCard = null;
var feedback = [];

console.log('load functions.js');

function pageLoaded () {
    console.log('pageLoaded()');
    //loadCardsFromLocalStorage();
    fetchLesson();
    fillScreen();
    console.log('end pageLoaded()');
}

function fetchLesson() {
    addCards();
}

function inspectLesson() {
    alert(JSON.stringify(cards));
}

function inspectFeedback() {
    alert(JSON.stringify(feedback));
}

function add(question, answerHint, answer) {
    let card = {
        question: question, 
        answerHint: answerHint, 
        answer: answer,
        numberOfCorrectAnswers: 0,
        numberOfWrongAnswers: 0
        };
    cards.push(card)
}
function saveCardsToLocalStorage() {
    console.log('saveCardsToLocalStorage()');
    localStorage.setItem("cards", JSON.stringify(cards));
}

function loadCardsFromLocalStorage() {
    console.log("loadCardsFromLocalStorage()");
    cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards)
        cards = []
}

function fillScreen() {
    console.log('fillScreen()');
    if (! cards.length) {
        console.log('No cards available');
        alert('No cards available');
        return;
    }
    setCurrentCard(cards[0]);
}

function setCurrentCard(card) {
    console.log('setCurrentCard()');
    console.log('question=%o', card.question);
    currentCard = card;
    $('.question').text(card.question);
    $('.answer').val(card.answerHint);
    console.log('end setCurrentCard()');
}

function processAnswer() {
    console.log("processAnswer()");
    let answer = $('.answer').val();
    console.log("answer=%o", answer);
    answer = preprocessAnswer(answer);    
    if (!hasAnswer(answer)) {
        reportMissingAnswer(answer);
    } else if (isAcceptableAnswer(answer)) {
        reportCorrectAnswer(answer)
    } else {
        reportWrongAnswer(answer);
    }
}

function preprocessAnswer(aString) {
    // Replace multiple white characters with a single space.
    return aString.trim().replace(/\s+/g, ' ');
}

function hasAnswer(answer) {
    if (answer == "") return false;
    return true;
}

function isAcceptableAnswer(answer) {
    return (answer == currentCard.answer);
}

function reportMissingAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="black">Gib bitte zuerst deine Antwort ein.</font>');}

function reportCorrectAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="darkgreen">Die Antwort ist richtig.</font>');
    currentCard.numberOfCorrectAnswers += 1;
    addFeedback({
        isCorrect: true,
        question: currentCard.question,
        userAnswer: answer,
        answer: currentCard.answer});
    moveCurrentCard();
}

function reportWrongAnswer(answer) {
    console.log("reportWrongAnswer(%o)", answer);
    $(".feedback").html('<font color="red" weight="bold">Die Antwort ist leider noch nicht richtig.</font>')
    currentCard.numberOfCorrectAnswers -= 2;  
    if (currentCard.numberOfCorrectAnswers) {
        currentCard.numberOfCorrectAnswers = 0;
    }
    addFeedback({
        isCorrect: false,
        question: currentCard.question,
        userAnswer: answer,
        answer: currentCard.answer});
}
    
function addFeedback(aRecord) {
    console.log("addFeedback()");
    feedback.unshift(aRecord);
    var html = '<table>';
    html += '<thead><tr>';
    html += '<th>Frage</th>';
    html += '<th>Deine Antwort</th>';
    html += '<th>Richtige Antwort</th>';
    html += '</tr></thead>';
      
    for (var i in feedback) {
        html += '<tr>';
        html += '<td>';
        html += feedback[i].question;
        html += '</td>';
        if (feedback[i].isCorrect) 
            html += '<td class="correct-feedback">';
        else
            html += '<td class="wrong-feedback">';
        html += feedback[i].userAnswer;
        html += '</td>';
        html += '<td>';
        html += feedback[i].answer;
        html += '</td>';
        html += '</tr>';
    }
    html += '</table>';
    $(".feedback").append(html);
    console.log("end addFeedback()");
}

function moveCurrentCard() {
    console.log("moveCurrentCard()");
    let card = cards.shift();
    console.log("Shifted card %o", card.question);
    let newPosition = computeNewPosition(card);
    cards.splice(newPosition, 0, card);
    fillScreen();
    console.log("end moveCurrentCard()");
}

function computeNewPosition(card) {
    console.log("computeNewPosition()");
    console.log("    numberOfCorrectAnswers %o", card.numberOfCorrectAnswers);
    //const mapping = [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 115, 145, 170, 200 ];
    const mapping = [ 0, 3, 6, 10, 20, 30, 40, 50, 70, 100, 140, 180, 230, 300, 380 ];
    let newPosition = mapping[card.numberOfCorrectAnswers] 
    if (! newPosition) newPosition = 1000000;
    newPosition = Math.min(cards.length, newPosition);
    console.log("    newPosition %o", newPosition);
    return newPosition;
}

function shuffleArray(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleCards() {
    self.shuffleArray(self.cards);
    setCurrentCard(cards[0]);
}