var b = require('bonescript');
var max_size = 15;				//size of grid
var grid = new Array(max_size);

//Input Pins
b.pinMode('P8_11', b.INPUT);
b.pinMode('P8_13', b.INPUT);
b.pinMode('P8_15', b.INPUT);
b.pinMode('P8_19', b.INPUT);

//Output Pins
b.pinMode('P9_11', b.OUTPUT);
b.pinMode('P9_13', b.OUTPUT);
b.pinMode('P9_15', b.OUTPUT);
b.pinMode('P9_17', b.OUTPUT);

clear_screen(grid);
setInterval(check,100);

function check(){
b.digitalRead('P8_11', checkButton1);
b.digitalRead('P8_13', checkButton2);
b.digitalRead('P8_15', checkButton3);
b.digitalRead('P8_19', checkButton4);
}

var xpos = 0;
var ypos = 0;

//Initialise grid using blank spaces
for (var i = 0; i < grid.length; i++) {
	grid[i] = new Array(max_size);
	for (var j = 0; j < grid[i].length; j++) {
		grid[i][j] = ' ';
	}
}



function clear_screen(grid){
	for (var i = 0; i < max_size ; i++) {
		for (var j = 0; j < max_size; j++) {
			grid[i][j] = ' ';
		}
	}
}

function print_screen(grid){
	for (var i = 0; i < max_size ; i++) {
		for (var j = 0; j < max_size; j++) {
			util.print(util.format("%s ", grid[i][j]));
		}
		util.print("\n");
	}
}


//Function that checks if the buttons have been pressed
//and sketches accordingly
function checkButton1(x) {
  if(x.value == 1){
	  xpos++;
	  if(xpos==max_size-1)
	  	xpos =0;
	grid[ypos][xpos] = 'x'
	  print_screen(grid);
  }
}

function checkButton2(x) {
   if(x.value == 1){
	  xpos--; 
	  if(xpos==0)
	  	xpos = max_size-1;
	grid[ypos][xpos] = 'x'
	  print_screen(grid);
   }
}

function checkButton3(x) {
  if(x.value == 1){
   	ypos++;
  if(ypos==max_size-1)
	ypos =0;
	grid[ypos][xpos] = 'x'
  print_screen(grid);
 }
}

function checkButton4(x) {
  if(x.value == 1){
    	ypos--;
	if(ypos==0)
	  ypos = max_size-1; 
	 grid[ypos][xpos] = 'x' 
	print_screen(grid);
   }
   
function checkButton5(x) {
  if(x.value == 1){
	clear_screen(grid);
	print_screen(grid);
  }
}