(function ($, Replayer, undefined) {

  // Draw lines
  Replayer.drawLines = function (paper, points) {
    // Non-animated
    var pathString = 'M';

    for (var i = 0; i < points.length; i++) {
      var point = points[i];

      if (i === (points.length - 1)) {
        pathString += ' ' + point.x + ',' + point.y;
      } else {
        pathString += ' ' + point.x + ',' + point.y + ' L';
      }
    }

    console.log(pathString);

    //var line = paper.path('M 1123,95 L 941,76 L 473,231 L 266,326 L 137,402 L 102,433');
    var line = paper.path(pathString);

    line.attr({
      'stroke': '#000',
      'stroke-width': 3
    });

    // TODO - This isn't necessary because it's not the path itself we want to animate, but the mouse cursor. For that we can use the full path and then animate an element (like a cursor) along it like this: http://jsfiddle.net/gyeSf/17/
    // Animated
    // var line = [];
    // line[0] = paper.path('M 1123,95');
    // line[1] = paper.path('M 941,76');
    // line[2] = paper.path('M 473,231');
    // line[3] = paper.path('M 266,326');
    // line[4] = paper.path('M 137,402');

    // line[0].attr({'stroke': '#000','stroke-width': 3});
    // line[1].attr({'stroke': '#000','stroke-width': 3});
    // line[2].attr({'stroke': '#000','stroke-width': 3});
    // line[3].attr({'stroke': '#000','stroke-width': 3});
    // line[4].attr({'stroke': '#000','stroke-width': 3});

    // line[0].animate({ path:'M 1123,95 L 941,76'}, 150, function () {
    //   line[1].animate({ path:'M 941,76 L 473,231'}, 150, function () {
    //     line[2].animate({ path:'M 473,231 L 266,326'}, 150, function () {
    //       line[3].animate({ path:'M 266,326 L 137,402'}, 150, function () {
    //         line[4].animate({ path:'M 137,402 L 102,433'}, 150, function () {

    //         });
    //       });
    //     });
    //   });
    // });
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