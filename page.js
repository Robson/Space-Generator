var isTouchDevice = ('ontouchstart' in document.documentElement);
var difficulty = 0;

function getGridSize() {
	var w = $(window).width();
	var h = $(window).height();
	var scaleStart = 50;
	return [
		Math.max(2, Math.floor(getRandomInteger(h / (scaleStart - 0), h / (scaleStart + 0)))),
		Math.max(1, Math.floor(getRandomInteger(w / (scaleStart - 0), w / (scaleStart + 0))))
	];

}

function generateSpace() {
	var size = getGridSize();
	var special = '☀️🌎🌍🌏🚀🛰🌠☄️🌕🌖🌗🌘🌑🌒🌓🌔🌕🌙🛰️🛸🪐';
	var small = '✳✴🌕🌖🌗🌘🌑🌒🌓🌔🌕🌙●◆★⚹✸✹✶✷✱';
	var hide = '🌌';
	var grid = makeSpace(size);
	console.log(grid);

	$('table *').remove();

	var html = "";

	for (var y = 0; y < size[0]; y++) {
		html += "<tr>";
		for (var x = 0; x < size[1]; x++) {
			var style = "";
			style += "text-align: " + getRandomElement([ "left", "center", "right" ]) + ";";
			style += "vertical-align: " + getRandomElement([ "top", "middle", "bottom" ]) + ";";
			if (!special.includes(grid[y][x]))
				style += "opacity: " + (getRandomInteger(0, 100) / 100).toFixed(2) + ";"
				
			if (small.includes(grid[y][x]))
				style += "font-size: " + getRandomInteger(30, 70) + "%;";
			else if (!special.includes(grid[y][x]) && Math.random() > 0.5)
				style += "font-size: " + getRandomInteger(50, 100) + "%;";
			
			// these characters ensure the columns are of equal size
			if (hide.includes(grid[y][x]))
				style += "opacity: 0;"
				
			html += "<td class='character' style='" + style + "'>" + grid[y][x] + "</td>";
		}
		html += "</tr>";
	}

	$('table').html(html);
	
	/*
	if (getRandomInteger(0, 100) > 33) {
		$('#background').css('background', "#000 url('background" + getRandomInteger(1, 2) + ".png') repeat center center");
		$('#background').css('opacity', getRandomInteger(33, 100) / 100);
	} else {
		$('#background').css('background', 'black');
	}
	*/
}

function makeSpace(size) {
	var density = getRandomInteger(60, 95) / 100;
	var space = [];
	var characters = '.*✦●◆★✸✹✶✷✱';
	for (var y = 0; y < size[0]; y++) {
		space[y] = [];
		for (var x = 0; x < size[1]; x++) {					
			if (Math.random() > density)
				space[y][x] = characters[getRandomInteger(0, characters.length - 1)];
			else
				space[y][x] = '🌌';
		}
	}
	
	if (getRandomInteger(0, 100) > 15)
		space = addCharacter(space, getRandomElement(['🌎', '🌍', '🌏']), true);
	if (getRandomInteger(0, 100) > 15)
		space = addCharacter(space, '☀️');
	if (getRandomInteger(0, 100) > 15)
		space = addCharacter(space, '🛰️');
	if (getRandomInteger(0, 100) > 15)
		space = addCharacter(space, '🚀');
	if (!isTouchDevice && getRandomInteger(0, 100) > 15)
		space = addCharacter(space, '🪐');
	if (!isTouchDevice && getRandomInteger(0, 100) > 50)
		space = addCharacter(space, '🌠');
	if (getRandomInteger(0, 100) > 50)
		space = addCharacter(space, '☄️');		
	if (!isTouchDevice && getRandomInteger(0, 100) > 75)
		space = addCharacter(space, '🛸');
				
	return space;
}

function addCharacter(array, character, addMoon) {
	var y, x;
	do {
		y = getRandomInteger(2, array.length - 2);
		x = getRandomInteger(2, array[0].length - 2);
	} while (!array[y][x].includes('🌌'));		
	array[y][x] = character;
	if (addMoon) {
		var offsetX, offsetY;
		do {
			offsetX = getRandomInteger(-1, 1);
			offsetY = getRandomInteger(-1, 1);
		} while (offsetX == 0 && offsetY == 0);
		array[y + offsetY][x + offsetX] = getRandomElement([ '🌙', '🌗', '🌘', '🌑', '🌒', '🌓' ]);
		//array[y + offsetY][x + offsetX] = '🌙';
	}
	return array;
}

function getRandomElement(array) {
	return array[getRandomInteger(0, array.length - 1)];
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideMessage() {
	$('#help').remove();
}		

generateSpace();
