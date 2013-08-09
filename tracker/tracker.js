//~~~~~~~~~~~~~
// ENVIRONMENT
//~~~~~~~~~~~~~

(function (Env, undefined) {

  // Env Detection
  Env.browser = function () {
    return {
      browser: search(Env.data.browser),
      version: search(navigator.userAgent) || search(navigator.appVersion),
      os:      search(Env.data.os)
    }
  }

  // Private Search Function
  var search = function (data) {
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
  }

  // Browser Data
  Env.data = {
    browser: [
      { string: navigator.userAgent, subString: "Chrome",   identity: "Chrome"                              },
      { string: navigator.userAgent, subString: "OmniWeb",  identity: "OmniWeb",  versionSearch: "OmniWeb/" },
      { string: navigator.vendor,    subString: "Apple",    identity: "Safari",   versionSearch: "Version"  },
      { prop:   window.opera,                               identity: "Opera",    versionSearch: "Version"  },
      { string: navigator.vendor,    subString: "iCab",     identity: "iCab"                                },
      { string: navigator.vendor,    subString: "KDE",      identity: "Konqueror"                           },
      { string: navigator.userAgent, subString: "Firefox",  identity: "Firefox"                             },
      { string: navigator.vendor,    subString: "Camino",   identity: "Camino"                              },
      { string: navigator.userAgent, subString: "Netscape", identity: "Netscape"                            },
      { string: navigator.userAgent, subString: "MSIE",     identity: "Explorer", versionSearch: "MSIE"     },
      { string: navigator.userAgent, subString: "Gecko",    identity: "Mozilla",  versionSearch: "rv"       },
      { string: navigator.userAgent, subString: "Mozilla",  identity: "Netscape", versionSearch: "Mozilla"  }
    ],
    os: [
      { string: navigator.platform,  subString: "Win",     identity: "Windows"     },
      { string: navigator.platform,  subString: "Mac",     identity: "Mac"         },
      { string: navigator.userAgent, subString: "iPhone",  identity: "iPhone/iPod" },
      { string: navigator.userAgent, subString: "iPad",    identity: "iPad"        },
      { string: navigator.userAgent, subString: "Android", identity: "Android"     },
      { string: navigator.platform,  subString: "Linux",   identity: "Linux"       }
  ]};

  // Check device (width / height)
  Env.device = function () {
    var device = {
      screen: {
        width:  window.screen.width,
        height: window.screen.height
      }
    };
    device.viewport = {
      width:  window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    };
    device.is_tablet = !!navigator.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
    device.is_phone  = !device.is_tablet && !!navigator.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
    device.is_mobile = device.is_tablet || device.is_phone;

    return device;
  }
  
  // Check Plugins
  Env.plugins = function () {
    var check_plugin = function (name) {
      if (navigator.plugins) {
        var plugin, i = 0, length = navigator.plugins.length;

        for (; i < length; i++ ) {
          plugin = navigator.plugins[i];
          if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1) {
            return true;
          }
        }

        return false;
      }

      return false;
    };

    return {
      java:        check_plugin("java"),
      flash:       check_plugin("flash"),
      quicktime:   check_plugin("quicktime"),
      silverlight: check_plugin("silverlight")
    };
  }

  // Return Page URL
  Env.url = function () {
    return window.location.href;
  }

}(window.Env = window.Env || {}));

//~~~~~~~~~
// TRACKER
//~~~~~~~~~

(function ($, Tracker, undefined) {
  // Config
  Tracker.version   = 0.1;
  Tracker.interval  = 100;
  Tracker.disabled  = true;
  Tracker.completed = false;
  Tracker.uuid      = null;

  // Create and Inject Tracker Bar
  Tracker.init = function () {
    var bar = '<section id="tracker-bar">';
        bar += '<div id="tracker-status"><div id="tracker-status-light"></div></div>';
        bar += '<div id="tracker-title">Tracker Temp Title</div>';
        bar += '<div id="tracker-uuid"><input type="text" id="uuid" value="" placeholder="Session ID"></div>';
        bar += '<div id="tracker-controls">';
        bar += '<button id="tracker-ready">Ready</button>';
        bar += '<button id="tracker-view">View</button>';
        bar += '<button id="tracker-send">Send</button>';
        bar += '</div>';
        bar += '</section>';

    $('body').append(bar);
  }

  // Set or reset event arrays
  Tracker.prep = function () {
    Tracker.events = [];
    Tracker.points = [];

    // Environment Data
    Tracker.env = {
      browser: Env.browser(),
      plugins: Env.plugins(),
      device:  Env.device(),
      url:     Env.url()
    };
  }

  // Temp Data Holder
  var temp = {
    pageX:     null,
    pageY:     null,
    timeStamp: null
  };

  // Store Temp Data
  Tracker.store = function (e) {
    Tracker.events.push({
      x: e.pageX,
      y: e.pageY,
      t: e.timeStamp
    });

    temp = e;
  }

  // Track Points at interval
  Tracker.getPoint = function () {
    if (temp.pageX !== null && temp.pageY !== null && temp.timeStamp !== null) {
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
      Tracker.startTime = e.timeStamp;

      $('#tracker-status-light').addClass('tracking');

      Tracker.prep();

      temp = e;
      
      // Start tracking mouse
      $(document).on('mousemove', Tracker.store);

      Tracker.int = window.setInterval(Tracker.getPoint, Tracker.interval);
    }
  }

  // Stop Tracker
  Tracker.stop = function (e) {
    if (!Tracker.disabled) {
      Tracker.endTime = e.timeStamp;

      $('#tracker-status-light').removeClass('tracking');
      
      $(document).off('mousemove');

      Tracker.disabled = true;

      clearInterval(Tracker.int);

      Tracker.complete();
    }
  }

  // When everything is done
  Tracker.complete = function () {
    Tracker.o = {
      uuid:          Tracker.uuid,
      version:       Tracker.version,
      start_time:    Tracker.startTime,
      end_time:      Tracker.endTime,
      duration:      (Tracker.endTime - Tracker.startTime),
      point_count:   Tracker.points.length,
      event_count:   Tracker.events.length,
      points:        Tracker.points,
      events:        Tracker.events,
      environment:   Tracker.env
    };

    Tracker.completed = true;
  }

  // View Data
  Tracker.view = function () {
    var output = JSON.stringify(Tracker.o, null, 4);
    $('#res').html(output).show();
  }

  // Send Data
  Tracker.send = function () {
    // TODO - Add a server to get the data
  }

  // Bindings
  // TODO - Consider adding the tracker bar html to the lib as well?
  $(document).on('click', '#tracker-ready', function () {
    Tracker.disabled  = false;
    Tracker.completed = false;
    $('#res').hide();
  });

  $(document).on('click', '#tracker-view', function () {
    // TODO - Potentially add this HTML to the lib as well?
    if (Tracker.completed) {
      Tracker.view();
    }
  });

  $(document).on('click', '#tracker-send', function () {
    if (Tracker.completed) {
      //Tracker.send();
      alert('(FAKE) Your data has been sent.');
    }
  });

  $(document).on('keyup', '#uuid', function () {
    var uuid = $(this).val();

    if (uuid) {
      Tracker.uuid = uuid;
    } else {
      Tracker.uuid = null;
    }
  });

}(jQuery, window.Tracker = window.Tracker || {}));