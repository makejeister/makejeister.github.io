var main = function(){
  var moveSegment = function(segment) {
    switch(segment.direction){
      case "down":
        return { top: segment.top + 1, left: segment.left }
        break;
      case "up":
        return { top: segment.top - 1, left: segment.left }
        break;
      case "right":
        return { top: segment.top, left: segment.left + 1 }
        break;
      case "left":
        return { top: segment.top, left: segment.left - 1 }
        break;
      deafult:
        return segment;
    }
  } 

  var drawSneeple = function(sneeple) {
    var drawableSneeple = {color: "blue", pixels: sneeple};
    var drawables = [drawableSneeple];
    CHUNK.draw(drawables);
  }

  var moveSneeple = function(sneeple) {
    var oldSegment = sneeple[0];
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = oldSegment.direction;
    var newSneeple = [newSegment];
    return newSneeple;
  }

  var advanceGame = function() {
    sneeple = moveSneeple(sneeple);
    drawSneeple(sneeple);
  }

  var changeDirection = function(direction) {
    sneeple[0].direction = direction;
  }

  // a sneeple (hashmap)
  //var sneeple = [{top: 0, left: 0}, {top: 1, left: 0}];
  var sneeple = [{top: 0, left: 0, direction: "down"}];
  // add sneeple to list of things to draw
  CHUNK.executeNTimesPerSecond(advanceGame, 1);
  CHUNK.onArrowKey(changeDirection);
}

main();
