var main = function(){
  var moveSegment = function(segment) {
  switch(segment.direction) {
    case "down":
      return { top: segment.top + 1, left: segment.left };
    case "up":
      return { top: segment.top - 1, left: segment.left };
    case "right":
      return { top: segment.top, left: segment.left + 1 }
    case "left":
      return { top: segment.top, left: segment.left - 1 }
    default:
      return segment;
  }
}

  var draw = function(sneeple, apple) {
    var drawableSneeple = {color: "blue", pixels: sneeple};
    var drawableApple = {color: "purple", pixels: [apple]};
    var drawables = [drawableSneeple, drawableApple];
    CHUNK.draw(drawables);
  }

  var ate = function(sneeple, otherThingy) {
    var head = sneeple[0];
    return CHUNK.detectCollisionBetween([head], otherThingy);
  }

  var moveSneeple = function(sneeple) {
      return sneeple.map(function(oldSegment, segmentIndex) {
      var newSegment = moveSegment(oldSegment);
      debugger;
      newSegment.direction = segmentFurtherForwardThan(segmentIndex, sneeple).direction;
      return newSegment;
    });
  }

  var advanceGame = function() {
    var newSneeple = moveSneeple(sneeple);
    if (ate(newSneeple, sneeple)) {
      CHUNK.endGame();
      CHUNK.flashMessage("BUT REALLY, ARE YOU EAT'N THO?");
    }
    if (ate(newSneeple, [apple])) {
      newSneeple = growSneeple(sneeple);
      apple = CHUNK.randomLocation();
    }
    if (ate(newSneeple, CHUNK.gameBoundaries())){
      CHUNK.endGame();
      CHUNK.flashMessage("YAINT DO THAT RIGHT??");
    }

    sneeple = newSneeple;
    draw(sneeple, apple);
  }

  var changeDirection = function(direction) {
    sneeple[0].direction = direction;
  }

  var segmentFurtherForwardThan = function(index, sneeple) {
    return sneeple[index-1] || sneeple[index];
  }

  var growSneeple = function(sneeple) {
    var indexOfLastSegment = sneeple.length-1;
    var lastSegment = sneeple[indexOfLastSegment];
    sneeple.push({top: lastSegment.top, left: lastSegment.left});
    return sneeple;
  }

  // a sneeple (hashmap)
  var sneeple = [{top: 1, left: 0, direction: "down"},
    {top: 0, left: 0, direction: "down"}];
  var apple = {top: 8, left: 10 };
  // add sneeple to list of things to draw
  CHUNK.executeNTimesPerSecond(advanceGame, 4);
  CHUNK.onArrowKey(changeDirection);
}

main();
