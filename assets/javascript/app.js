//set variables for quetion answerlist and answer

var triviaQuestions = [{
	question: "What is Flying Lotus' real name?",
	answerList: ["Steve Ellison", "Hunter Bascko", "Jessie Jackson"],
	answer: 0
},{
	question: "What famous musician is he related to?",
	answerList: ["Samwise Gangi", "Alice Coltrane", "James Brown"],
	answer: 1
},{
	question: "What is the name of his first album?",
	answerList: ["0000", "1955", "1983"],
	answer: 2
},{
	question: "What late night network uses a lot of his music?",
	answerList: ["Adult Swim", "HBO AfterDark", "Encore Action"],
	answer: 0
},{
	question: "What independant hip-hop label did he work for before rising to fame?",
	answerList: ["Stones Throw Records", "Digi Crates", "Duck Down Music"],
	answer: 0
},{
	question: "What record label was he signed to that is also the home for Boards of Canada and Aphex Twin?",
	answerList: ["Hotflush Recordings", "Warp Records", "LuckyMe"],
	answer: 1
}];

// set jpeg array

var jpegArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "You got it!",
	incorrect: "Booooo.",
	endTime: "You goofed!",
	finished: "Let's count them up...and I'm sorry you had to play such an obscure trivia game."
}

// needs a startbutton

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// needs a start over button

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// function for a new game

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpeg').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h4>' + triviaQuestions[currentQuestion].question + '</h4>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

//countdown function

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h4>Time Remaining: ' + seconds + '</h4>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

// show the countdown

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h4>Time Remaining: ' + seconds + '</h4>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// answer page
// clears question page
function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#jpeg').html('<img src = "assets/images/'+ jpegArray[currentQuestion] +'.jpg" width = "500px">');

	//if correct
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
		// if incorrect
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		$('#jpeg').html('<img src = "assets/images/wrong.jpg" width = "500px">');
		//if unanswered
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		$('#jpeg').html('<img src = "assets/images/unanswered.jpeg" width = "500px">');
		answered = true;
	}
	
	// move to next question timeout

	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(score, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

// score function

function score(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpeg').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
	
}