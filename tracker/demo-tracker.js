(function ($, md, undefined) {
  // Start Time
  md.sT = null;

  // Count
  md.count = 0;

  // Coords
  md.allEvents = [];
  md.events = [];

  // End Time
  md.eT = null;

  // Environment Data
  md.env = {};

  // Temp Data Holder
  md.tX = null;
  md.tY = null;
  md.tT = null;

  // Store Temp Data
  md.sTd = function (e) {
    md.allEvents.push({
      x: e.pageX,
      y: e.pageY,
      t: e.timeStamp
    });

    md.tX = e.pageX;
    md.tY = e.pageY;
    md.tT = e.timeStamp;
  }

  // Finalize
  md.fin = function () {
    var o = {};
    o.start_time = md.sT;
    o.end_time = md.eT;
    o.duration = (md.eT - md.sT);
    o.point_count = md.events.length;
    o.points = md.events;
    o.all_points_count = md.allEvents.length;
    o.all_point = md.allEvents;
    o.environment = md.env;

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
  md.tC = function () {
    md.count++;
  }

  // Track Points at 100ms interval
  md.tP = function () {
    if (md.tX !== null && md.tY !== null && md.tT !== null) {
      md.events.push({
        x: md.tX,
        y: md.tY,
        t: md.tT
      });
    }
  }

  $(document).ready( function () {
    $('#el').on({
      mousedown: function (e) {
        md.sT = e.timeStamp;

        md.tX = e.pageX;
        md.tY = e.pageY;
        md.tT = e.timeStamp;
        
        $(this).on('mousemove', md.sTd);

        md.int = window.setInterval(md.tP, 100);
      },
      mouseup: function(e) {
        md.eT = e.timeStamp;
        
        $(this).off('mousemove').off('mousedown').off('mouseup');
        
        md.fin();

        clearInterval(md.int);
      }
    });
  });
}(jQuery, window.md = window.md || {}));

// Track Environment Data
window.session = {
  options: {
    gapi_location: false
  },
  start: function (session) {
    md.env.browser = window.session.browser;
    md.env.plugins = window.session.plugins;
    md.env.device  = window.session.device;
  }
}