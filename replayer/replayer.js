(function ($, Replayer, undefined) {
  var paper;
  var sets = {};
  var overlay;
  var points;

  // Draw lines
  Replayer.drawLines = function (paper, points) {
    // Non-animated
    sets.path = paper.set();
    sets.pathGlow  = paper.set();

    for (var i = 0; i < (points.length -1); i++) {
      var x1 = points[i].x;
      var y1 = points[i].y;
      var t1 = points[i].t;
      var x2 = points[i+1].x;
      var y2 = points[i+1].y;
      var t2 = points[i+1].t;

      var path = paper.path('M ' + x1 + ',' + y1 + ' L '+ x2 + ',' + y2);

      // Time
      // Overall Start Time
      // TODO: This isn't tracked yet

      // Time Difference
      var td = Math.abs(t2 - t1);

      path.data({
        'i': i,
        't': td
      });

      sets.path.push(path);

      //Replayer.labelLines(paper, path, x1, y1, t1, x2, y2, t2);
    }

    sets.path.attr({
      'stroke': '#FFF',
      'stroke-width': 1.5
    });

    sets.pathGlow = sets.path.glow({
      opacity: 0.25,
      offsety: 1,
      width: 2
    });

    sets.path.click( function () {
      console.log(this.data('i'));
      console.log(this.data('x'));
      console.log(this.data('y'));
      console.log(this.data('l'));
      console.log(this.data('t'));
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

  // Add Labels
  Replayer.labelLines = function (paper, path, x1, y1, t1, x2, y2, t2) {
    sets.pathText = paper.set();
    sets.pathBox  = paper.set();
    sets.xy       = paper.set();
    sets.xyGlow   = paper.set();

    // Distance
    // Change in X
    var xd = Math.abs(x2 - x1);

    // Change in Y
    var yd = Math.abs(y2 - y1);

    // Actual Distance (total path length)
    var ad = path.getTotalLength().toFixed(2);

    var sqLines = paper.path('M ' + x1 + ',' + y1 + ' L '+ x2 + ',' + y1 + ' L ' + x2 + ',' + y2);
    sets.xy.push(sqLines);

    // Add the distance label
    // Bounding Box for the path
    var pbbox  = path.getBBox();
    // Center - X Axis
    var cx    = Math.floor(pbbox.x + pbbox.width / 2.0);
    // Center - Y Axis
    var cy    = Math.floor(pbbox.y + pbbox.height / 2.0);
    var label = paper.text(cx, cy, ad);

    sets.pathText.push(label);

    // Add a box for the label
    // Bounding Box for the label
    var lbbox = label.getBBox();
    var labelBox = paper.rect((lbbox.x - 5), (lbbox.y - 4), (lbbox.width + 10), (lbbox.height + 8));

    sets.pathBox.push(labelBox);

    sets.pathBox.attr('fill','#000');

    sets.pathText.attr('fill','#FFF').toFront();

    sets.xy.attr({
      'stroke': '#FFF',
      'stroke-width': 2,
      'stroke-linecap': 'square'
    });

    sets.xyGlow = sets.xy.glow({
      opacity: 0.25,
      offsety: 1,
      width: 1
    });
  }

  // Draw points
  Replayer.drawPoints = function (paper, points) {
    var radius     = 2;
    sets.point     = paper.set();
    sets.pointGlow = paper.set();

    for (var i = 0; i < points.length; i++) {
      var point = paper.circle(points[i].x, points[i].y, radius).data({'i': i, 't': points[i].t});

      sets.point.push(point);
    }

    sets.point.attr({
      'fill': 'rgba(0,0,0,0.5)',
      'stroke': '#FFF',
      'stroke-width': 3
    });

    sets.pointGlow = sets.point.glow({
      opacity: 0.35,
      offsety: 1,
      width: 2
    });

    sets.point.click( function () {
      alert(this.data('i'));
    });

    // TODO - If you're goming to keep hover, do something useful with it.
    // sets.point.hover( function () {
    //   this.attr('stroke-width', 6);

    //   this.g = this.glow({
    //     opacity: 0.35,
    //     offsety: 1,
    //     width: 8
    //   });
    // }, function () {
    //   this.attr('stroke-width', 5);

    //   this.g.remove();
    // });
  }

  Replayer.init = function () {
    // Create blank canvas
    var width  = window.innerWidth;
    var height = window.innerHeight;
    paper = Raphael(0, 0, width, height);

    // Overlay
    overlay = paper.rect(0, 0, width, height);
    overlay.attr('fill','rgba(0,0,0,0.25)'); // TEMP

    // NOTE: For now, this uses sample data loaded from sample-data.js
    //points = sampleA; // 6 data points
    points = sampleB; // 88 data points
    //points = sampleC; // 9 data points

    Replayer.drawLines(paper, points);
    Replayer.drawPoints(paper, points);

    // Bindings
    $('#overlay').on('click', function (){
      overlay.show();
    });

    $('#show_points').on('click', function (){
      sets.point.show();
      sets.pointGlow.show();
    });

    $('#show_path').on('click', function (){
      sets.path.show();
      sets.pathGlow.show();
    });

    $('#show_dist').on('click', function (){
      sets.pathText.show();
      sets.pathBox.show();
    });

    $('#show_xy').on('click', function (){
      sets.xy.hide();
      sets.xyGlow.hide();
    });

    $('#show_xy_labels').on('click', function (){
      // Don't have this yet
    });

    $('#hide_all').on('click', function (){ 
      // Hide Everything
      overlay.hide();
      sets.point.hide();
      sets.pointGlow.hide();
      sets.path.hide();
      sets.pathGlow.hide();
      sets.pathText.hide();
      sets.pathBox.hide();
      sets.xy.hide();
      sets.xyGlow.hide();
    });
  }

  // Kick it off
  $(document).ready( function () {
    Replayer.init();
  });

}(jQuery, window.Replayer = window.Replayer || {}));