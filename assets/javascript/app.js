var correctCount = 0;
var inCorrectCount = 0;
var unAnsweredCount = 0;
var count = 0;
var sec;
var showQuiz;
var showTime;

//Question array
var quizList = [{
    name: "question1",
    question: "1. Who is often called the King Of Pop?",
    answer: "Michael Jackson",
    choices: ["Sam Smith", "Bobby Shmurda", "Yo-Yo Ma", "Michael Jackson"],
    image: "assets/images/MJpop.jpg"
}, {
    name: "question2",
    question: "2. Who are the two artist who sang 'Drop it like it's hot'?",
    answer: "Snoop Dogg & Pharell Williams",
    choices: ["Bonnie & Clyde", "Snoop Dogg & Pharell Williams", "Sonny & Cher", "Tupac Shakur & Biggie Smalls"],
    image: "assets/images/snop$phl.jpg"
}, {
    name: "question3",
    question: "3. 'Hotel California' is the song of which band?",
    answer: "Eagles",
    choices: ["Rolling Stones", "Eagles", "Maroon 5", "Destiny's Child"],
    image: "assets/images/Eagles.jpg"
}, {
    name: "question4",
    question: "4. What is the name of the studio where 'The Beatles' recorded most of their songs?",
    answer: "Abby Road",
    choices: ["Abby Road", "Studio 54", "Electric Lady Studio", "Studio 1"],
    image: "assets/images/abby.jpg"
}, {
    name: "question5",
    question: "5. Who sang the '8 Mile Road'?",
    answer: "Eminem",
    choices: ["Missy Elliot", "Eminem", "John Legend", "Ciara"],
    image: "assets/images/em.jpg"
}, {
    name: "question6",
    question: "6. Which popular artists' father sang 'My Achy Breaky Heart'?",
    answer: "Miley Cyrus",
    choices: ["Britney Spears", "Beyonce", "Miley Cyrus", "Nick Jonas"],
    image: "assets/images/mc.jpg"
}, {
    name: "question7",
    question: "7. For what reason is February 6th a national holiday in Jamaica?",
    answer: "Bob Marley Birthday",
    choices: ["Bob Marley Birthday", "Jamaican National Smoke-out day", "Bob Marley deceased day", "Jamaican National Celebration of Reggae Music"],
    image: "assets/images/marley.jpg"
}, {
    name: "question8",
    question: "8. What the name of the infamous group Frank Sinatra, Dean Martin and Sammie Davis Jr were in ?",
    answer: "The Rat Pack",
    choices: ["The Mouse Trap", "The Rat Pack", "The Amigos", "The Entertainers"],
    image: "assets/images/rat.jpg"
}, {
   
   }];

// Resetting variable values 
function restart() {
    correctCount = 0;
    inCorrectCount = 0;
    unAnsweredCount = 0;
    count = 0;
    $('.results').hide();
    $("#restart").hide();
    startQuiz();
}

// Display all questions, set lime left and check result
function displayQuestion() {

    var multipleChoice = "";
    sec = 10;
     // Append all questions along with its choices
   // quiz = "<span class='question'>" + quizList[count].question + "</span>" + multipleChoice;
    var questions = $("<div>");
    questions.attr("class","question");
    questions.text(quizList[count].question);



    //Get mutiple choice for each question, set it's values according to the choices and set same name for each question to group them together.
    for (var j = 0; j < quizList[count].choices.length; j++) {
        // multipleChoice += "<br><input name=" + quizList[count].name + " type='radio' data-val=" + quizList[count].choices[j] + ">&emsp;" + quizList[count].choices[j];
    // }
          multipleChoice = $("<input>");
          multipleChoice.attr("data-val", quizList[count].choices[j]);
          multipleChoice.attr("name", quizList[count].name);
          multipleChoice.attr("type", 'radio');
          // multipleChoice.text(quizList[count].choices[j]);
        
          questions.append(multipleChoice);
          questions.append($("<span>").text(quizList[count].choices[j]));
          questions.append($("<br>"));
}



          

    // Append all questions along with its choices
    // quiz = "<span class='question'>" + quizList[count].question + "</span>" + multipleChoice;

    // Append all question and its choices in the form and display it on screen
    // $(".quiz-form").html(quiz);
    $(".quiz-form").empty()
    $(".quiz-form").append(questions);

    $('.form').show();
    $(".time-left").show();

    //Check the result after 10 seconds
    setTimeout(checkResult, 1000 * 10);
}

// Check the result, display answer and update couters
function checkResult() {
    var val = "" + "";
    var ans = "";
    $(".time-left").hide();

    // Get the value of checked button and compare it with answer of the question. Update the counters accordingly.
    val = $("input[name='" + quizList[count].name + "']:checked").attr("data-val");
    ans = quizList[count].answer;

    if (val === ans) {
        correctCount++;
        $(".quiz-form").html("<div class='answer correct'><strong>CORRECT !!</strong><hr>Answer is : " + ans + "<br><img src='" + quizList[count].image + "' class='ansImg'></div>");
    } else if (val === undefined) {
        unAnsweredCount++;
        $(".quiz-form").html("<div class='answer wrong'><strong>TIMEOUT !!</strong><hr>Answer is : " + ans + "<br><img src='" + quizList[count].image + "' class='ansImg'></div>");
    } else {
        inCorrectCount++;
        $(".quiz-form").html("<div class='answer wrong'><strong>INCORRECT !!</strong><hr>Answer is : " + ans + "<br><img src='" + quizList[count].image + "' class='ansImg'></div>");
    }

    console.log(count + " | ans: " + ans + " | val: " + val + " | correct: " + correctCount + " | inCorrect: " + inCorrectCount + " | unAns: " + unAnsweredCount);
}

// Display final result
function displayResult(correct, incorrect, unanswered) {
    var totalQuiz = quizList.length;
    var displayMessage = "Your score out of " + totalQuiz + "<hr>Correct answers : " + correct + "<br> Incorrect answers : " + incorrect + "<br> Unanswered : " + unanswered;
    $(".score").html(displayMessage);
    $('.results').show();
    $('.map-image').show();
    $('.form').hide();
}

//Next question - Display next question and status of Questionnaire
function nextQuestion() {
    //If the max number question reached then clear intervals, show restart button. Else show next question.
    if (count === quizList.length - 1) {
        clearInterval(showQuiz);
        clearInterval(showTime);
        displayResult(correctCount, inCorrectCount, unAnsweredCount);
        $("#restart").show();
    } else {
        count++;
        displayQuestion();
    }
}

//Start quiz - display first question, display timer and set interval for the next question
function startQuiz() {
    $('.map-image').hide();
    $('#start').hide();
    displayQuestion();

    showQuiz = setInterval(nextQuestion, 1000 * 15);
    showTime = setInterval(displayTime, 1000);
}

// Display the timer
function displayTime() {

    $(".time-left").html("Time left : " + sec-- + " seconds");
    console.log("time" + sec);
}

$(document).ready(function () {

    // When click on start button
    $("#start").click(startQuiz);

    // When click on restart button
    $("#restart").click(restart);

});
