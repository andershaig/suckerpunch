(function ($, Tracker, undefined) {
  // Config
  Tracker.config = {
    interval: 100
  };

  // Set or reset event arrays
  Tracker.prep = function () {
    Tracker.allEvents = [];
    Tracker.events = [];
  }

  // Environment Data
  Tracker.env = {
    browser: Env.browser(),
    plugins: Env.plugins(),
    device:  Env.device()
  };

  // Temp Data Holder
  var temp = {
    tX: null,
    tY: null,
    tT: null
  };

  // Store Temp Data
  Tracker.sTd = function (e) {
    Tracker.allEvents.push({
      x: e.pageX,
      y: e.pageY,
      t: e.timeStamp
    });

    temp.tX = e.pageX;
    temp.tY = e.pageY;
    temp.tT = e.timeStamp;
  }

  // Finalize
  Tracker.fin = function () {
    var o = {};
    o.start_time = Tracker.sT;
    o.end_time = Tracker.eT;
    o.duration = (Tracker.eT - Tracker.sT);
    o.point_count = Tracker.events.length;
    o.points = Tracker.events;
    o.all_points_count = Tracker.allEvents.length;
    o.all_point = Tracker.allEvents;
    o.environment = Tracker.env;

    var output = JSON.stringify(o, null, 4)
    
    $('#res').html(output).show();
  }

  // Track Points at interval
  Tracker.tP = function () {
    if (temp.tX !== null && temp.tY !== null && temp.tT !== null) {
      Tracker.events.push({
        x: temp.tX,
        y: temp.tY,
        t: temp.tT
      });
    }
  }

  // Start Tracker
  Tracker.start = function (e) {
    console.log('Tracker started');

    Tracker.prep();

    // Execution Times
    Tracker.sT = e.timeStamp;

    temp.tX = e.pageX;
    temp.tY = e.pageY;
    temp.tT = e.timeStamp;
    
    // Start tracking mouse
    $(document).on('mousemove', Tracker.sTd);

    Tracker.int = window.setInterval(Tracker.tP, Tracker.config.interval);
  }

  // Stop Tracker
  Tracker.stop = function (e) {
    console.log('Tracker stopped');

    Tracker.eT = e.timeStamp;
    
    $(document).off('mousemove');
    
    Tracker.fin();

    clearInterval(Tracker.int);
  }
}(jQuery, window.Tracker = window.Tracker || {}));

// Temp location for this
$(document).ready( function () {
  // When to start and stop
  $('#el').on({
    mousedown: function (e) {
      Tracker.start(e);
    },
    mouseup: function(e) {
      Tracker.stop(e);
    }
  });
});
