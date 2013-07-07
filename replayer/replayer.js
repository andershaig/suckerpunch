(function ($, Replayer, undefined) {

  // Draw lines
  Replayer.drawLines = function (paper, points) {
    var line = paper.path('M 1123,95 L 941,76 L 473,231 L 266,326 L 137,402 L 102,433');

    line.attr({
      'stroke': '#000',
      'stroke-width': 3
    });

    // TEMP: Do it by hand for testing
    // for (var i = 0; i < points.length; i++) {
    //     var point = points[i];

    // }
  }

  // Draw points
  Replayer.drawPoints = function (paper, points) {
    for (var i = 0; i < points.length; i++) {
      var point  = points[i];
      var circle = paper.circle(point.x, point.y, 5);

          circle.data('i', i);

          circle.attr({
            'fill': 'transparent',
            'stroke': '#FFF',
            'stroke-width': 5
          });

          circle.click(function () {
            alert(this.data('i'));
          });
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

    Replayer.drawLines(paper, points);
    Replayer.drawPoints(paper, points);
  }

  $(document).ready( function () {
    Replayer.init();
  });

}(jQuery, window.Replayer = window.Replayer || {}));