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
var browser = {
  detect: function () {
    return {
      browser: this.search(this.data.browser),
      version: this.search(navigator.userAgent) || this.search(navigator.appVersion),
      os: this.search(this.data.os)
  } },
  search: function (data) {
    if (typeof data === "object") {
      // search for string match
      for(var i = 0; i < data.length; i++) {
        var dataString = data[i].string,
            dataProp   = data[i].prop;
        this.version_string = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1) {
            return data[i].identity;
          }
        } else if (dataProp){
          return data[i].identity;
        }
      }
    } else {
      // search for version number
      var index = data.indexOf(this.version_string);
      if (index == -1) return;
      return parseFloat(data.substr(index + this.version_string.length + 1));
    }
  },
  data: {
    browser: [
      { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
      { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
      { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
      { prop:   window.opera, identity: "Opera", versionSearch: "Version" },
      { string: navigator.vendor, subString: "iCab",identity: "iCab" },
      { string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
      { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
      { string: navigator.vendor, subString: "Camino", identity: "Camino" },
      { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
      { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
      { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
      { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
    ],
    os: [
      { string: navigator.platform, subString: "Win", identity: "Windows" },
      { string: navigator.platform, subString: "Mac", identity: "Mac" },
      { string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
      { string: navigator.userAgent, subString: "iPad", identity: "iPad" },
      { string: navigator.userAgent, subString: "Android", identity: "Android" },
      { string: navigator.platform, subString: "Linux", identity: "Linux" }
    ]}
};

var device = {
  detect: function() {
    var device = {
      screen: {
        width:  window.screen.width,
        height: window.screen.height
      }
    };
    device.viewport = {
      width: window.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
      height: window.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight 
    };
    device.is_tablet = !!navigator.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
    device.is_phone = !device.is_tablet && !!navigator.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
    device.is_mobile = device.is_tablet || device.is_phone;
    return device;
  }
};

var plugins = {
  detect: function () {
    var check_plugin = function(name) {
      if (navigator.plugins){
        var plugin, i = 0, length = navigator.plugins.length;
        for (; i < length; i++ ){
          plugin = navigator.plugins[i];
          if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1) {
            return true;
          } }
        return false;
      } return false;
    };
    return {
      flash:       check_plugin("flash"),
      silverlight: check_plugin("silverlight"),
      java:        check_plugin("java"),
      quicktime:   check_plugin("quicktime")
    };
  }
}

Tracker.env.browser = browser.detect();

Tracker.env.plugins = plugins.detect();

Tracker.env.device  = device.detect();

// window.session = {
//   options: {
//     gapi_location: false
//   },
//   start: function (session) {
//     Tracker.env.browser = window.session.browser;
//     Tracker.env.plugins = window.session.plugins;
//     Tracker.env.device  = window.session.device;
//   }
// }