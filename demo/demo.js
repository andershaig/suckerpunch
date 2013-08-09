$(function () {
  // Draggable
  $('.drag-item').draggable({
    revert: true,
    start: function(event, ui) {
      Tracker.start(event);
    }
  });

  // Droppable
  $('.single-drop').droppable({
    activeClass: 'ui-state-hover',
    hoverClass: 'ui-state-active',
    drop: function (event, ui) {
      Tracker.stop(event);
      console.log(event);
      console.log(ui);
      console.log('Dropped on ' + $(this).data('val'));
      $(this).addClass('ui-state-finished');
    }
  });

  // Tracker
  Tracker.init();
});