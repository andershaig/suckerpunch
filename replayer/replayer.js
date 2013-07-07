(function ($, Replayer, undefined) {
  
  Replayer.drawLines = function (paper, points) {
    // Create lines
  }

  Replayer.drawPoints = function (paper, points) {
    // Create points

    // Draw points from points
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

        ctx.fillCircle(point.x, point.y, 5);
    }
  }

  Replayer.init = function (container, width, height, fillColor) {
    var canvas = Replayer.createCanvas(container, width, height);
    var ctx = canvas.context;
    
    ctx.clearTo = function(fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, width, height);
    };
    
    ctx.clearTo(fillColor || "transparent");

    // bind mouse events
    var pdata = [
        {
            x: 1123,
            y: 95,
            t: 1371961141308
        },
        {
            x: 941,
            y: 76,
            t: 1371961141393
        },
        {
            x: 473,
            y: 231,
            t: 1371961141476
        },
        {
            x: 266,
            y: 326,
            t: 1371961141561
        },
        {
            x: 137,
            y: 402,
            t: 1371961141644
        },
        {
            x: 102,
            y: 433,
            t: 1371961141727
        }
    ];

    //Replayer.drawLines(ctx, pdata);
    //Replayer.drawPoints(ctx, pdata);
  }

  $(document).ready( function () {
    var container = document.getElementById('canvas');
    var width     = window.innerWidth;
    var height    = window.innerHeight;

    Replayer.init(container, width, height, 'transparent');
  });

}(jQuery, window.Replayer = window.Replayer || {}));