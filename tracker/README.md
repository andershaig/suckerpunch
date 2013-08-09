## Tracker

### Usage

Just include `tracker.js` and `tracker.css` files in the head of the page (make sure to add jQuery if it's not already loaded).

Then, all you need to do it tell the tracker when to start, when to stop and kick it all off.

Here's a sample:
```
$('body').on({
  mousedown: function (e) {
    Tracker.start(e);
  },
  mouseup: function(e) {
    Tracker.stop(e);
  }
});

Tracker.init();
```