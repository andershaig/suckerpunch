(function ($, Replayer, undefined) {

  // Draw lines
  Replayer.drawLines = function (paper, points) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];

    }
  }

  // Draw points
  Replayer.drawPoints = function (paper, points) {
    for (var i = 0; i < points.length; i++) {
      var point  = points[i];
      var circle = paper.circle(point.x, point.y, 5);
      circle.attr('fill', 'transparent');
      circle.attr('stroke', '#FFF');
      circle.attr('stroke-width', 5);
    }
  }

  Replayer.init = function () {
    var width  = window.innerWidth;
    var height = window.innerHeight;
    var paper = Raphael(0, 0, width, height);

    // bind mouse events
    var points = [
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
    Replayer.drawPoints(paper, points);
  }

  $(document).ready( function () {
    Replayer.init();
  });

}(jQuery, window.Replayer = window.Replayer || {}));