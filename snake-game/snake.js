Math.random();

var fruits = ["banana", "silly-putty", "grape"];


//fruits.forEach(function(fruit) {
//  console.log(fruit)
//})

// a sneeple (hashmap)
var sneeplePixels = [{top: 0, left: 0}, {top: 1, left: 0}];

// list of sneeple
var drawableSneeple = {color: "blue", pixels: sneeplePixels};

// list of drawables
var drawableObjects = [drawableSneeple];

var drawableFruit = [];
for (var i = 0; i < 20; i++){
//fruits.forEach(function(fruit) {
  fruitPixel = [{top: Math.floor(Math.random() * 15),
    left: Math.floor(Math.random() * 20)}];

  drawableFruit = {color: "red", pixels: fruitPixel};
  drawableObjects.push(drawableFruit);
}

// CHUNK draws things in pixels
CHUNK.draw(drawableObjects);
