(function ($, Replayer, undefined) {

  // Draw lines
  Replayer.drawLines = function (paper, points) {
    // Non-animated
    var pathSet  = paper.set();
    var pathGlow = paper.set();
    var pathText = paper.set();

    for (var i = 0; i < (points.length -1); i++) {
      var x1 = points[i].x;
      var y1 = points[i].y;
      var x2 = points[i+1].x;
      var y2 = points[i+1].y;

      var path = paper.path('M ' + x1 + ',' + y1 + ' L '+ x2 + ',' + y2);

      // Distances
      // Change in X
      var xd = Math.abs(x2 - x1);

      // Change in Y
      var yd = Math.abs(y2 - y1);

      // Actual Distance (total path length)
      var ad = path.getTotalLength().toFixed(2);

      path.data({
        'i': i,
        'x': xd,
        'y': yd,
        'l': ad
      });

      pathSet.push(path);

      // Add the distance
      var bbox = path.getBBox();
      var bx = Math.floor(bbox.x + bbox.width / 2.0);
      var by = Math.floor(bbox.y + bbox.height / 2.0);
      paper.circle(bx, by, 3).attr('fill', 'red');
    }

    //var line = paper.path('M 1123,95 L 941,76 L 473,231 L 266,326 L 137,402 L 102,433');

    pathSet.attr({
      'stroke': '#FFF',
      'stroke-width': 2.5
    });

    pathGlow = pathSet.glow({
      opacity: 0.25,
      offsety: 1,
      width: 1
    });

    pathSet.click( function () {
      console.log(this.data('i'));
      console.log(this.data('x'));
      console.log(this.data('y'));
      console.log(this.data('l'));
    });

    // TODO - Add a label to the center of each path on hover only, this may help some: http://stackoverflow.com/questions/1691928/put-label-in-the-center-of-an-svg-path - may also need to do other math / style
    // Also: http://stackoverflow.com/questions/16287954/how-to-center-printd-raphael-text-in-a-space

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
    var pointSet  = paper.set();
    var pointGlow = paper.set();

    for (var i = 0; i < points.length; i++) {
      var point = paper.circle(points[i].x, points[i].y, 5).data({'i': i, 't': points[i].t});

      pointSet.push(point);
    }

    pointSet.attr({
      'fill': 'transparent',
      'stroke': '#FFF',
      'stroke-width': 5
    });

    pointGlow = pointSet.glow({
      opacity: 0.35,
      offsety: 1,
      width: 2
    });

    pointSet.click( function () {
      alert(this.data('i'));
    });

    // TODO - If you're coming to keep hover, do something useful with it. May have to modify glow as well
    pointSet.hover( function () {
      this.attr('stroke-width', 6);

      this.g = this.glow({
        opacity: 0.35,
        offsety: 1,
        width: 8
      });
    }, function () {
      this.attr('stroke-width', 5);

      this.g.remove();
    });
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