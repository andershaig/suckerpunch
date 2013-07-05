// Similar Sample: http://jsfiddle.net/cKhbc/
// Replay: http://stackoverflow.com/questions/8130473/replay-mouse-movement-with-javascript
// Another Replay: http://pure.rednoize.com/movelogger/
// Open Source: http://smt.speedzinemedia.com/

// Requires jQuery
(function ($, Tracker, undefined) {
  // For all data
  Tracker.store = [];
  
  // Kick it off
  Tracker.init = function () {
    // Set up event capture
  };
  
  // Set Function
  Tracker.set = function (data) {
    var s = this.store;
    s.push(data);
  };
  
  // Get Epoch time so we can replay
  Tracker.time = function () {
    return (new Date).getTime();
  };
  
  // MouseMove Events
  var captureMouse = function () {
    // Get Time
    var t = this.time();
    
    // Get Coords
    var x = ;
    var y = ;
    
    // Get Scroll Offset
    var s = ;
    
    // Save
    this.set({
      'event': 'mousemove',
      'time': t,
      'pos_x': x,
      'pos_y': y,
      'scroll': s
    });
  };
  
  // Click Events
  var captureClick = function () {
    // Get Time
    var t = this.time();
    
    // Get Coords
    var x = ;
    var y = ;
    
    // Get Scroll Offset
    var s = ;
    
    // Save
    this.set({
      'event': 'click',
      'time': t,
      'pos_x': x,
      'pos_y': y,
      'scroll': s
    });
  };
  
  // Keypresses
  var captureKey = function () {
    // Get Time
    var t = this.time();
    
    // Get Key
    var k = ;
    
    // Save
    this.set({
      'event': 'keypress',
      'time': t,
      'key': k
    });
  };
  
  // Watch for mousemove events
  
  // Watch for click events (can we do mouse down and mouse up?)
  
  // Watch for keypresses
  
  // Any other events like dragstart / dragend etc?
  
}(jQuery, window.Tracker = window.Tracker || {}));

// View data at any time in console with Tracker.store