"use strict";

console.log('load functions.js');

var cards = [];
var currentCard = null;
var feedback = [];

function addCards(name) {
    console.log('addCards(%o)', name);
    if (name === "chinese") {
        addChineseCards();
        return;
    }
    if (name === "greek") {
        addGreekCards();
        return;
    }
    addGermanCards();
}

function loadCourse(name) {
    removeAllCards()
    addCards(name);
    $("#course_name").html("Learn " + name.capitalize());
    fillScreen();
}

function pageLoaded () {
    console.log('pageLoaded() - begin');
    //loadCardsFromLocalStorage();
    loadCourse("chinese");
    console.log('pageLoaded() - end');
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

function addQuestionAnswerComment(question, answer, comment) {
    let card = {
        question: question, 
        answerHint: "", 
        answer: answer,
        comment: comment,
        numberOfCorrectAnswers: 0,
        numberOfWrongAnswers: 0
    };
    cards.push(card)
}

function saveCardsToLocalStorage() {
    console.log('saveCardsToLocalStorage()');
    localStorage.setItem("cards", JSON.stringify(cards));
}

function removeAllCards() {
    console.log('removeAllCards()');
    cards = [];
}

function loadCardsFromLocalStorage() {
    console.log("loadCardsFromLocalStorage()");
    cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards) removeAllCards()
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
    console.log('setCurrentCard() - begin');
    console.log('question=%o', card.question);
    currentCard = card;
    $('.question').text(card.question);
    $('.answer').val(card.answerHint);
    console.log('setCurrentCard() - end');
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

function removeAccents(str) {
    str = str.replace(/Ā/g,"A");
    str = str.replace(/ā/g,"a");   
    str = str.replace(/Á/g,"A");      
    str = str.replace(/á/g,"a");      
    str = str.replace(/Ǎ/g,"A");      
    str = str.replace(/ǎ/g,"a");      
    str = str.replace(/À/g,"A");     
    str = str.replace(/à/g,"a");       
    str = str.replace(/Ē/g,"E");       
    str = str.replace(/ē/g,"e");       
    str = str.replace(/É/g,"E");       
    str = str.replace(/é/g,"e");       
    str = str.replace(/Ě/g,"E");       
    str = str.replace(/ě/g,"e");       
    str = str.replace(/È/g,"E");       
    str = str.replace(/è/g,"e");       
    str = str.replace(/Ī/g,"I");       
    str = str.replace(/ī/g,"i");       
    str = str.replace(/Í/g,"I");       
    str = str.replace(/í/g,"i");       
    str = str.replace(/Ǐ/g,"I");       
    str = str.replace(/ǐ/g,"i");       
    str = str.replace(/Ì/g,"I");       
    str = str.replace(/ì/g,"i");       
    str = str.replace(/Ō/g,"O");      
    str = str.replace(/ō/g,"o");      
    str = str.replace(/Ó/g,"O");       
    str = str.replace(/ó/g,"o");       
    str = str.replace(/Ǒ/g,"O");       
    str = str.replace(/ǒ/g,"o");       
    str = str.replace(/Ò/g,"O");       
    str = str.replace(/ò/g,"o");       
    str = str.replace(/Ū/g,"U");       
    str = str.replace(/ū/g,"u");       
    str = str.replace(/Ú/g,"U");       
    str = str.replace(/ú/g,"u");       
    str = str.replace(/Ǔ/g,"U");       
    str = str.replace(/ǔ/g,"u");       
    str = str.replace(/Ù/g,"U");       
    str = str.replace(/ù/g,"u");       
    str = str.replace(/Ü/g,"Ü");       
    str = str.replace(/ü/g,"ü");      
    str = str.replace(/Ǘ/g,"Ü");       
    str = str.replace(/ǘ/g,"ü");       
    str = str.replace(/Ǚ/g,"Ü");       
    str = str.replace(/ǚ/g,"ü");       
    str = str.replace(/Ǜ/g,"Ü");       
    str = str.replace(/ǜ/g,"ü");
    return str;
}

function isAcceptableAnswer(userAnswer) {
    // todo: add some flag to the card or course to customize the conversion
    var expectedAnswer = currentCard.answer
    if (userAnswer === userAnswer.toLowerCase()) {
        expectedAnswer = expectedAnswer.toLowerCase();
    }
    if (userAnswer === removeAccents(userAnswer)) {
        expectedAnswer = removeAccents(expectedAnswer);
    }
    return (userAnswer == expectedAnswer);
}

function reportMissingAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="black">Gib bitte zuerst deine Antwort ein.</font>');}

function reportCorrectAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="darkgreen">Die Antwort ist richtig.</font>');
    currentCard.numberOfCorrectAnswers += 1;
    addFeedback(true, answer, currentCard);
    moveCurrentCard();
}

function reportWrongAnswer(answer) {
    console.log("reportWrongAnswer(%o)", answer);
    $(".feedback").html('<font color="red" weight="bold">Die Antwort ist leider noch nicht richtig.</font>')
    currentCard.numberOfCorrectAnswers -= 2;  
    if (currentCard.numberOfCorrectAnswers) {
        currentCard.numberOfCorrectAnswers = 0;
    }
    addFeedback(false, answer, currentCard);
}
    
function addFeedback(isCorrect, userAnswer, card) {
    console.log("addFeedback()");
    var newRecord = {
            isCorrect: isCorrect,
            question: card.question,
            userAnswer: userAnswer,
            answer: card.comment || card.answer
        };
    feedback.unshift(newRecord);  // unshift() adds at the beginning
    showFeedback();
}

function showFeedback() {
    console.log("showFeedback() - begin");
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
    console.log("showFeedback() - end");
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