"use strict";

var cards = [];
var currentCard = null;
var feedback = [];

console.log('load functions.js');

function pageLoaded () {
    console.log('pageLoaded()');
    loadCardsFromLocalStorage();
    //fetchLesson();
    fillScreen();
    console.log('end pageLoaded()');
}

function fetchLesson() {
    addCards();
}

function addCards() {
    console.log('addCards()');
    add("springen (Präsens, er)","er ","er springt");
    add("springen (Präterium, er)","er ","er sprang");
    add("geben (Präsens, ich)","ich ","ich gebe");
    add("geben (Präsens, er)","er ","er gibt");
    add("geben (Präterium, er)","er ","er gab");
    add("geben (Perfekt, er)","er ","er hat gegeben");
    add("lernen (Präterium, ich)", "ich ", "ich lerne");
    add("trinken (Präsens, ich)", "ich ", "ich trinke");
    add("trinken (Präterium, ich)", "ich ", "ich trank");
    add("trinken (Perfekt, ich)", "ich ", "ich habe getrunken");
    add("essen (Präterium, ich)", "ich ", "ich aß");
    add("essen (Präsens, ich)", "ich ", "ich esse");
    add("essen (Präsens, wir)", "wir ", "ich essen");
    add("beißen (Präsens, er)", "er ", "er beißt");
    add("beißen (Präterium, er)", "er ", "er biss");
    add("gehen (Präterium, ich)", "ich ", "ich gehe");
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
    moveCurrentCard();
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
    cards.push(card);
    fillScreen();
    console.log("end moveCurrentCard()");
}

