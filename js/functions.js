"use strict";

console.log('load functions.js');

var currentCourse = null;
var currentCard = null;
var feedback = [];

// Returns a numeric timestamp in local time.
function timestampNow() {
    var date = new Date();
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

// Card class
function Card(question, answers, hint, comment) {
    this.question = question;
    this.answers = answers;
    this.hint = hint;
    this.comment = comment;
    this.numberOfCorrectAnswers = 0;
    this.timestampOfLastWrongAnswer = 0;
    this.timestampForSkipping = 0;
    this.garbageFlag = false;
} 

// Course class
function Course(name) {
    this.name = name;
    this.cards = [];
}

Course.prototype.addCard = function(aCard) {
    this.cards.push(aCard);
}

Course.prototype.eligibleCards = function() {
    return this.cards.filter(
        function(each){
            return each.timestampForSkipping !== timestampNow();
        });
}

Course.prototype.mergeRecord = function(question, answers, hint, comment) {
    var oldCard = this.cards.find(function(each) {return each.question === question});
    if (oldCard) {
        //console.log("Old card found for %o.", question);
        oldCard.question = question;
        oldCard.answers = answers;
        oldCard.hint = hint;
        oldCard.comment = comment;
        oldCard.garbageFlag = false;
    }
    else {
        //console.log("No card found for %o. Create a new card.");
        var newCard = new Card(question, answers, hint, comment);
        this.cards.push(newCard);
    }
}

Course.prototype.storageKey = function() {
    return "course" + this.name;
}

Course.prototype.saveToLocalStorage = function() {
    console.log('saveToLocalStorage()');
    localStorage.setItem(this.storageKey(), JSON.stringify(this));
}

Course.prototype.loadFromLocalStorage = function() {
    console.log('loadFromLocalStorage(%o)', this.name);
    var newCourse = this;
    var loadedCourse = localStorage.getItem(this.storageKey());
    if (!loadedCourse) {
        console.log("Not found in local storage.");
        return;
    }
    loadedCourse = JSON.parse(loadedCourse);
    console.assert(this.name === loadedCourse.name);
    loadedCourse.cards.forEach(function(each) {
        //console.log(each.question);
        each.garbageFlag = true;
        newCourse.addCard(each);
    });
}

Course.prototype.cleanupGarbage = function() {
    console.log('cleanupGarbage(%o) - begin', this.name);
    this.cards.forEach(function(each) {
        if (each.garbageFlag) console.log("Garbage %o", each.question);
    });
    this.cards = this.cards.filter(function(each) { return !each.garbageFlag });
    console.log('cleanupGarbage(%o) - end', this.name);
}

function makePersistent() {
    console.log("makePersistent()");
    currentCourse.saveToLocalStorage();
}

function addCards(name) {
    console.log('addCards(%o)', name);
    self.currentCourse.inputType = "default";
    if (name === "chinese") {
        chinese();
        return;
    }
    if (name === "traditional") {
        traditional();
        return;
    }
    if (name === "greek") {
        greek();
        return;
    }
    addGermanCards();
}

function loadCourse(name) {
    console.log('loadCourse(%o)', name);
    self.currentCourse = new Course(name);
    self.currentCourse.loadFromLocalStorage();
    addCards(name);
    self.currentCourse.cleanupGarbage();
    localStorage.setItem("currentCourseName", name);
    $("#course_name").html(self.currentCourse.name);
    fillScreen();
}

function pageLoaded () {
    console.log('pageLoaded() - begin');
    $("#answer").keypress(function(event){
        currentInputProcessor().processKeyPressed(event, this);
    });
    var currentCourseName = localStorage.getItem("currentCourseName") || "chinese";
    loadCourse(currentCourseName);
    console.log('pageLoaded() - end');
}

function currentInputProcessor() {
    return registeredInputProcessors[currentCourse.inputType || "default"];
}

function inspectCurrentCourse() {
    alert(JSON.stringify(currentCourse));
}

function inspectFeedback() {
    alert(JSON.stringify(feedback));
}

function addQuestionHintAnswer(question, hint, answer) {
    currentCourse.mergeRecord(question, [answer], hint, "");
}

function addQuestionAnswersComment(question, answers, comment) {
    currentCourse.mergeRecord(question, answers, "", comment);
}

function fillScreen() {
    console.log('fillScreen()');
    var eligibleCards = currentCourse.eligibleCards();
    if (!eligibleCards.length) {
        console.log('No eligible cards available');
        alert('No eligible cards available');
        return;
    }
    setCurrentCard(eligibleCards[0]);
}

function setCurrentCard(card) {
    console.log('setCurrentCard() - begin');
    console.log('question=%o', card.question);
    currentCard = card;
    $('#question').text(card.question);
    $('#answer').val(card.hint);
    console.log('setCurrentCard() - end');
}

function processAnswer() {
    console.log("processAnswer()");
    let answer = $('#answer').val();
    console.log("answer=%o", answer);
    answer = preprocessAnswer(answer);    
    if (!hasAnswer(answer)) {
        processMissingAnswer(answer);
        return;
    }
    var reason = currentInputProcessor().reasonForInvalidPrecheck(answer);
    if (reason) {
        console.log("wrong answer type ", answer);
        $("#feedback").html('<font color="red">'+reason+'</font>');
        return;
    }
    if (isAcceptableAnswer(answer)) {
        processCorrectAnswer(answer)
    } else {
        processWrongAnswer(answer);
    }            
    makePersistent();
}

function preprocessAnswer(aString) {
    // Replace multiple white characters with a single space.
    return aString.trim().replace(/\s+/g, ' ');
}

function hasAnswer(answer) {
    if (answer == "") return false;
    return true;
}

function removeWhite(str) {
    return str.replace(/\s+/g,'');
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
    for (var i = 0; i < currentCard.answers.length; i++) {
        var expectedAnswer = currentCard.answers[i];
        if (userAnswer === userAnswer.toLowerCase()) {
            expectedAnswer = expectedAnswer.toLowerCase();
        }
        if (userAnswer === removeAccents(userAnswer)) {
            expectedAnswer = removeAccents(expectedAnswer);
        }
        if (userAnswer === removeWhite(userAnswer)) {
            expectedAnswer = removeWhite(expectedAnswer);
        }
        if (userAnswer == expectedAnswer) return true;
    }
    return false;
}

function processMissingAnswer(answer) {
    console.log("processMissingAnswer(%o)", answer);
    $("#feedback").html('<font color="red">Gib bitte zuerst deine Antwort ein.</font>');}

function processCorrectAnswer(answer) {
    console.log("processCorrectAnswer(%o)", answer);
    var feedback = "Die Antwort ist richtig.";
    console.log("timestampOfLastWrongAnswer=%o", currentCard.timestampOfLastWrongAnswer)
    console.log("currentTimestamp=%o", timestampNow())
    if (currentCard.timestampOfLastWrongAnswer === timestampNow()) {
        currentCard.numberOfCorrectAnswers += 1;
    } else {
        feedback = "Die Anwort war beim ersten Versuch heute richtig und wird heute nicht mehr gefragt.";
        currentCard.numberOfCorrectAnswers += 4;
        currentCard.timestampForSkipping = timestampNow();
        console.log("timestampForSkipping %o", currentCard.timestampForSkipping);
    } 
    $("#feedback").html('<font color="darkgreen">' + feedback + '</font>');
    addFeedback(true, answer, currentCard);
    moveCurrentCard();
}

function processWrongAnswer(answer) {
    console.log("processWrongAnswer(%o)", answer);
    $("#feedback").html('<font color="red" weight="bold">Die Antwort ist leider noch nicht richtig.</font>')
    currentCard.timestampOfLastWrongAnswer = timestampNow();  
    currentCard.numberOfCorrectAnswers -= 2;   
    if (currentCard.numberOfCorrectAnswers) {
        currentCard.numberOfCorrectAnswers = 0;
    }
    addFeedback(false, answer, currentCard);
}

function addFeedback(isCorrect, userAnswer, card) {
    console.log("addFeedback(%o)", card.timestampForSkipping);
    var newRecord = {
            isCorrect: isCorrect,
            question: card.question,
            userAnswer: userAnswer,
            answer: card.comment || card.answers[0],
            skip : (card.timestampForSkipping || 0).toString()
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
    // html += '<th>Skip</th>';
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
        //html += '<td>';
        //html += feedback[i].skip;
        //html += '</td>';
        html += '</tr>';
    }
    html += '</table>';
    $("#feedback").append(html);
    console.log("showFeedback() - end");
}

function moveCurrentCard() {
    console.log("moveCurrentCard()");
    currentCourse.cards = currentCourse.cards.filter(function(each) {
            return !(Object.is(each,currentCard));
        });
    console.log("computeNewPosition()");
    console.log("    numberOfCorrectAnswers %o", currentCard.numberOfCorrectAnswers);
    const mapping = [ 1, 3, 6, 10, 20, 30, 40, 50, 70, 100, 140, 180, 230, 300, 380 ];
    var newPosition = mapping[currentCard.numberOfCorrectAnswers] || 10000;
    newPosition = Math.min(currentCourse.eligibleCards().length - 1, newPosition);
    console.log("    newPosition %o", newPosition);
    var cardAtNewPosition = currentCourse.eligibleCards()[newPosition];
    var adjustedPosition = currentCourse.cards.indexOf(cardAtNewPosition);
    console.assert(adjustedPosition >= 0, "unexpected adjustedPosition");
    console.log("    adjustedPosition %o", adjustedPosition);
    currentCourse.cards.splice(adjustedPosition, 0, currentCard);
    fillScreen();
    console.log("end moveCurrentCard()");
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
    self.shuffleArray(currentCourse.cards);
    setCurrentCard(currentCourse.cards[0]);
    makePersistent();
}

function onTest() {
    console.log("onTest() - begin");
    $("#answer").val("uhu");
    console.log("onTest() - end");
}

function onPeekAnswer() {
    $("#feedback").html("");
    addFeedback(false, "", currentCard);
}

console.log("bbbb");


