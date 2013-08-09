(function ($, Tracker, undefined) {
  // Config
  Tracker.version   = 0.1;
  Tracker.interval  = 100;
  Tracker.disabled  = true;
  Tracker.completed = false;
  Tracker.uuid      = null;

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