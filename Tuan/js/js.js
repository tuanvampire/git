var score = 100;// score of game
var heart = 3;// Times played
var arraySpeed = [2, 4, 10];// save array speed
var speed = arraySpeed[0];// speed of game
var monterSize = 60;// size monter
var level = 1;// level of game
var countMonter = 0;// count monter show in display
var countBoom = 3;// Count the number of user-pressed bombs
var countBlood = 5;// Count blood
var endGame = false;// check gameover to only click menu
var isPause = false;// check pause
var random = (Math.floor(Math.random()*3)+1) * 100;// random to determine the coordinates of the monster9
/* get element canvas */
var canvas = $("canvas")[0];
canvas.width = 800;
canvas.height = 450;
var context = canvas.getContext("2d");
/*=========Image Menu and Background==========*/
var backGround = new Image();
backGround.src = "image/background1.png";
var backGroundGameover = new Image();
backGroundGameover.src = "image/over.png";
var pauseIcon = new Image();
pauseIcon.src = "image/pauseIcon.png";
var refreshIcon = new Image();
refreshIcon.src = "image/ref.png";
var boomIcon = new Image();
boomIcon.src = "image/boomIcon.png";
var boom = new Image();
boom.src = "image/boom.png";
var bloodIcon = new Image();
bloodIcon.src = "image/bloodIcon.png";
/*==============Image Monter=================*/
// set image to monter1
var monter1Image = new Image();
monter1Image.src = "image/monster1.png";
// set image to monter2
var monter2Image = new Image();
monter2Image.src = "image/monster2.png";
// set image to monter3
var monter3Image = new Image();
monter3Image.src = "image/monster3.png";
// set image to monter4
var monter4Image = new Image();
monter4Image.src = "image/monster4.png";
// set image to monter5
var monter5Image = new Image();
monter5Image.src = "image/monster5.png";
// set image to monter6
var monter6Image = new Image();
monter6Image.src = "image/monster6.png";
// set image to monter7
var monter7Image = new Image();
monter7Image.src = "image/monster7.png";
// set image to monter8
var monter8Image = new Image();
monter8Image.src = "image/monster8.png";
var monter9Image = new Image();
monter9Image.src = "image/monster9.png";
/*==============Create Monter=================*/
var monter1 = new monter(680 ,450, 710, 60,  500, 150, 710, 60, true,  false, monter1Image);// monter 1 left-top
var monter2 = new monter(270 ,390, 710, 260,  500, 20, 710, 60, false, false, monter2Image);// monter 2 center-top
var monter3 = new monter(270 ,390, 710, 260,  500, 120, 710, 60, false, false, monter3Image);// monter 3 right-top
var monter4 = new monter(270 ,390, 710, 260,  500, 220, 710, 60, false, false, monter4Image);// monter 4 center-left
var monter5 = new monter(680 ,450, 710, 60,  500, 220, 710, 60, false, false, monter5Image);// monter 5 center-right 
var monter6 = new monter(290 ,10, 710, 260,  500, 320, 710, 60, false, false, monter6Image);// monter 6 left-bottom
var monter7 = new monter(290 ,10, 710, 260,  500, 320, 710, 60, false, false, monter7Image);// monter 7 center-bottom
var monter8 = new monter(290 ,10, 710, 60,  500, 120, 710, 60, false, false, monter8Image);// monter 1 right-bottom
var monter9 = new monter(290 ,10, 710, 60,  500, 20, 710, 60, false, false, monter9Image);//monter 9 run random
/* Create array save 9 monter */
var monters = [monter1, monter2, monter3, monter4, monter5, monter6, monter7, monter8, monter9];
/* Create requestAnimationFrames for browers */
var reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
/* Create sessionStrage to save highScore for browers */
sessionStorage.setItem("highScore","0");
/**
 * function init before start game
 */
 function startGame() {  // ĐIỀU KIỆN DỪNG CHƯƠNG TRÌNH
	if (score < 10 || heart < 0) {
		if (score < 0) {
			score = 0;
		}
		isPause = true;
		endGame = true;
		gameOver();
	} 
	if (isPause == false) {
		endGame = false;
   		drawMenu();
   		drawBlood();
    	drawGame();
    }
    reqAnimation(startGame);
 }
/**
 * Function draw header position
 */
 function drawMenu() { // THÔNG SỐ IMAGE BAN ĐẦU
    context.drawImage(backGround, 0, 0, 800, 450);
    context.drawImage(pauseIcon, 40, 20, 40, 40);
    context.drawImage(refreshIcon, 90, 20, 40, 40);
    context.fillStyle = "#fffaf8";
	context.font = "40px Forte";
    context.fillText(score, 120, 285);
    context.fillStyle = "#ffcd05";
    context.fillText(heart, 135, 320);
    if (countBoom > 0) {
    	context.drawImage(boomIcon, 140, 20, 40, 40);
    	context.fillStyle = "white";
    	context.fillText(countBoom, 570, 30);
    }
 }
/**
 * Function draw game position
 */
 function drawGame() { //CÁCH DI CHUYỂN CỦA MONSTER
	var temp = 0; // save count monter
	for (var i = 0; i < 9; i++) {
		if (monters[i].isShow) {
			temp ++;
    		context.drawImage(monters[i].ImageMonter, monters[i].x, monters[i].y, monterSize, monterSize);
    		monters[i].move();
		}
	}
	countMonter = temp+1;
 }
 /**
 * Function draw blood position
 */
 function drawBlood() {
	for (var i = 0; i < bloodList.length; i++) {
    	context.drawImage(bloodIcon, bloodList[i].x, bloodList[i].y, monterSize, monterSize);
	}
 }
/**
 * Function show random monter
 */
 function randomMonter() { // HÀM RANDOM MONSTER
 	var number = Math.floor((Math.random()*6)+1);
 	monters[number].isShow = true;
 }
 /**
 * Class blood
 * @param {number} position X of blood
 * @param {number} position Y of blood
 */
 function blood(x, y) {
	this.x = x;
	this.y = y;
 }
 var bloodList = [];
/**
 * Class Monster
 * @param {number} position beginX monter
 * @param {number} position beginY of monter
 * @param {number} position X of monter
 * @param {number} position Y of monter
 * @param {number} position moveToX of monter
 * @param {number} position moveToY of monter
 * @param {number} position finishX of monter (default X max monter)
 * @param {number} position finishY of monter (default Y max monter)
 * @param {number} position dieX of monter
 * @param {number} position dieY of monter
 * @param {boolean} show or hiden monter
 * @param {boolean} die or not die
 */
 function monter(beginX, beginY, x, y, moveToX, moveToY, finishX, finishY, isShow, isDie, ImageMonter) {
	this.beginX = beginX;
	this.beginY = beginY;
	this.x = x;
	this.y = y;
	this.moveToX = moveToX;
	this.moveToY = moveToY;
	this.finishX = finishX;
	this.finishY = finishY;
	this.isShow = isShow;
	this.isDie = isDie;
	this.ImageMonter = ImageMonter;
 }
/**
 * add funtion move give monster
 */
 monter.prototype.move = function () {
	// when monter move maximun
	if (this.x == this.moveToX && this.y == this.moveToY) {
		this.x = this.moveToX;
		this.y = this.moveToY;
		this.moveToX = this.beginX;
		this.moveToY = this.beginY;
	}
	// move following X
	if (this.x == this.moveToX) {
			this.x = this.moveToX;
	} else {
		if (this.x > this.moveToX) {
			this.x -= speed;
		} else {
			this.x += speed;
		}
	}
	// move following Y
	if (this.y == this.moveToY) {
		this.y = this.moveToY;
	} else {
		if (this.y > this.moveToY) {
			this.y -= speed;
		} else {
			this.y += speed;
		}
	}
	// when monster return position begin and revise the original value
	if (this.x == this.beginX && this.y == this.beginY) {
		score -= 10 * level;
		this.isShow = false;
		this.x = this.beginX;
		this.y = this.beginY;
		this.moveToX = this.finishX;
		this.moveToY = this.finishY;
		randomMonter();
	}
 }
/**
 * Functionc handle event click in canvas
 */
 canvas.addEventListener("click",function(e) {
	var mouseX = e.pageX - canvas.offsetLeft;
	var mouseY = e.pageY - canvas.offsetTop;
	clickMenu(mouseX, mouseY);
	if (isPause == false) {
		heart--;
		for (var i = 0; i < 9; i++) {
			clickMonter(mouseX, mouseY, monters[i]);
		}
	}
 });
/**
 * Function handle event click monter
 * @param {number} position mouse X
 * @param {number} position mouse Y
 * @param {monterCurrent} position of monter current
 */
 function clickMonter(mouseX, mouseY, monterCurrent) {
	if (mouseX > monterCurrent.x && mouseX <= monterCurrent.x + monterSize && mouseY > monterCurrent.y && mouseY <= monterCurrent.y + monterSize && monterCurrent.isShow == true) {
		var sound = new Audio('audio/2.mp3');
		sound.play();	
		heart++;
		score += 10 * level;
		monterCurrent.isShow = false;
		monterCurrent.x = monterCurrent.beginX;
		monterCurrent.y = monterCurrent.beginY;
		monterCurrent.moveToX = monterCurrent.finishX;
		monterCurrent.moveToY = monterCurrent.finishY;
		var tempBlood = new blood(mouseX, mouseY);
		bloodList.push(tempBlood);
		/* set again speed and level*/
		var tempLevel = Math.floor(score/100);
		if (level < tempLevel && tempLevel <= 3) {
			setDefaultMonter();
			monter9.isShow = true;
			level = tempLevel;
			speed = arraySpeed[level-1];
		}
		/* Create new monter when monter current die*/
		for (var i = 0; i < level; i++) {
			randomMonter();
		}
	}
 }
/**
 * Function handle event click restart
 * @param {number} position mouse X
 * @param {number} position mouse Y
 */
 function clickMenu(mouseX, mouseY) {
	if (endGame) {
		clickRestart(mouseX, mouseY);
	}
	else {
		clickRestart(mouseX, mouseY);
		clickPause(mouseX, mouseY);
		if (isPause == false && countBoom > 0) {
			clickBoom(mouseX, mouseY);
		}
	}
 }
/**
 * Function handle event click restart
 * @param {number} position mouse X
 * @param {number} position mouse Y
 */
 function clickRestart(mouseX, mouseY) {
	if (mouseX > 490 && mouseX <= 540 && mouseY > 20 && mouseY <= 60) {
		setDefaultMonter();
		isPause = false;
		speed = arraySpeed[0];
		bloodList = [];
		countBoom = 3;
		score = 100;
		heart = 4;
		level = 1;
		randomMonter();
	}
 }
/**
 * Function handle event click pause
 * @param {number} position mouse X
 * @param {number} position mouse Y
 */
 function clickPause(mouseX, mouseY) {
	if (mouseX > 440 && mouseX <= 480 && mouseY > 20 && mouseY <= 60) {
		isPause = !isPause;
		if(isPause == false) {
			heart++;
		}
	}
 }
/**
 * Function handle event click boom
 * @param {number} position mouse X
 * @param {number} position mouse Y
 * Function will delay 2s to draw boom
 */
 function clickBoom(mouseX, mouseY) {
	if (mouseX > 540 && mouseX <= 580 && mouseY > 20 && mouseY <= 60) {
		var sound = new Audio('audio/boom.mp3');
		sound.play();	
		countBoom--;
		setDefaultMonter();
		score += countMonter*10*level;
		var temp = Math.floor(score/100);
		if (level < temp && temp <= 3) {
			level = temp;
			speed = arraySpeed[level-1];
		}
		clickPause(450, 30);
		context.drawImage(boom, 160, 80, 400, 400);
		setTimeout(function() {
			randomMonter();
			isPause = !isPause;
		}, 1000);
	}
 }
/**
 * Function gameover
 */
 function gameOver() {	// HÀNH ĐỘNG GAMEOVER
	for (var i = 0; i < 8; i++) {
		monters[i].isShow = false; // TẮT MONSTER
	}
	if (score > Number(sessionStorage.getItem("highScore"))) {
		sessionStorage.setItem("highScore", score);  // ĐIỀU KIỆN THAY ĐỔI HIGHSCORE
	}
	context.drawImage(backGroundGameover, 0, 0, 800, 450);
    context.drawImage(refreshIcon, 340, 270, 120, 120);
	context.fillStyle = "#e8f6f7";
    context.font = "40px Ravie";
    context.fillText(score, 440, 196);
    context.fillText(sessionStorage.getItem("highScore"), 420, 238);
 }
/**
 * set default monter go to status start
 */
 function setDefaultMonter() {
 	for (var i = 0; i < 9; i++) {
		monters[i].x = monters[i].beginX;
		monters[i].y = monters[i].beginY;
		monters[i].moveToX = monters[i].finishX;
		monters[i].moveToY = monters[i].finishY;
		monters[i].isShow = false;
	}
 }