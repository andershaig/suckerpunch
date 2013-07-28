(function ($, Tracker, undefined) {
  // Config
  var config = {
    interval: 100
  };

  // Start Time
  Tracker.sT = null;

  // Count
  Tracker.count = 0;

  // Coords
  Tracker.allEvents = [];
  Tracker.events = [];

  // End Time
  Tracker.eT = null;

  // Environment Data
  Tracker.env = {};

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

    // var output = '<div><h3>Test Data</h3></div>';
    // output += '<div><b>Start</b> ' + md.sT + '</div>';
    // output += '<div><b>Stop</b> ' + md.eT + '</div>';
    // output += '<div><b>Duration</b> ' + (md.eT - md.sT) + '</div>';
    
    // if (md.count == 0) {
    //     output += '<div><b>Event Count</b> ' + md.events.length + '</div>';
    // } else {
    //     output += '<div><b>Event Count</b> ' + md.count + '</div>';
    // }
    
    // if (md.events.length) {
    //     output += '<div><b>Event Data</b></div>';
        
    //     $.each(md.events, function (i, v) {
    //         output += '<div><span>{x: ' + v.x + ',</span><span>y: ' + v.y + ',</span><span>t: ' + v.t + '}</span></div>';
    //     });
    // }
    
    $('#res').html(output).show();
  }

  // Track Count
  Tracker.tC = function () {
    Tracker.count++;
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

  $(document).ready( function () {
    $('#el').on({
      mousedown: function (e) {
        Tracker.sT = e.timeStamp;

        temp.tX = e.pageX;
        temp.tY = e.pageY;
        temp.tT = e.timeStamp;
        
        $(this).on('mousemove', Tracker.sTd);

        Tracker.int = window.setInterval(Tracker.tP, config.interval);
      },
      mouseup: function(e) {
        Tracker.eT = e.timeStamp;
        
        $(this).off('mousemove').off('mousedown').off('mouseup');
        
        Tracker.fin();

        clearInterval(Tracker.int);
      }
    });
  });
}(jQuery, window.Tracker = window.Tracker || {}));

// Track Environment Data
window.session = {
  options: {
    gapi_location: false
  },
  start: function (session) {
    Tracker.env.browser = window.session.browser;
    Tracker.env.plugins = window.session.plugins;
    Tracker.env.device  = window.session.device;
  }
}