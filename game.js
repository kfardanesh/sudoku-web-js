// Kamran Fardanesh
// Sudoku Puzzle Game / Solver

var selected = new Array(9);
var numSelected = "";
var board;
clearSol();
var coloredArray = new Array(9);

function init(){
	var kk = "";
	for(var j = 0; j < 9; j++){
		for(var i = 0; i < 9; i++){
			kk += "<div class='board' id=" + (j+1)+(i+1) + " onclick='update(this.id)' onmouseover='mouseIn(this.id)' onmouseout='mouseOut(this.id)'></div>";
		}
	}
	
	document.getElementById('board').innerHTML = kk;
	
	var ll = "";
	for(var j = 0; j < 9; j++){
		ll += "<div class='numbers' id=" + j + " onclick='select(this.id)'>"+ (j+1) +"</div>";
	}
	document.getElementById('numbers').innerHTML = ll;
	
	for(var i = 0; i < 9; i++){
		selected[i] = false;
		document.getElementById(i).style.backgroundColor = "rgba(255,255,255,0)";
		//document.getElementById(i).style.border = "1px solid black";
	}
}

function update(id){
	if(document.getElementById(id).innerHTML == ''){ 
		document.getElementById(id).innerHTML = numSelected;
		//document.getElementById('test').innerHTML = id.substr(0,1) + " || " + id.slice(-1);
		board[parseInt(id.substr(0,1))-1][parseInt(id.slice(-1))-1] = numSelected;
		var k = 0;
		coloredArray = new Array(9);
		for(var j = 0; j < 81; j++){
			var row = Math.floor(j/9);
			var col = j%9;
			
			if(numSelected == board[row][col]){
				document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(122,226,255,.5)";
				coloredArray[k] = (row+1).toString() + (col+1).toString();
				k++;
			}
		}
	} else if(document.getElementById(id).style.fontWeight == 'bold') {
			
	} else {
		document.getElementById(id).innerHTML = numSelected;
		board[parseInt(id.substr(0,1))-1][parseInt(id.slice(-1))-1] = numSelected;
		var k = 0;
		coloredArray = new Array(9);
		for(var j = 0; j < 81; j++){
			var row = Math.floor(j/9);
			var col = j%9;
			
			if(numSelected == board[row][col]){
				document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(122,226,255,.5)";
				coloredArray[k] = (row+1).toString() + (col+1).toString();
				k++;
			}
		}
	}
	var next = findEmptyCell(0,0);
	if(next == null){
		document.getElementById('test').innerHTML = "You Completed the Puzzle";
	}
	
	var tmpColoredArray = coloredArray;
	
	var m = tmpColoredArray.length;
    while (m--) {
        if (tmpColoredArray[m] === '') {
            tmpColoredArray.splice(m, 1);
        }
    }
	
	if(tmpColoredArray.length == 9){
		document.getElementById(numSelected-1).style.backgroundColor = "rgba(255,255,0,0.25)";
	}
}

function select(id){
	if(selected[id]){
		selected[id] = false;
		document.getElementById(id).style.backgroundColor = "rgba(255,255,255,0)";
		var tmpColoredArray = coloredArray;

		var m = tmpColoredArray.length;
		while (m--) {
		if (tmpColoredArray[m] === '') {
			tmpColoredArray.splice(m, 1);
		}
		}

		if(tmpColoredArray.length == 9){
		document.getElementById(id).style.backgroundColor = "rgba(255,255,0,0.25)";
		}
		numSelected = '';
		coloredArray = new Array(9);
		for(var j = 0; j < 81; j++){
			var row = Math.floor(j/9);
			var col = j%9;
			document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(255,255,255,0)";
		}
	} else {
		for(var i = 0; i < 9; i++){
			selected[i] = false;
			document.getElementById(i).style.backgroundColor = "rgba(255,255,255,0)";
			for(var j = 0; j < 81; j++){
				var row = Math.floor(j/9);
				var col = j%9;
				document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(255,255,255,0)";
			}
		}
		var tmpColoredArray = coloredArray;

		var m = tmpColoredArray.length;
		while (m--) {
			if (tmpColoredArray[m] === '') {
				tmpColoredArray.splice(m, 1);
			}
		}

		if(tmpColoredArray.length == 9){
			document.getElementById(id).style.backgroundColor = "rgba(255,255,0,0.25)";
		}		
		selected[id] = true;
		numSelected = (parseInt(id) + 1);
		if(selected[id]){
			document.getElementById(id).style.backgroundColor = "rgba(122,226,255,.5)";
			var k = 0;
			coloredArray = new Array(9);
			for(var j = 0; j < 81; j++){
				var row = Math.floor(j/9);
				var col = j%9;
				
				if(numSelected == board[row][col]){
					document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(122,226,255,.5)";
					coloredArray[k] = (row+1).toString() + (col+1).toString();
					k++;
				}
			}
		}
	}
}


function mouseIn(id){
	if(coloredArray.indexOf(id) != -1){
		document.getElementById(id).style.backgroundColor = "rgba(155,155,155,0.5)";
	} else {
		document.getElementById(id).style.backgroundColor = "rgba(155,155,155,0.5)";
	}
}

function mouseOut(id){
	if(coloredArray.indexOf(id) != -1){
		document.getElementById(id).style.backgroundColor = "rgba(122,226,255,0.5)";
	} else {
		document.getElementById(id).style.backgroundColor = "rgba(255,255,255,0)";
	}
}

function solve(){
	if(checkBoard()){
		//console.log('here');
		var isSolved = insertCell(0,0);
		if(isSolved){
			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					document.getElementById((j+1).toString() + (i+1).toString()).innerHTML = board[j][i];
				}
			}	
			document.getElementById('test').innerHTML = "Solved";
		} else {
			document.getElementById('test').innerHTML = "Cannot Be Solved";
		}
	} else { 
		//console.log('Here');
		document.getElementById('test').innerHTML = "Cannot Be Solved";
	}
}

function newGame(){
	clearBoard();
	setBoard();
	document.getElementById('test').innerHTML = '';
}

// Function to make playable game depending on difficulty
function setBoard(){
	generate();
	
	var num;

	if(document.getElementById('diff_easy').checked){
		num = 10;
	} else if(document.getElementById('diff_med').checked){
		num = 20;
	} else if(document.getElementById('diff_med').checked){
		num = 30;
	} else {
		num = 40;
	}
	
	while(num>0){
		
		var i = Math.floor(Math.random() * 40);
		
		var row = Math.floor(i/9);
		var col = i%9;
		var row2 = Math.floor((80-i)/9);
		var col2 = (80 - i)%9;
		
		//console.log(i + " || " + row + " || " + col + " || " + row2 + " || " + col2);
	
		board[row][col] = '';
		board[row2][col2] = '';
		num--;
	}
	
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			document.getElementById((j+1).toString() + (i+1).toString()).innerHTML = board[j][i];
		}
	}	
	
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			if(document.getElementById((j+1).toString() + (i+1).toString()).innerHTML != ''){
				document.getElementById((j+1).toString() + (i+1).toString()).style.fontWeight = 'bold';
			}
		}
	}	
	
}

function clearSol(){
	board = new Array(9);
	for(var i = 0; i < 9; i++){
		board[i] = new Array('','','','','','','','','');
		//board[i] = new Array(0,0,0,0,0,0,0,0,0);
	}
}

function checkGrid(m,n){
	var tmpGridArray;

	if((m == 0 || m == 1 || m == 2) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[0][0], board[0][1], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]);
	}
	
	if((m == 0 || m == 1 || m == 2) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[0][3], board[0][4], board[0][5], board[1][3], board[1][4], board[1][5], board[2][3], board[2][4], board[2][5]);
	}
	
	if((m == 0 || m == 1 || m == 2) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[0][6], board[0][7], board[0][8], board[1][6], board[1][7], board[1][8], board[2][6], board[2][7], board[2][8]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[3][0], board[3][1], board[3][2], board[4][0], board[4][1], board[4][2], board[5][0], board[5][1], board[5][2]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[3][3], board[3][4], board[3][5], board[4][3], board[4][4], board[4][5], board[5][3], board[5][4], board[5][5]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[3][6], board[3][7], board[3][8], board[4][6], board[4][7], board[4][8], board[5][6], board[5][7], board[5][8]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[6][0], board[6][1], board[6][2], board[7][0], board[7][1], board[7][2], board[8][0], board[8][1], board[8][2]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[6][3], board[6][4], board[6][5], board[7][3], board[7][4], board[7][5], board[8][3], board[8][4], board[8][5]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[6][6], board[6][7], board[6][8], board[7][6], board[7][7], board[7][8], board[8][6], board[8][7], board[8][8]);
	}
	
	var i = tmpGridArray.length;
    while (i--) {
        if (tmpGridArray[i] === '') {
            tmpGridArray.splice(i, 1);
        }
    }
		
	var sortedGrid = tmpGridArray.sort();
	for(var j = 0; j < sortedGrid.length - 1; j++){
		if(sortedGrid[j+1] == sortedGrid[j]){
			return 0;
		}
	}
	
	return 1;
}

function checkCol(n){
	var tmpArray = new Array(board[0][n], board[1][n], board[2][n], board[3][n], board[4][n], board[5][n], board[6][n], board[7][n], board[8][n]);
	
	var i = tmpArray.length;
    while (i--) {
        if (tmpArray[i] === '') {
            tmpArray.splice(i, 1);
        }
    }
		
	var sorted = tmpArray.sort();
	for(var j = 0; j < sorted.length - 1; j++){
		if(sorted[j+1] === sorted[j]){
			return 0;
		}
	}
	
	return 1;
}

function checkRow(m){
	var tmpArray = new Array(board[m][0], board[m][1], board[m][2], board[m][3], board[m][4], board[m][5], board[m][6], board[m][7], board[m][8]);
	
	var i = tmpArray.length;
    while (i--) {
        if (tmpArray[i] === '') {
            tmpArray.splice(i, 1);
        }
    }
	
	var sorted = tmpArray.sort();
	for(var j = 0; j < sorted.length - 1; j++){
		if(sorted[j+1] === sorted[j]){
			return 0;
		}
	}
	
	return 1;
	
}

function checkBoard(){
	var rows = true
	var cols = true;
	var grids = true;
	
	for(var i = 0; i < 9; i++){
		if(!checkRow(i)){
			rows = false;
		}
		if(!checkCol(i)){
			cols = false;
		}
	}

	if(!(checkGrid(0,0) && checkGrid(0,3) && checkGrid(0,6) && checkGrid(3,0) && checkGrid(3,3) && checkGrid(3,6) && checkGrid(6,0) && checkGrid(6,3) && checkGrid(6,6))){
		grids = false;
	}
	
	if(rows && cols && grids){
		document.getElementById('test').innerHTML = "Board is Good"
		return true;
	} else {
		document.getElementById('test').innerHTML = "Board is Bad"
		return false;
	}
}

//Function to generate solved puzzle
function generate(){
	clearSol(); // Clear board
	create1stRow(); //Create first row
	insertCell(0,0);
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			document.getElementById((j+1).toString() + (i+1).toString()).innerHTML = board[j][i];
		}
	}
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
				document.getElementById((j+1).toString() + (i+1).toString()).style.fontWeight = 'normal';
		}
	}	
}

function create1stRow(){
	var tileNum = new Array(1,2,3,4,5,6,7,8,9);
	for(var i = 0; i < 9; i++){
		var rnd = Math.floor(Math.random() * tileNum.length) + 1;
		board[0][i] = tileNum[rnd - 1];
		tileNum.splice(rnd - 1, 1);
	}
}

function insertCell(m,n){
	var next, tmp, row, col, arr;
	
	next = findEmptyCell(m,n);

	row = Math.floor(next / 9);
	col = next%9;
	
	if(next == null){
		return true;
	} else {
		arr = getVals(row,col);
		
		for(var j = 0; j < arr.length; j++){
			tmp = arr[j];

			board[row][col] = tmp;
			
			if(insertCell(row,col)){
				return true;
			} else {
				board[row][col] = '';				
			}
		}
		return false;
	}
}

function findEmptyCell(m,n){
	var row;
	var col;
	for(var i = (n + 9 * m); i < 81; i++){
		row = Math.floor(i/9);
		col = i%9;
		if(board[row][col] === ''){
			return col + 9 * row;
		}
	}
}

function getVals(m,n){
	
	var vals = new Array(1,2,3,4,5,6,7,8,9);
	
	for(var i = 0; i < 9; i++){
		cols = board[i][n];
		if(cols > 0){
			if(vals.indexOf(cols) > -1){
				vals.splice(vals.indexOf(cols),1);
			}
		}
	}
	
	for(var j = 0; j < 9; j++){
		rows = board[m][j];
		if(rows > 0){
			if(vals.indexOf(rows) > -1){
				vals.splice(vals.indexOf(rows),1);
			}
		}
	}
	
	var tmpGridArray;

	if((m == 0 || m == 1 || m == 2) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[0][0], board[0][1], board[0][2], board[1][0], board[1][1], board[1][2], board[2][0], board[2][1], board[2][2]);
	}
	
	if((m == 0 || m == 1 || m == 2) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[0][3], board[0][4], board[0][5], board[1][3], board[1][4], board[1][5], board[2][3], board[2][4], board[2][5]);
	}
	
	if((m == 0 || m == 1 || m == 2) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[0][6], board[0][7], board[0][8], board[1][6], board[1][7], board[1][8], board[2][6], board[2][7], board[2][8]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[3][0], board[3][1], board[3][2], board[4][0], board[4][1], board[4][2], board[5][0], board[5][1], board[5][2]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[3][3], board[3][4], board[3][5], board[4][3], board[4][4], board[4][5], board[5][3], board[5][4], board[5][5]);
	}
	
	if((m == 3 || m == 4 || m == 5) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[3][6], board[3][7], board[3][8], board[4][6], board[4][7], board[4][8], board[5][6], board[5][7], board[5][8]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 0 || n == 1 || n == 2)){
		 tmpGridArray = new Array(board[6][0], board[6][1], board[6][2], board[7][0], board[7][1], board[7][2], board[8][0], board[8][1], board[8][2]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 3 || n == 4 || n == 5)){
		 tmpGridArray = new Array(board[6][3], board[6][4], board[6][5], board[7][3], board[7][4], board[7][5], board[8][3], board[8][4], board[8][5]);
	}
	
	if((m == 6 || m == 7 || m == 8) && (n == 6 || n == 7 || n == 8)){
		 tmpGridArray = new Array(board[6][6], board[6][7], board[6][8], board[7][6], board[7][7], board[7][8], board[8][6], board[8][7], board[8][8]);
	}
	
	var k = tmpGridArray.length;
    while (k--) {
        if (tmpGridArray[k] === '') {
            tmpGridArray.splice(k, 1);
        }
    }
	
	for(var l = 0; l < tmpGridArray.length; l++){
		rows = tmpGridArray[l];
		if(rows > 0){
			if(vals.indexOf(rows) > -1){
				vals.splice(vals.indexOf(rows),1);
			}
		}
	}
	
	shuffle(vals);
	
	return vals;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

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

function clearBoard(){
	for(var j = 1; j < 10; j++){
		for(var i = 1; i < 10; i++){
			var str = j.toString() + i.toString();
			document.getElementById(str).innerHTML = "";
			board[j-1][i-1] = '';
		}
	}
	coloredArray = new Array(9);
	for(var j = 0; j < 81; j++){
		var row = Math.floor(j/9);
		var col = j%9;
		document.getElementById((row+1).toString() + (col+1).toString()).style.backgroundColor = "rgba(255,255,255,0)";
		document.getElementById((row+1).toString() + (col+1).toString()).style.fontWeight = 'normal';
	}
}