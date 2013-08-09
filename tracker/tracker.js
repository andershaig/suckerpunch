(function ($, Tracker, undefined) {
  // Config
  Tracker.interval = 100;
  Tracker.disabled = false;

  // Set or reset event arrays
  Tracker.prep = function () {
    Tracker.events = [];
    Tracker.points = [];

    // Environment Data
    Tracker.env = {
      browser: Env.browser(),
      plugins: Env.plugins(),
      device:  Env.device()
    };
  }

  // Temp Data Holder
  var temp = {};

  // Store Temp Data
  Tracker.sTd = function (e) {
    Tracker.events.push({
      x: e.pageX,
      y: e.pageY,
      t: e.timeStamp
    });

    temp = e;
  }

  // Track Points at interval
  Tracker.tP = function () {
    if (temp.tX !== null && temp.tY !== null && temp.tT !== null) {
      Tracker.points.push({
        x: temp.pageX,
        y: temp.pageY,
        t: temp.timeStamp
      });
    }
  }

  // Start Tracker
  Tracker.start = function (e) {
    if (!Tracker.disabled) {
      console.log('Tracker started');

      Tracker.prep();

      // Execution Times
      Tracker.sT = e.timeStamp;

      temp = e;
      
      // Start tracking mouse
      $(document).on('mousemove', Tracker.sTd);

      Tracker.int = window.setInterval(Tracker.tP, Tracker.interval);
    }
  }

  // Stop Tracker
  Tracker.stop = function (e) {
    if (!Tracker.disabled) {
      console.log('Tracker stopped');

      Tracker.eT = e.timeStamp;
      
      $(document).off('mousemove');

      Tracker.disabled = true;
      
      Tracker.fin();

      clearInterval(Tracker.int);
    }
  }

  // Finalize
  Tracker.fin = function () {
    var o = {};
    o.start_time  = Tracker.sT;
    o.end_time    = Tracker.eT;
    o.duration    = (Tracker.eT - Tracker.sT);
    o.point_count = Tracker.points.length;
    o.points      = Tracker.points;
    o.event_count = Tracker.events.length;
    o.events      = Tracker.events;
    o.environment = Tracker.env;

    var output = JSON.stringify(o, null, 4)
    
    $('#res').html(output).show();
  }

}(jQuery, window.Tracker = window.Tracker || {}));

// Temp location for kicking it off
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
